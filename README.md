# hypergraphs-plot
![GitHub Logo](logo.jpeg)
hypergraphs-plot is a js library to visualize hypergraphs.


| **Documentation** | **Build Status** |
|---------------|--------------|
|... | [![Build Status][travis-img]][travis-url]  [![Coverage Status][codecov-img]][codecov-url] <br/> Linux and macOS |

[docs-dev-url]: https://pszufe.github.io/SimpleHypergraphs.jl/dev
[docs-stable-url]: https://pszufe.github.io/SimpleHypergraphs.jl/stable

[travis-img]: https://travis-ci.org/isislab-unisa/hypergraphs-plot.svg?branch=master
[travis-url]: https://travis-ci.org/isislab-unisa/hypergraphs-plot

[codecov-img]: https://coveralls.io/repos/github/isislab-unisa/hypergraphs-plot/badge.svg?branch=master
[codecov-url]: https://coveralls.io/github/isislab-unisa/hypergraphs-plot?branch=master


## Installing

Install the latest version of hypergraphs-plot with NPM

```
npm install https://github.com/isislab-unisa/hypergraphs-plot.git
```

Otherwise, download the [latest release](https://github.com/isislab-unisa/hypergraphs-plot/blob/master/bundle.v1.0.js).

## Usage
To visualize a simple hypergraph, just define the nodes, the hyperlinks and the weight of each node in their respective hyperlinks.

```
var graph={}
graph.nodes= [
    {"id":"1" , "links":["1","2","3"]},
    {"id":"2" , "links":["1","2"]},
    {"id":"3" , "links":["2"]},
    {"id":"4" , "links":["2"]},
    {"id":"5" , "links":["2"]}
];
graph.links= [
    {"id":"1", "nodes": ["1","2"]},
    {"id":"2", "nodes": ["1","2","3","4","5"]},
    {"id":"3", "nodes": ["1"]}
];
graph.nodelinks= [
                {"node":"1","link":"1","value":"1"},
                {"node":"1","link":"2","value":"1"},
                {"node":"1","link":"3","value":"1"},
                {"node":"2","link":"1","value":"1"},
                {"node":"2","link":"2","value":"1"},
                {"node":"3","link":"2","value":"1"},
                {"node":"4","link":"2","value":"1"},
                {"node":"5","link":"2","value":"1"}
];
```

Then plot the hypergraph with one of the following functions, based on the type of visualization you want.

```
hgColorEdgePlot(graph: graph)

hgRadalPlot(graph: graph)

hgVennNodesPlot(graph: graph)
```

### with Julia
You can also use this library with Julia on Jupyter Notebook, thanks to the simple integration with the library [SimpleHypergraphs.jl](https://github.com/pszufe/SimpleHypergraphs.jl).

Check the [example_notebook](https://nbviewer.jupyter.org/github/isislab-unisa/hypergraphs-plot/blob/master/example_notebook.ipynb) for more details.