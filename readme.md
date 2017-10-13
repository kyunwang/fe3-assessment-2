# Cleaning data and a interactive barchart
A interactive barchart using data about *Deaths and underlying causes of death*.

![][]

The filter function is based on this [source][filterSource] by [@wooorm][wooorm] [GPL-3.0][license]

## Why a bar chart?
Why did I choose to use a barchart instead of a:
- dendrogram
A dendrogram only lists the values and shows a tree structure of the data. It is not easy to look for values in it and compare values.

- linegraph
A linegraph represents a value that gradually changes e.g. temperature. We could use a linegraph to visualise, but it wouldn't make sense as there is no relationship between the amount of death in 2010 and 2015.

- bubblechart
We could use a bubblechart as we can say it is pretty 'similar' to the barchart. I deem a barchart more suitable because the amount/values are clearer representated.

- sunburst
no comment..... have yet to think of a way how the data could be used in this chart.


## Description
A interactive barchart using data about *Deaths and underlying causes of death*.

The focus of this chart is to add:
- Logical and useful interactions
- Clarity of the data
- Present a clear representation of the data.

## Data
The data has been taken from [CBS][dataSource]. The data is called *Deaths; underlying cause of death (shortlist), sex, age*
in The Netherlands.

The found dataset was cluttered with many unused duplicates of nested columns and random semicolons ect.

The columns we need are: Deaths and Underlying cause of death.

## How the data was cleaned
- Check what parts weren't needed. Part of the header and copyright in the footer.
- Remove unnecessaty characters
- Remove the header with regex
- Parse to CSV and return a self structured object
- Create a more usable object out of the just returned

- Get all the causes
- Filter the causes to remove the duplicates

## The interactivity
The interactions are:
- Filter on the cause of death
- Getting the result in a animated manner on hovering a bar

## What I've learned
- Making quick decisions in time constrains
- The use of margins (Preventing overflows and stuff)
- Better understanding of dimensions(placement e.g. translate)
- Cleaning data (Man what a pain)
- Understanding how to filter data

## What was hard
- Cleaning the data
- Changing the data (filtering)
- Fixing svg/chart overflowing
- Positioning
- Correct transitioning
- Correct structuring to update data

## Features
- [`d3-request`](requestLink)
- [`d3-selection`][selectionLink]
- [`d3-axis`](axisLink)
- [`d3-array`](arrayLink)
- [`d3-transition`](transitionLink)
- [`d3-scale`](scaleLink)
- [`d3-format`](numberFormat)

## TODO
- [ ] Filter on basis of what year
- [x] Filter on basis of what cause
- [x] View a counter of the amounts of death
- [x] Show data on mouseenter in the counter
- [x] Basic styling
	- [x] The counter
	- [x] The filter

<!-- - [ ] Select a specific year and cause to compare? -->


## License
[GPL-3.0][license] © Kang Yun Wang (Kevin Wang)


[license]: https://opensource.org/licenses/MIT
[dataSource]: http://statline.cbs.nl/statweb/publication/?vw=t&dm=slen&pa=7052eng&la=en
[filterSource]: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/axis
[wooorm]: https://github.com/wooorm

[axisLink]: https://github.com/d3/d3-axis
[requestLink]: https://github.com/d3/d3-request
[selectionLink]: https://github.com/d3/d3-selection
[scaleLink]: https://github.com/d3/d3-scale
[numberFormat]: https://github.com/d3/d3-format 
[transitionLink]: https://github.com/d3/d3-transition 
[arrayLink]: https://github.com/d3/d3-array

[previewImg]: previewImg.png