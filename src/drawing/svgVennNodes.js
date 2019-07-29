import * as d3 from "d3";
import * as d3v3 from "./d3-venn/d3.v3"
import { VennNodesHG } from "../classes/index"
import { default as vennn, pack, distribute, force } from "./d3-venn/venn.js";

export function hgVennNodesPlot({ graph, json } = {}) {
    if (graph !== undefined) {
        console.log("with graph")
        plotVennNodes(graph)

    } else if (json) {
        console.log("with json")
        var graph = require("" + json)
        plotVennNodes(graph)
    } else {
        console.log("default path")
        var graph = require("./data.json")
        plotVennNodes(graph)
    }
}

function plotVennNodes(graph) {
    console.log("@@@@@ grafo @@@@@@")
    console.log(graph)

    var nodes = graph.nodes,
        links = graph.links,
        nodelinks = graph.nodelinks;


    //d3.hypergraph invocation passing links and nodes 
    var data = new VennNodesHG(links, nodes, nodelinks)
    console.log("SI")
    console.log(data.nodes)
    //renaming keys
    data.nodes.forEach(node => {
        if(node.id!==undefined){
        node["name"] = "node_"+node.id
        delete node.id}
        node["set"] = node.links
        delete node.links
        node["r"] = 5
    });
    console.log(data)

 
    var width = 800,
        height = 800,
        colors = d3.scaleOrdinal(d3.schemeCategory10);

    var setChar = 'ABCDEFGHIJKLMN',
        charFn = i => setChar[i],
        setLength = 4,
        sets = d3.range(setLength).map(function (d, i) {
            return setChar[i]
        })
    console.log("@@@@@ sets @@@@@@")
    console.log(sets)

    var opts = {
        dataLength: 10,
        setLength: 5,
        duration: 800,
        circleOpacity: 0.3,
        innerOpacity: 0.1
    };


    var layout = vennn()
        .size([width, height])
        .padding(0)
        .packingStragegy(force)

    console.log("@@@@@@ layout @@@@@@")
    console.log(layout)

    // .setsSize(x => (Math.log(x) ))
    // .value(x => 1),
    var svg = d3v3.select('svg')
        .attr('width', width)
        .attr('height', height),
        isFirstLayout = true;

    var data = data.nodes;

    layout.nodes(data)
    console.log("CIAO");
    console.log(layout.sets().values())
    var vennArea = svg.selectAll("g.venn-area")
        .data(layout.sets().values(), function (d) {
            return d.__key__;
        });

    var vennEnter = vennArea.enter()
        .append('g')
        .attr("class", function (d) {
            return "venn-area venn-" +
                (d.sets.length == 1 ? "circle" : "intersection");
        })
        .attr('fill', function (d, i) {
            return colors(i)
        })

    vennEnter.append('path')
        .attr('class', 'venn-area-path');

    vennEnter.append('circle')
        .attr('class', 'inner')
        .attr('fill', 'grey');

    vennEnter.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");

console.log(vennArea.selectAll('path.venn-area-path'))
    vennArea.selectAll('path.venn-area-path').transition()
        .duration(0)
        .attr('opacity', opts.circleOpacity)
        .attrTween('d', function (d) {
            return d.d
        });
    //we need to rebind data so that parent data propagetes to child nodes (otherwise, updating parent has no effect on child.__data__ property)
    vennArea.selectAll("text.label").data(function (d) {
        return [d];
    })
        .text(function (d) {
            return d.__key__;
        })
        .attr("x", function (d) {
            return d.center.x
        })
        .attr("y", function (d) {
            return d.center.y
        });

    //we need to rebind data so that parent data propagetes to child nodes (otherwise, updating parent has no effect on child.__data__ property)
    vennArea.selectAll('circle.inner').data(function (d) {
        return [d];
    }).transition()
        .duration(isFirstLayout ? 0 : opts.duration)
        .attr('opacity', opts.innerOpacity)
        .attr("cx", function (d) {
            return d.center.x
        })
        .attr("cy", function (d) {
            return d.center.y
        })
        .attr('r', function (d) {
            return d.innerRadius
        });

    vennArea.exit().transition()
        .duration(opts.duration)
        .attrTween('d', function (d) {
            return d.d
        })
        .remove()

    // need this so that nodes always on top
    var circleContainer = svg.selectAll("g.venn-circle-container")
        .data(layout.sets().values(), function (d) {
            return d.__key__;
        });

    //NODI
    circleContainer.enter()
        .append('g')
        .attr("class", "venn-circle-container")
        .attr('fill', function (d, i) {
            return colors(i)
        });

    circleContainer.exit().remove();

    // need this so that nodes always on top
    var circleContainer = svg.selectAll("g.venn-circle-container")
        .data(layout.sets().values(), function (d) {
            return d.__key__;
        });

    circleContainer.enter()
        .append('g')
        .attr("class", "venn-circle-container")
        .attr('fill', function (d, i) {
            return colors(i)
        });
    circleContainer.exit().remove();

    var points = circleContainer.selectAll("circle.node")
        .data(function (d) {
            return d.nodes
        }, function (d) {
            return d.name
        })

    var pointsEnter = points.enter()
        .append('circle')
        .attr('r', 0)
        .attr('class', 'node')

    points.transition()
        .duration(isFirstLayout ? 0 : opts.duration)
        .attr('r', function (d) {
            return d.r
        })

    points.exit().transition()
        .attr('r', 0)
        .remove()

    isFirstLayout = false;

    //set the force ticker    
    layout.packingConfig({
        ticker: function () {
            points.attr("cx", function (d) {
                return d.x
            })
                .attr("cy", function (d) {
                    return d.y
                })

        }
    })
    //start the force layout
    layout.packer().start()

}
