let ourData;
let useableData = [];
let dataKeys = [];
let activeChart;

d3.text('data.csv')
	.get(onload);

/*=================
=== Our regex
=================*/	

const getComQuo = /(,|")/g; // Get all , and "
const getSemicolons = /;/g; // Get all ;

/*=================
=== Global variables for the svg/chart
=================*/

// Set margins to avoid overflows of the svg
const margin = {
	top: 48,
	bottom: 96,
	left: 48,
	right: 48,
}

let svgWidth;
let svgHeight;

const translateY = 0;
const translateX = 100;

const xScale = d3.scaleBand()
	.padding(0.2);
const yScale = d3.scaleLinear();
const darkColors = d3.scaleLinear()
// .interpolate(d3.interpolateHcl) //Hue Chroma Luminence - Chose this because it gives a different colourscheme than rgb ^^
.range([d3.rgb('red'),'green', d3.rgb('gray')]);

/*=================
=== Global variables 
=================*/

let minDeaths;
let maxDeaths;

const transDur = 3000;
const delayDur = 50;

/*=================
=== Setting our svg
=================*/
var svg = d3.select('#chart')
	// .attr('width', svgWidth)
	// .attr('height', svgHeight)
	.attr('transform', `translate(${margin.left}, ${margin.top + margin.bottom})`)

var container = svg.append('g');


function onload(err, doc) {
	svgWidth = parseInt(svg.style('width'), 10) - margin.left - margin.right;
	svgHeight = parseInt(svg.style('height'), 10) - margin.top - margin.bottom;
	/*=================
	=== Data cleaning script
	=================*/
		doc = doc.replace(getComQuo, ''); // Removes the , and "
		const header = doc.indexOf('Subjects_1'); // Getting the index of the column names
		const copyright = doc.indexOf('17031403'); // start index of the copyright
		doc = doc.slice(header); // Takes all content starting from the index of header
		doc = doc.replace(getSemicolons, ','); // Replace alls the ; for ,

		ourData = d3.csvParse(doc, toCsv); // Parse the data to csv & assign to ourData
		

		function toCsv(d) {
			if (d.Periods === undefined) return; // This removes the copyright part as it has no data

			// Testing various ways to return the data
			return {
				cause: d['Subjects_2'].replace(/\d+\s/g, ''), // Removes the digits and a space frmo the cause string
				years: [
					1950,
					1960,
					1970,
					1980,
					1990,
					2000,
					2010,
					2015,
				],
				deaths: [
					parseInt(d[1950], 10),
					parseInt(d[1960], 10),
					parseInt(d[1970], 10),
					parseInt(d[1980], 10),
					parseInt(d[1990], 10),
					parseInt(d[2000], 10),
					parseInt(d[2010], 10),
					parseInt(d[2015], 10),
				]
			}
		}

		// Reformatting the data to a more usable one
		ourData.map((d, i) => {
			for(let i = 0; i < d.years.length; i++) {
				useableData.push({
					cause: d.cause,
					year: d.years[i],
					deaths: d.deaths[i]
				});
			}
		});

		// Filtering the keys to use
		for(let i = 0; i < useableData.length; i++) {
			dataKeys.push(useableData[i].cause);
		}

		// Filter from : https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
		dataKeys = dataKeys.filter((d, i, self) => i === self.indexOf(d));
		activeChart = dataKeys[0];

	/*=================
	=== Add labels to our dropdown
	=================*/
	d3.select('#filterList')
		.on('change', changeChart)
		.selectAll('option')
		.data(dataKeys)
		.enter()
		.append('option')
			.attr('value', label => label)
			.text(label => label);

	function changeChart(d, i, node) {
		// let value = d3.select('this').attr('value');
		console.log(this.value);
		activeChart = this.value;
		render(useableData)
		// console.log(this.getAttribute('value'))
	}

	/*=================
	=== Start chart
	=================*/
	minDeaths = d3.min(useableData, data => data.deaths);
	maxDeaths = d3.max(useableData, data => data.deaths);

	xScale.range([0, svgWidth])
		.domain(useableData.map(d => d.year));
	// Used map before and that didn't seem to work no matter what
	yScale.range([0, svgHeight])
		.domain([maxDeaths, 0]);
	// yScale.domain([0, maxDeaths]);
	darkColors.domain([minDeaths, maxDeaths])

	// Appending the x-axis
	let xAxis = container.append('g') // Set and create the x-axis at the bottom
		.attr('class', 'axis axis-x')
		.attr('transform', `translate(${translateX}, ${svgHeight})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text") // Setting the labels
		.attr("y", 15)
		.attr("x", -12)
		.attr("dy", ".35em")
		.style("text-anchor", "start");
	
	// Appending the y-axis
	let yAxis = container.append('g') // Set and create the y-axis on the left
		.attr('class', 'axis axis-y')
		.attr('transform', `translate(${translateX}, ${0})`)
		.call(d3.axisLeft(yScale));



		// render the chart
		render(useableData);

	function render(data) {
		let dataF = data.filter(item => item.cause === activeChart)
		
		// let chartBars = container.selectAll('.bar')
			// .data(dataF);
		let chartBars = container.selectAll('.bar')
			.data(dataF)
			.enter()
			.append('rect')
			.attr('class', 'bar');

		let transContainer = container.transition()
			.duration(transDur);

		// Get the min/max amounts of deaths. It is nested so we return another d3.min method which returns the desired value
		minDeaths = d3.min(dataF, data => data.deaths);
		maxDeaths = d3.max(dataF, data => data.deaths);
		
		// Update the domain of the yScale & colorScale
		darkColors.domain([minDeaths, maxDeaths]);
		yScale.domain([maxDeaths, 0]);


		transContainer.select('.axis-y')
			.call(d3.axisLeft(yScale))
			.selectAll('g');

		transContainer.selectAll('.bar')
				.attr('x', dataF => translateX + xScale(dataF.year))
				.attr('y', dataF => yScale(dataF.deaths) - translateY)
				// .attr('y', dataF => svgHeight - translateY - yScale(dataF.deaths))
				.attr('width', dataF => xScale.bandwidth())
				.attr('height', dataF => svgHeight - yScale(dataF.deaths))
				.attr('fill', dataF => darkColors(dataF.deaths))
	}

}

