import * as d3 from "d3";
import * as d3v3 from "./d3-venn/d3.v3"
import { VennNodesHG } from "../classes/index"
import { default as vennn, pack, distribute, force } from "./d3-venn/venn.js";

export function hgVennNodesPlot({ graph } = {}) {
    if (graph !== undefined) {
        plotVennNodes(graph);
    }
    else{
        var graph = require("../../data.json");
        plotVennNodes(graph);
    }
}

function plotVennNodes(graph) {

    var nodes = graph.nodes,
        links = graph.links,
        nodelinks = graph.nodelinks;


    //d3.hypergraph invocation passing links and nodes 
    var data1 = new VennNodesHG(links, nodes, nodelinks)
    //renaming keys
    data1.nodes.forEach(node => {
        if (!node.links.length) {
            node["set"] = ["0"]
        } else {
            node["set"] = node.links
        }
        delete node.links
        if (node.id !== undefined) {
            node["name"] = "node_" + node.id
            delete node.id
        }
        node["r"] = 5
    });


    var width = 800,
        height = 800,
        colors = d3.scaleOrdinal(d3.schemeCategory10);

    var opts = {
        dataLength: 10,
        setLength: 5,
        duration: 800,
        circleOpacity: 0.3,
        innerOpacity: 0.1
    };

    console.log("@@@@@ Val Links Nodes @@@@@@")
    console.log(data1.valLinksNodes)

    var layout = vennn()
        .size([width, height])
        .padding(0)
        .packingStragegy(force)


    // .setsSize(x => (Math.log(x) ))
    // .value(x => 1),
    var div = d3v3.select('#venn');
    var svg =   div.append('svg')
        .attr('width', width)
        .attr('height', height),
        isFirstLayout = true;

    var data = data1.nodes;

    layout.nodes(data)
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
            if (d.__key__ == "0")
                return "white"
            else
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
        .attr('opacity', function (d) {
            if (d.__key__ == "0")
                return 0;
            else
                return opts.innerOpacity;
        })
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

    console.info(layout.sets().values())
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
            return d.nodes;
        }, function (d) {
            return d.name;
        });

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


    var tooltip = d3.select("body").append("div").attr("class", "venntooltip");

    d3.selectAll("circle.node").on("mouseover", function (d, i) {
        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        var node = d.name
        node = node.replace("node_", "")
        var val = ""
        if (d.set[0] != "0") {
            d.set.forEach(set => {
                val += data1.valLinksNodes[set][node] + " "
            })
            tooltip.text("node: " + node + " set: " + d.set + " values: " + val)
        } else {
            tooltip.text("node: " + node)
        }
    }).on("mousemove", function () {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }).on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
    });
}
