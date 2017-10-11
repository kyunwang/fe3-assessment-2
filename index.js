let toBeUsedData;

d3.text('data.csv')
	// .mimeType('text/plain;chartset=iso88591')
	.get(onload);

const getComQuo = /(,|")/g; // Get all , and "
const getSemicolons = /;/g; // Get all ;


function onload(err, doc) {
	doc = doc.replace(getComQuo, ''); // Removes the , and "

	const header = doc.indexOf('Subjects_1'); // Getting the index of the column names
	
	const copyright = doc.indexOf('17031403'); // start index of the copyright

	doc = doc.slice(header); // Takes all content starting from the index of header

	doc = doc.replace(getSemicolons, ','); // Replace alls the ; for ,


	toBeUsedData = d3.csvParse(doc, toCsv);
	function toCsv(d) {
		if (d.Periods === undefined) return; // This removes the copyright part as it has no data

		return {
			cause: d['Subjects_2'],
			yearsLabel: [
				1950,
				1960,
				1970,
				1980,
				1990,
				2000,
				2010,
				2015,
			],
			years: [
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

	console.log(toBeUsedData);

	// doc.splice(copyright);
	// console.log(headDoc);
	// doc = doc.slice(0, 100);
	// console.log(copyright);
	// console.log(doc.length);
	// doc = doc.replace(getSemicolons, ',');
}

