import * as d3 from "d3";
import * as venn from "venn.js";
import { ColorEdgeHG, VennHG } from "../classes/index"

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

export function hgColorEdgePlot({ graph, json } = {}) {
    if (graph !== undefined) {
        console.log("graph")
        plotColorEdge(graph)
    } else if (json !== undefined) {
        console.log("json")
        var graph = require("" + json)
        plotColorEdge(graph)
    } else {
        var graph = require("./data.json");
        plotColorEdge(graph)
    }
}

function plotColorEdge(graph) {
    type = "color-edge"
    console.log(graph)
    //var dataMarker = { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' };
    var nodeR = 20, lNodeR = 0.3;    //raggio nodi e nodo iperarco
    //var nodeId = 0;
    var width = 1000, height = 1000;
    console.log("AAAAAAA")
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log("BBBBBB")
    //zoom handler
    var zoom = d3.zoom()
        .scaleExtent([1 / 2, 10])
        .on("zoom", zoomed);

    //drag handler
    var drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    //svg creation
    var svg = d3.select(".hg-plot")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "amazingViz")
        .call(zoom)
        .append("g");


    //defs creation for markers
    var defs = svg.append("defs");

    //force layout definition
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))//.distance(80).strength(1))
        .force("charge", d3.forceManyBody().strength(-50).distanceMin(30).distanceMax(200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(50));

    //data reading from json file
    var nodes = graph.nodes,
        links = graph.links,
        bilinks = [];
    grafo = JSON.parse(JSON.stringify(graph));              //d3.hypergraph invocation passing links and nodes
    var data = new ColorEdgeHG(links, nodes, graph.nodelinks);

    //d3.hypergraph links
    links = data.links;
    //d3.hypergraph nodes
    nodes = data.nodes;
    var dictNodes = data.dictNodeLinks
    var dictLinks = data.dictLinks
    var dictNodeLinks = data.dictNodeLinks
    //node mapping by id
    var nodeById = d3.map(nodes, function (d) { return d.id; });
    console.log(links);
    links.forEach(function (link) {
        var s = link.source = nodeById.get(link.source),
            t = link.target = nodeById.get(link.target),
            i = {}; // intermediate node
        if (t.id == s.id) {
            t = {
                link: null,
            }
        }
        console.log(link);
        t["linkid"] = link.linkid;
        nodes.push(i);
        links.push({ source: s, target: i }, { source: i, target: t });
        bilinks.push([s, i, t]);
    });

    //links creation
    var link = svg.selectAll(".link")
        .data(bilinks)
        .enter().append("path")
        .attr("class", "link")
        .attr("marker-start", "url(#circleMarker)")
        .attr("marker-mid", "url(#textMarker)")
        .attr("marker-end", function (d) {
            if (!d[2].link)
                return "url(#circleMarker)";
            else
                return "null";
        })
        .style("stroke", function (d) {
            if (isNaN(d[2].id) && d[2].id != undefined) return color(d[2].id);
            if (d[2].id == undefined) return color(d[2].id + d[0].id + d[2].linkid);
        });

    //node creation
    var node = svg.selectAll(".node")
        .data(nodes.filter(function (d) {
            return d.id;
        }))
        .enter().append("g")
        .attr("class", "node");
    //for every node -> svg circle creation
    node.append("circle")
        .attr("class", function (d) {
            if (d.link) {
                return "linknode";
            } else {
                return "node";
            }
        })
        .attr("r", function (d) {
            if (d.link) {
                return lNodeR;
            } else {
                return nodeR;
            }
        })
        .attr("fill", function (d) {
            if (d.link) {
                return "rgb(100,100,100)";
            } else {
                return color(d.id);
            }
        });

    //id text
    node.append("text")
        .attr("dx", 22)
        .attr("dy", ".35em")
        .text(function (d) {
            if (!d.link)
                return d.id;
            return null;
        });
    link.append("title")
        .text(function (d, i) {
            if (d[2].link == null) {
                console.log("node:" + d[0].id + "-linkid:" + d[2].linkid + "-SelfLoop:" + d[2].linkid);
                return dictNodeLinks["node:" + d[0].id + "-linkid:" + d[2].linkid + "-SelfLoop:" + d[2].linkid];
            }
            else
                return dictNodeLinks["node:" + d[0].id + "-" + d[2].id];
        });
    console.log(dictNodeLinks);
    //onmouseover id text
    node.append("title")
        .text(function (d) {
            if (!d.link)
                return d.id;
            return null;
        });

    node.call(drag);

    //sphere marker
    var marker = defs.append("marker")
        .attr("id", "circleMarker")
        .attr("markerHeight", 5)
        .attr("markerWidth", 5)
        .attr("markerUnits", "strokeWidth")
        .attr("orient", "auto")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("viewBox", "-6 -6 12 12")
        .append("path")
        .attr("d", "M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0")
        .attr("fill", "black");

    simulation
        .nodes(nodes)
        .on("tick", ticked)
        .force("link")
        .links(links);

    function ticked() {
        link.attr("d", positionLink);
        node.attr("transform", positionNode);
    }
    function positionLink(d) {
        if (d[2].link == null) {
            var
                x1 = d[0].x,
                y1 = d[0].y,
                x2 = d[0].x,
                y2 = d[0].y,
                dx = x2 - x1,
                dy = y2 - y1,
                dr = Math.sqrt(dx * dx + dy * dy),

                // Defaults for normal edge.
                drx = dr,
                dry = dr,
                xRotation = 0, // degrees
                largeArc = 0, // 1 or 0
                sweep = 1; // 1 or 0

            // Self edge.
            if (x1 === x2 && y1 === y2) {
                // Fiddle with this angle to get loop oriented.
                xRotation = -45;

                // Needs to be 1.
                largeArc = 1;

                // Change sweep to change orientation of loop. 
                //sweep = 0;

                // Make drx and dry different to get an ellipse
                // instead of a circle.
                drx = d[2].linkid * 10;
                dry = d[2].linkid * 10;
                // For whatever reason the arc collapses to a point if the beginning
                // and ending points of the arc are the same, so kludge it.
                x2 = x2 + 1;
                y2 = y2 + 20;
                x1 = x1 + 20;
                y1 = y1 + 1;
                // invece attorno
                /*
                x2 = x2 + 20;
                y2 = y2 + 1;
                x1 = x1 + 1;
                y1 = y1 + 20;
                */
            }
            return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
        }

        var diffX0, diffY0, diffX2, diffY2, pathLength01, pathLength12, offsetX0, offsetY0, offsetX2, offsetY2;

        diffX0 = d[0].x - d[1].x;
        diffY0 = d[0].y - d[1].y;
        diffX2 = d[2].x - d[1].x;
        diffY2 = d[2].y - d[1].y;

        pathLength01 = Math.sqrt((diffX0 * diffX0) + (diffY0 * diffY0));
        pathLength12 = Math.sqrt((diffX2 * diffX2) + (diffY2 * diffY2));

        offsetX0 = (diffX0 * nodeR) / pathLength01;
        offsetY0 = (diffY0 * nodeR) / pathLength01;
        if (!d[2].link) {
            offsetX2 = (diffX2 * nodeR) / pathLength12;
            offsetY2 = (diffY2 * nodeR) / pathLength12;
        } else {
            offsetX2 = (diffX2 * lNodeR) / pathLength12;
            offsetY2 = (diffY2 * lNodeR) / pathLength12;
        }

        var x0Pos, y0Pos, x2Pos, y2Pos;

        if (d[0].link) {
            x0Pos = d[0].x;
            y0Pos = d[0].y;
        } else {
            x0Pos = d[0].x - offsetX0;
            y0Pos = d[0].y - offsetY0;
        }
        if (d[2].link) {
            x2Pos = d[2].x;
            y2Pos = d[2].y;
        } else {
            x2Pos = d[2].x - offsetX2;
            y2Pos = d[2].y - offsetY2;
        }


        return "M" + x0Pos + "," + y0Pos
            + "S" + d[1].x + "," + d[1].y
            + " " + x2Pos + "," + y2Pos;
    }
    function positionNode(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x, d.fy = d.y;
        d3.event.sourceEvent.stopPropagation();
    }
    function dragged(d) {
        d.fx = d3.event.x, d.fy = d3.event.y;
    }
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null, d.fy = null;
    }
    function zoomed() {
        svg.attr("transform", d3.event.transform);
    }
}


