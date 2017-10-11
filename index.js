let toBeUsedData;

d3.text('data.csv')
	// .mimeType('text/plain;chartset=iso88591')
	.get(onload);

const getComQuo = /(,|")/g; // Get all , and "
const getSemicolons = /;/g; // Get all ;

/*=================
=== Global variables for the svg
=================*/
const svgHeight = 600;
const svgWidth = 960;

function onload(err, doc) {
	/*=================
	=== Data cleaning script
	=================*/
	doc = doc.replace(getComQuo, ''); // Removes the , and "
	const header = doc.indexOf('Subjects_1'); // Getting the index of the column names
	const copyright = doc.indexOf('17031403'); // start index of the copyright
	doc = doc.slice(header); // Takes all content starting from the index of header
	doc = doc.replace(getSemicolons, ','); // Replace alls the ; for ,

	toBeUsedData = d3.csvParse(doc, toCsv); // Parse the data to csv & assign to toBeUsedData

	function toCsv(d) {
		if (d.Periods === undefined) return; // This removes the copyright part as it has no data

		return {
			cause: d['Subjects_2'].replace(/\d+\s/g, ''), // Removes the digits and a space frmo the cause string
			data: [
				{year: 1950, deaths: parseInt(d[1950], 10),},
				{year: 1960, deaths: parseInt(d[1960], 10),},
				{year: 1970, deaths: parseInt(d[1970], 10),},
				{year: 1980, deaths: parseInt(d[1980], 10),},
				{year: 1990, deaths: parseInt(d[1990], 10),},
				{year: 2000, deaths: parseInt(d[2000], 10),},
				{year: 2010, deaths: parseInt(d[2010], 10),},
				{year: 2015, deaths: parseInt(d[2015], 10),},
			],
			year: [
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



	const svg = d3.select('#chart')
		.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight);
		




	console.log(toBeUsedData);

}

