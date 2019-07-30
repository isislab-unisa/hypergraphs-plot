import * as d3 from "d3";
import * as venn from "venn.js";
import { VennHG } from "../classes/index"

var grafo = {}
var type;

/**
 * hgVennPlot can accept no params or a graph or a json string path with the follow sintax
 * hgVennPlot()
 * hgVennPlot({graph:graph})
 * hgVennPlot({json:string})
 */
export function hgVennPlot({ graph, json } = {}) {
    if (graph !== undefined) {
        console.log("with graph")
        plotVenn(graph)

    } else if (json) {
        console.log("with json")
        var graph = require("" + json)
        plotVenn(graph)
    } else {
        console.log("default path")
        var graph = require("./data.json")
        plotVenn(graph)
    }
}

function plotVenn(graph) {
    grafo = graph
    type = "venn"
    console.log("@@@@@ grafo @@@@@@")
    console.log(graph)

    var nodes = graph.nodes,
        links = graph.links,
        nodelinks = graph.nodelinks;

    //d3.hypergraph invocation passing links and nodes 
    var data = new VennHG(links, nodes, nodelinks)
    console.log(data)

    //creating sets
    var sets = [];
    for (var i = 0; i < data.links.length; i++) {
        sets.push({ sets: data.links[i].links, size: data.links[i].size, nodes: data.nodesInLinks[data.links[i].links], nodesToDisplay: data.nodesToDisplay[data.links[i].links], valLinksNodes: data.valLinksNodes[data.links[i].links] })
    }

    console.log(sets)

    //per rendere il grafo interattivo
    // add listeners to all the groups to display tooltip on mouseover
    var div = d3.select("#original");
    div.datum(sets).call(venn.VennDiagram().width(800).height(800));
    var tooltip = d3.select("body").append("div").attr("class", "venntooltip");


    div.selectAll("g").on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        console.log(d.valLinksNodes)
        if (d.nodes !== undefined || d.nodesToDisplay !== undefined) {
            tooltip.text("sets: " + d.sets + " nodi: " + d.nodes + " nodi da plottare: " + d.nodesToDisplay)
            // highlight the current path
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 3)
                .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                .style("stroke-opacity", 1)
                .style("stroke", "white");
        } else {
            tooltip.text("sets: " + d.sets + " no nodes")
        }

    }).on("mousemove", function () {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }).on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 0)
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    }).on("click", function (d, i) {
        if (d.nodes !== undefined) {
            d3.selectAll("td").remove()
            console.log("cliccato")
            console.log("sets: " + d.sets)
            console.log(d)
            var tr = d3.select("#table_information").append("tr")
            tr.append("td").text(d.sets)
            var tdNodes = tr.append("td")
            var tdNodesValue = tr.append("td")
            console.log(d.valLinksNodes)
            console.log(d.sets.length)
            d.nodes.forEach(node => {
                tdNodes.append("p").text(node)
                var values = []
                if (d.sets.length > 1) {
                    d.sets.forEach(set => {
                        values.push(d.valLinksNodes[set][node])
                    });
                } else { values.push(d.valLinksNodes[node]) }
                tdNodesValue.append("p").text(values)
            });
            d3.select("#links_information").style("display", "block")
        }
    });

    d3.select("#close_information").on("click", function (d, i) {
        d3.select("#links_information").style("display", "none")
        d3.selectAll("td").remove()
    });
    d3.select("#confirm").on("click", function () {
        d3.selectAll(".venntooltip").remove();
    })
}