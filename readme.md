# Title


![][]

## Description


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