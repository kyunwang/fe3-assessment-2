var ourData;
var useableData = [];
var filteredData;
var dataKeys = [];
var activeChart;

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

var svgWidth;
var svgHeight;

const translateY = 0;
const translateX = 50;

const xScale = d3.scaleBand()
	.padding(0.2);
const yScale = d3.scaleLinear();
const darkColors = d3.scaleLinear()
	.range([d3.rgb('#fff'), d3.rgb('#a7a165')]);

/*=================
=== Global variables 
=================*/
var minDeaths;
var maxDeaths;

const transDur = 500;
const delayDur = 50;

/*=================
=== Setting our svg
=================*/
var svg = d3.select('#chart')
	.attr('transform', `translate(${margin.left}, ${margin.top})`);
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
			for(var i = 0; i < d.years.length; i++) {
				useableData.push({
					cause: d.cause,
					year: d.years[i],
					deaths: d.deaths[i]
				});
			}
		});

		// Filtering the keys to use
		for(var i = 0; i < useableData.length; i++) {
			dataKeys.push(useableData[i].cause);
		}

		// Filter from : https://stackoverflow.com/questions/16747798/devare-duplicate-elements-from-an-array
		dataKeys = dataKeys.filter((d, i, self) => i === self.indexOf(d));

	/*=================
	=== Add labels to our dropdown
	=================*/
		d3.select('#filter-list')
		.on('change', changeChart)
		.selectAll('option')
		.data(dataKeys)
		.enter()
		.append('option')
			.attr('value', label => label)
			.text(label => label);

		function changeChart() {
			activeChart = this.value;

			// Add a transition on changing the cause - btw use style not .attr which does not work
			labelCause.transition()
				.duration(transDur)
				.style('opacity', 0)
				.transition()
				.duration(transDur)
				.style('opacity', 1)
				.text(this.value)

			renderCause(useableData);
		}

	/*=================
	=== Render title
	=================*/
		var labelCon = d3.select('.con-title');
		
		// Create a html p tag to show the label of the active graph
		var labelCause = labelCon.append('p')
			.attr('class', 'large-text')
			.text(dataKeys[0]);

		// Tween from https://bl.ocks.org/bricedev/a0c5ef180272fac3aea6
		var labelSvg = labelCon.append('svg');

		// Append the counter
		var labelCount = labelSvg.append('text')
			.attr("x", 0)
			.attr("y", 20)
			.attr('class', 'counter-text')
			.text(0);

		// Append a label (DEATH)
		var label = labelSvg.insert('text')
			.attr('class', 'counter-text')
			.attr("x", 70)
			.attr("y", 20)
			.text('DEATHS');

		// Append the selected year
		var labelYear = labelSvg.insert('text')
			.attr('class', 'counter-text')
			.attr("x", 170)
			.attr("y", 20);

	/*=================
	=== Handle mouse events
	=================*/
		var formatNumber = d3.format(".3s");

		function handleMouseOver(d) {
			labelCount.transition()
				.duration(transDur)
				.tween("text", function() { // Tween from https://bl.ocks.org/bricedev/a0c5ef180272fac3aea6
					var i = d3.interpolate(0, d.deaths); // interpolate from 0 to the amounts of death fromt he hovered item
					return t => d3.select(this).text(formatNumber(i(t)));
				});
			
			// Fade in the year
			labelYear.style('opacity', 0)
				.transition()
				.duration(transDur)
				.text(`IN ${d.year}`)
				.style('opacity', 1);
		}

		function handleMouseOut(d) {
			labelCount.transition()
				.duration(transDur)
				.tween("text", function() { // Tween from https://bl.ocks.org/bricedev/a0c5ef180272fac3aea6
					var i = d3.interpolate(d.deaths, 0); // interpolate from up to down
					return t => d3.select(this).text(formatNumber(i(t)));
				});
			
			labelYear.style('opacity', 1)
				.transition()
				.duration(transDur)
				.text(`IN ${d.year}`)
				.style('opacity', 0)
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
		darkColors.domain([minDeaths, maxDeaths])

		// Appending the x-axis
		var xAxis = container.append('g') // Set and create the x-axis at the bottom
			.attr('class', 'axis axis-x')
			.attr('transform', `translate(${translateX}, ${svgHeight})`)
			.call(d3.axisBottom(xScale))
			.selectAll("text") // Setting the labels
			.attr("y", 15)
			.attr("x", -12)
			.attr("dy", ".35em")
			.style("text-anchor", "start");
		
		// Appending the y-axis
		var yAxis = container.append('g') // Set and create the y-axis on the left
			.attr('class', 'axis axis-y')
			.attr('transform', `translate(${translateX}, ${0})`)
			.call(d3.axisLeft(yScale));


	/*=================
	=== Render by filter
	=================*/
		function renderCause(data) {
			// filter on basis of what cause has been choses. Return All deaths on default
			filteredData = data.filter(item => item.cause === (activeChart || dataKeys[0]));

			var chartBars = container.selectAll('.bar')
				.data(filteredData)
				.enter()
				.append('rect')
					.on('mouseenter', handleMouseOver)
					.on('mouseleave', handleMouseOut)
					.attr('class', 'bar');

			var transContainer = container.transition()
				.duration(transDur);

			// Get the min/max amounts of deaths. It is nested so we return another d3.min method which returns the desired value
			minDeaths = d3.min(filteredData, data => data.deaths);
			maxDeaths = d3.max(filteredData, data => data.deaths);
			
			// Update the domain of the yScale & colorScale
			darkColors.domain([minDeaths, maxDeaths]);
			yScale.domain([maxDeaths, 0]);

			transContainer.select('.axis-y')
				.call(getYScale)
				.selectAll('g');

			transContainer.selectAll('.bar')
				.attr('x', getX)
				.attr('y', getY)
				.attr('width', getWidth)
				.attr('height', getHeight)
				.attr('fill', getFill);
		}
	

	/*=================
	=== Render first load
	=================*/
		(function initialRender() {
				filteredData = useableData.filter(item => item.cause === (activeChart || dataKeys[0]));

				var chartBars = container.selectAll('.bar')
					.data(filteredData)
					.enter()
					.append('rect')
						.on('mouseenter', handleMouseOver)
						.on('mouseleave', handleMouseOut)
						.attr('class', 'bar');
		
				// It doesn't render without transition for some reason
				// The data is already there too.
				// settimeout doesn't work
				var transContainer = container.transition()
					.duration(0);
		
				// Get the min/max amounts of deaths. It is nested so we return another d3.min method which returns the desired value
				minDeaths = d3.min(filteredData, data => data.deaths);
				maxDeaths = d3.max(filteredData, data => data.deaths);
				
				// Update the domain of the yScale & colorScale
				darkColors.domain([minDeaths, maxDeaths]);
				yScale.domain([maxDeaths, 0]);
		
				transContainer.select('.axis-y')
					.call(getYScale)
					.selectAll('g');
		
				transContainer.selectAll('.bar')
					.attr('x', getX)
					.attr('y', getY)
					.attr('width', getWidth)
					.attr('height', getHeight)
					.attr('fill', getFill);
		})()

	/*=================
	=== Our broken up functions
	=================*/
		function getX(d) {
			return translateX + xScale(d.year);
		}

		function getY(d) {
			return yScale(d.deaths) - translateY;
		}

		function getWidth() {
			return xScale.bandwidth();
		}

		function getHeight(d) {
			return svgHeight - yScale(d.deaths);
		}

		function getFill(d) {
			return darkColors(d.deaths);
		}

		function getYScale() {
			return d3.axisLeft(yScale);
		}


	
}
