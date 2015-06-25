# d3-react-demo

Quick and dirty exercise, filling in some of the implementation details omitted from [this article](http://blog.siftscience.com/blog/2015/4/6/d-threeact-how-sift-science-made-d3-react-besties).

Also demonstrates interesting bits and pieces, like bucketing messy time series data into even chunks (e.g. hours), and how to generate bar widths on time scales, which D3 forgot(?) to include. Uses AmpersandJS's "[Rest Collection](https://github.com/ampersandjs/ampersand-rest-collection)" as a data store.

`npm install` gets all your dependencies.

`npm start` fires up browserify, parses the JSX and ES6, bundles up the modules, watches for changes.

Note that you'll need some kind of basic http server for this to work, as the chart data is called via XMLHTTPRequest. That has been left as an exercise for the reader, atm.

*TODO: Dev Server? Flux?
