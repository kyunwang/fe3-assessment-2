# Cleaning data and a interactive barchart

A interactive barchart using data about *Deaths and underlying causes of death*.

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


![][]

## Description
A interactive barchart using data about *Deaths and underlying causes of death*.

The focus of this chart is to add:
- logical and useful interactions
- clarity of the data
- present a clear representation of the data.

## Data
The data has been taken from [CBS][dataSource]. The data is called *Deaths; underlying cause of death (shortlist), sex, age*
in The Netherlands ... . . . . .. . . 

## How the data was cleaned
- Check what parts weren't needed. Part of the header and copyright in the footer.
- Remove unnecessaty characters
- Remove the header with regex
- Parse to CSV and return a self structured object

## The interactivity

## Features
- [d3-selection][selectionLink]


## TODO
- [ ] Filter on basis of what year, cause
- [ ] Select a specific year and cause to compare?

## License
[GPL-3.0][license] © Kang Yun Wang (Kevin Wang)



[license]: https://opensource.org/licenses/MIT
[dataSource]: http://statline.cbs.nl/statweb/publication/?vw=t&dm=slen&pa=7052eng&la=en

[selectionLink]: https://github.com/d3/d3-selection
[scaleLink]: https://github.com/d3/d3-scale
[hierarchyLink]: https://github.com/d3/d3-hierarchy
[numberFormat]: https://github.com/d3/d3-format 
[transitionLink]: https://github.com/d3/d3-transition 

[previewImg]: previewImg.png