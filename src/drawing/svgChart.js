import * as d3 from "d3";
import {RadalHG} from "../classes/index"

var grafo = {}
var type;

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
    var radal = new RadalHG(graph.links,graph.nodes,graph.nodelinks);
    var nodes = radal.nodes;	//nodi
    var links = radal.links;	//link
    var nodelinks = radal.nodelinks;	//nodo-link-value
    var data = radal.data;
    var start = radal.startlevel;
    var dictNodeLinkValue = radal.dictNodeLinkValue;
    var edges = radal.edges;
    var selfloop = radal.selfloop;

    console.log(links);
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
    var margin = { top: 100, right: 200, bottom: 200, left: 100 };

       
    var dictX = [];
    var dictY = [];

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
            })
            .append("title")
            .attr("dx", 22)
            .attr("dy", ".35em")
            .text(function(d,i){
                if(d.value==1) {
                    if(d.bool==true) return "Nodo:"+d.axis;
                    else{
                            var s ="Nodo:"+d.axis+"\n";
                            selfloop.forEach(function(element,i){
                                if(d.axis==element.nodo) s=s+dictNodeLinkValue["Nodo:"+d.axis+" Link:"+element.link];
                            });
                            
                            console.log(s);
                            return s;
                        }
                    }
                else		   {
                    return dictNodeLinkValue["Nodo:"+d.axis+" Link:"+d.link];}
                })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
        blobWrapper


            g
            .data(edges)
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
            .style("fill", "none")
            .append("title")
            .attr("dx", 22)
            .attr("dy", ".35em")
            .text(function(d,i){
                var s=dictNodeLinkValue["Nodo:"+d.nodo1+" Link:"+d.link]+"\n"+dictNodeLinkValue["Nodo:"+d.nodo2+" Link:"+d.link]
                return s;
            });
            




        //Set up the small tooltip for when you hover over a circle
        var tooltip = g.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);



            


        // Create Event Handlers for mouse
        function handleMouseOver(d, i) {  // Add interactivity
            // Use D3 to select element, change color and size
            d3.select(this).attr({
            fill: "orange",
            r: radius * 2
            });
            // Specify where to put label of text
            svg.append("text").attr({
            id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return xScale(d.x) - 30; },
                y: function() { return yScale(d.y) - 15; }
            })
            .text(function() {
            return dictNodeLinkValue["Nodo:"+d.axis+" Link:"+d.link];  // Value of the text
            });
        }

        function handleMouseOut(d, i) {
                // Use D3 to select element, change color back to normal
                d3.select(this).attr({
                fill: "black",
                r: radius
                });
                // Select text by id and then remove
                d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
        }



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