export function hgRadalPlot({ graph, json } = {}) {
    if (graph !== undefined) {
        console.log("graph")
        plotRadal(graph)
    } else if (json !== undefined) {
        console.log("json")
        var graph = require("" + json)
        plotRadal(graph)
    } else {
        var graph = require("./data.json");
        plotRadal(graph)
    }
}

function plotRadal(graph) {
    var offset=0;

    var nodes = graph.nodes;	//nodi
    var links = graph.links;	//link
    var nodelinks = graph.nodelinks;	//nodo-link-value

    var height = 0;
    var width = 0;
    if (nodes.length > links.length) {
        width = nodes.length * 100;
        height = nodes.length * 100;
    }
    else {
        width = links.length * 100;
        height = links.length * 100;
    }
    var margin = { top: 200, right: 200, bottom: 200, left: 200 };

    var data = [];	//data per la costruzione di tutto
    var selfloop = [];	//selfloop

    var dictX = [];
    var dictY = [];

    var count = 0;

    var firstnodes = [];

    var start = Math.floor(nodes.length / 10);
    console.log("START = " + start);
    nodes.forEach(function (element, j) {
        var obj = { "axis": "idNodo" + element.id, "value": start, "bool": true }
        firstnodes.push(obj);
    });
    //bool true, disegna, false non disegna

    var cc = start + 1;
    links.forEach(function (element, i) {
        var nod = element.nodes;	//esempio ["1","2","3"];
        if (nod.length != 1 && nod.length > 2) {	//controllo per vedere se è selfloop
            var d = [];
            nodes.forEach(function (ele, j) {
                var obj = { "axis": "idNodo" + ele.id, "value": cc, "bool": false }	//pre ogni link, setto momentaneamente tutti i nodi
                d.push(obj);
            });
            data.push(d);
        }
        if (nod.length != 1 && nod.length > 2) {
            nod.forEach(function (el, x) {
                var result = d.filter(obj => {
                    if (obj.axis === "idNodo" + el) obj.bool = true;	// e qui dico chi deve essere visibile grazie al bool=true;
                });
            })
        }
        if (nod.length == 1) {
            firstnodes.filter(obj => {
                if (obj.axis === "idNodo" + nod[0]) obj.bool = false;	//selfloop
            });
            count = count + 1;
        }
        if (nod.length == 2) {	//link with 2 nodes
            selfloop.push({ "nodo1": "idNodo" + nod[0], "nodo2": "idNodo" + nod[1] });
        }
        cc = cc + 1;
    });
    data.push(firstnodes);

    var color = d3.scaleOrdinal().range(["#FC74FD"]);
    var radarChartOptions = {
        w: 800,
        h: 800,
        margin: margin,
        maxValue: 0.5,
        levels: links.length + start,
        roundStrokes: true,
        color: color,
        opacityCircles: 0
    };

    //Call function to draw the Radar chart
    RadarChart(".radarChart", data, radarChartOptions);


    /////////// Inspired by the code of alangrafu ///////////

    function RadarChart(id, data, options) {
        var cfg = {
            w: width,				//Width of the circle
            h: height,				//Height of the circle
            margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
            levels: 1,				//How many levels or inner circles should there be drawn
            maxValue: 0, 			//What is the value that the biggest circle will represent
            labelFactor: 1.1, 	//How much farther than the radius of the outer circle should the labels be placed
            wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
            opacityArea: 0, 	//The opacity of the area of the blob
            dotRadius: 5, 			//The size of the colored circles of each blog
            opacityCircles: 1, 	//The opacity of the circles of each blob
            strokeWidth: 2, 		//The width of the stroke around each blob
            roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
            color: d3.scaleOrdinal(d3.schemeCategory10)	//Color function
        };

        //Put all of the options into a variable called cfg
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) { cfg[i] = options[i]; }
            }//for i
        }//if

        //If the supplied maxValue is smaller than the actual one, replace by the max in the data
        var maxValue = links.length + start;   //Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));

        var allAxis = (data[0].map(function (i, j) { return i.axis })),	//Names of each axis
            total = allAxis.length,					//The number of different axes
            radius = Math.min(cfg.w / 2, cfg.h / 2), 	//Radius of the outermost circle
            Format = d3.format(''),			 	//Percentage formatting
            angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

        //Scale for the radius
        var rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, maxValue]);


        //Remove whatever chart with the same id/class was present before
        d3.select(id).select("svg").remove();

        //Initiate the radar chart SVG
        var svg = d3.select(id).append("svg")
            .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
            .attr("class", "radar" + id);
        //Append a g element		
        var g = svg.append("g")
            .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");

        ////////// Glow filter for some extra pizzazz ///////////

        //Filter for the outside glow
        var filter = g.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');


        //Wrapper for the grid & axes
        var axisGrid = g.append("g").attr("class", "axisWrapper");

        //Draw the background circles
        axisGrid.selectAll(".levels")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", function (d, i) { return (radius / cfg.levels * d) })
            .style("fill", "#CDCDCD")
            .style("stroke", function (d, i) {
                console.log(d);
                if (i != links.length && d > start) return "#CDCDCD";
                else return "white";
            })
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter", "url(#glow)");

        //Text indicating at what % each level is
        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", function (d) { return -d * radius / cfg.levels; })
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#737373")
        //.text(function(d,i) { return Format(maxValue * d/cfg.levels); });   text iperarco


        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        //Append the lines
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", function (d, i) { return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2 - offset); })
            .attr("y2", function (d, i) { return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2 - offset); })
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        //Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function (d, i) { return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2 - offset); })
            .attr("y", function (d, i) { return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2 - offset); })
            .text(function (d) { return d })
            .call(wrap, cfg.wrapWidth);


        //The radial line function
        var radarLine = d3.radialLine()
            .curve(d3.curveLinearClosed)
            .radius(function (d) { return rScale(d.value); })
            .angle(function (d, i) { return i * angleSlice - offset; });


        if (cfg.roundStrokes) {
            radarLine.curve(d3.curveCardinalClosed);
        }

        //Create a wrapper for the blobs	
        var blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");



        /*
        //Append the backgrounds	
        blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function(d,i) { return radarLine(d); })
        .style("fill", function(d,i) { return cfg.color(i); })
        .style("fill-opacity", cfg.opacityArea)
        .on('mouseover', function (d,i){
        //Dim all blobs
        d3.selectAll(".radarArea")
        .transition().duration(200)
        .style("fill-opacity", 0); 
        //Bring back the hovered over blob
        d3.select(this)
        .transition().duration(200)
        .style("fill-opacity", 0);	
        })
        .on('mouseout', function(){
        //Bring back all blobs
        d3.selectAll(".radarArea")
        .transition().duration(200)
        .style("fill-opacity", cfg.opacityArea);
        });*/

        //Create the outlines	

        //asdsasdjajasodjasodjasdo
        //Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(function (d, i) { return d; })
            .enter()
            .append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", function (d, i) {
                //if(d.bool==true)
                if (d.value == start) dictX[d.axis] = rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2 - offset);
                return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2 - offset);
            })
            .attr("cy", function (d, i) {
                //if(d.bool==true)
                if (d.value == start) dictY[d.axis] = rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2 - offset);
                return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2 - offset);
            })
            .style("fill", function (d, i, j) {
                if (d.value == start && d.bool == false) return "black";
                if (d.bool == true) return cfg.color(j);
                else return "white";
            })
            .style("fill-opacity", function (d, i) {
                if (d.bool == true || d.value == start) return 0.8;
                else return 0;
            });
        blobWrapper


        g.data(selfloop)
            .append("path")
            .attr("d", function (self) {
                var cxnod1 = dictX[self.nodo1];
                var cynod1 = dictY[self.nodo1];
                var cxnod2 = dictX[self.nodo2];
                var cynod2 = dictY[self.nodo2];
                var x = cxnod2 - cxnod1;
                var y = cynod2 - cynod1;
                return "M " + cxnod1 + " " + cynod1 + " l " + x + " " + y;
            })
            .attr("stroke", "gray")
            .attr("stroke-width", "3")
            .style("fill", "none");




        //Set up the small tooltip for when you hover over a circle
        var tooltip = g.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);


        //Taken from http://bl.ocks.org/mbostock/7555321
        //Wraps SVG text	
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }//wrap	

    }//RadarChart

}