let ourData;
let useFullData = [];

d3.text('data.csv')
	// .mimeType('text/plain;chartset=iso88591')
	.get(onload);

const getComQuo = /(,|")/g; // Get all , and "
const getSemicolons = /;/g; // Get all ;

/*=================
=== Global variables for the svg/chart
=================*/
const svgHeight = 600;
const svgWidth = 960;
const translateY = 25;
const translateX = 100;

const xScale = d3.scaleBand()
	.range([0, svgWidth])
	.padding(0.2);

const yScale = d3.scaleLinear()
	.range([0, svgHeight])

const colorScale = d3.scaleLinear()
	.range(['red', 'blue'])


/*=================
=== Global data variables 
=================*/

let minDeaths;
let maxDeaths;



function onload(err, doc) {
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
			1950: parseInt(d[1950], 10),
			1960: parseInt(d[1960], 10),
			1970: parseInt(d[1970], 10),
			1980: parseInt(d[1980], 10),
			1990: parseInt(d[1990], 10),
			2000: parseInt(d[2000], 10),
			2010: parseInt(d[2010], 10),
			2015: parseInt(d[2015], 10),
			data: [
				{year: 1950, deaths: parseInt(d[1950], 10)},
				{year: 1960, deaths: parseInt(d[1960], 10)},
				{year: 1970, deaths: parseInt(d[1970], 10)},
				{year: 1980, deaths: parseInt(d[1980], 10)},
				{year: 1990, deaths: parseInt(d[1990], 10)},
				{year: 2000, deaths: parseInt(d[2000], 10)},
				{year: 2010, deaths: parseInt(d[2010], 10)},
				{year: 2015, deaths: parseInt(d[2015], 10)},
			],
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
			useFullData.push({
				cause: d.cause,
				year: d.years[i],
				deaths: d.deaths[i]
			});
		}
	})

	/*=================
	=== Start chart
	=================*/
	var svg = d3.select('#chart')
		.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight);

	var container = svg.append('g');
	
	// Get the min/max amounts of deaths. It is nested so we return another d3.min method which returns the desired value
	minDeaths = d3.min(useFullData, data => data.deaths);
	maxDeaths = d3.max(useFullData, data => data.deaths);

	console.log(minDeaths, maxDeaths);
	xScale.domain(useFullData.map(d => d.year))
	yScale.domain(useFullData.map(d => d.deaths))
		// return d.years.map(year => year)
		// return d.data.map(data => data.year)
		// console.log(d);
	
	// xScale.domain(ourData.map(d => {
	// 	return d.years.map(year => year)
	// 	return d.data.map(data => data.year)
	// 	// console.log(d);
	
	// }))

	// Appending the x-axis
	container.append('g') // Set and create the x-axis at the bottom
		.attr('transform', `translate(${translateX}, ${200 + translateY})`)
		.attr('class', 'axis axis-x')
		.call(d3.axisBottom(xScale))
		// .call(xAxis)
		.selectAll("text") // Setting the labels
		.attr("y", 8)
		.attr("x", 9)
		.attr("dy", ".35em")
		.attr("transform", "rotate(45)")
		.style("text-anchor", "start");
	
	// Appending the y-axis
	container.append('g') // Set and create the y-axis on the left
		.attr('class', 'axis axis-y')
		.attr('transform', `translate(${translateX}, ${0 + translateY})`)
		.call(d3.axisLeft(yScale));







	function render(data) {
		let chartBars = conatianer.selectAll('rect')
		.data(useFullData)
		.enter()
	}

}

