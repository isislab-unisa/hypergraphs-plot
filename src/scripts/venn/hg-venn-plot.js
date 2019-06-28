
require.config({
    paths: {
        d3src: "https://d3js.org",
        venn: 'https://rawgit.com/benfred/venn.js/master/venn'
    },
    map: {
        '*': {
            'd3': 'd3src/d3.v4.min',
            'd3-selection': 'd3src/d3-selection.v1.min',
            'd3-transition': 'd3src/d3-transition.v1.min',
            'd3-dispatch': 'd3src/d3-dispatch.v1.min',
            'd3-timer': 'd3src/d3-timer.v1.min',
            'd3-interpolate': 'd3src/d3-interpolate.v1.min',
            'd3-color': 'd3src/d3-color.v1.min',
            'd3-ease': 'd3src/d3-ease.v1.min',
        }
    }
});

var grafo = {}
var type;

/**
 * hgVennPlot can accept no params or a graph or a json string path with the follow sintax
 * hgVennPlot()
 * hgVennPlot({graph:graph})
 * hgVennPlot({json:string})
 */
function hgVennPlot({ graph, json } = {}) {
    require(['d3', 'venn'], function (d3, venn) {

        if (graph !== undefined) {
            console.log("with graph")
            plotVenn(graph)

        } else if (json) {
            console.log("with json")
            d3.json(json, function (error, graph) {
                if (error) throw error;
                plotVenn(graph)
            });
        } else {
            console.log("default path")
            d3.json("scripts/data.json", function (error, graph) {
                if (error) throw error;
                plotVenn(graph)
            });
        }

    })
}





function plotVenn(graph) {
    grafo = graph
    type="venn"
    console.log("@@@@@ grafo @@@@@@")
    console.log(graph)
    require(['d3', 'venn'], function (d3, venn) {

        var nodes = graph.nodes,
            links = graph.links,
            nodelinks = graph.nodelinks;

        //d3.hypergraph invocation passing links and nodes 
        let data = hypergraph(links, nodes, nodelinks)


        //creating sets
        var sets = [];
        for (var i = 0; i < data.links.length; i++) {
            sets.push({ sets: data.links[i].links, size: data.links[i].size, nodes: data.nodesInLinks[data.links[i].links], nodesToDisplay: data.nodesToDisplay[data.links[i].links], valLinksNodes: data.valLinksNodes[data.links[i].links] })
        }

        console.log(sets)

        //per rendere il grafo interattivo
        // add listeners to all the groups to display tooltip on mouseover
        var div = d3.select("#original");
        div.datum(sets).call(venn.VennDiagram().width(screen.width * 0.5).height(screen.height * 0.5));
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
            if (d.nodes!==undefined) {
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
        d3.select("#confirm").on("click",function(){
            d3.selectAll(".venntooltip").remove();
        })



        /*/TRY PLOTTING NODE, NEED REVIEW
    var texts= d3.selectAll("text").each(function(d, i){

        //get x and y center cordinates of each set
        var xs= d3.select(this).attr("x");
        var ys= d3.select(this).attr("y");
        
        //get the color of the set
        var color= d3.select(this).style("fill");

        //x and y positions of the nodes
        var positionsX= []
        var positionsY= []
        for(i=0; i<d.size; i++){ //generate d.size nodes with no overlappings
            console.log("positionX: " + positionsX);
            console.log("positionY: " + positionsY);
            var x=Math.round((Math.random()*30) * 100)/100;
            var y=Math.round((Math.random()*30) * 100)/100;

            if(Math.random()>0.5) x=-x;
            if(Math.random()>0.5) y=-y;
        
            //Da Controllare
            var find=false;
            for(j=0; j<=positionsX.length && !find; j++){
                
                var valuex= Math.abs(positionsX[j]) - Math.abs(parseInt(xs)+x);
                var valuey= Math.abs(positionsY[j]) - Math.abs(parseInt(ys)+y);
                console.log(Math.abs(valuex));
                console.log(Math.abs(valuey));
                
                if(Math.abs(valuex) <10 || Math.abs(valuey) <10){
                    i--;
                    find=true;
                }
            }
            if(!find){
                //draw node
                d3.select(this.parentNode).append("circle")
                        .attr("cx",parseInt(xs) + x)
                        .attr("cy",parseInt(ys) + y)
                        .attr("r",7)
                        .style("fill-opacity",0.8)
                        .style("fill",color)
                        .style("stroke","white")
                        .style("stroke-width",1)
                        .style("stroke-opacity",1);

                        positionsX.push(parseInt(xs) + x);
                        positionsY.push(parseInt(ys) + y);
            }
        }
    });*/
    })
}

//unused
function calculateRange() {

    var brother = d3.select(this.parentNode.firstChild);
    console.log("brother " + brother)
    console.log("attr d " + brother.attr("d"))

    var as = brother.attr("d").split('\n');
    console.log("a " + as);
    var dimensions = []
    for (i = 0; i < as.length; i++) {
        var worlds = as[i].split(" ");
        c = worlds[0];
        if (c === 'a' || c === 'A') {
            dimensions.push(worlds[1]);
        }
    }
    console.log("dimensions " + dimensions);

    var minDistance = d3.min(dimensions, function (d) { return d; })
    console.log("min distance " + minDistance)

    var ran = minDistance / d.size;
    console.log("range " + ran);

    return ran;
}

function hypergraph(links, nodes, nodelinks) {
    var map = {} //map used to store the sets and the number of nodes
    var nodesInLinks = {} //object that store the sets and the nodes inside the sets
    var nodesToDisplay = {} //object that store the node to display
    var valLinksNodes = {} //object that store the val of the nodes in each links
    var MAX_SIZE = nodes.length * 10 //max size of venn diagram
    var OFFSET = links.length //offset used for the visualization

    //add sets and nodes inside sets
    var linkss = []
    for (var i = 0; i < links.length; i++) {
        var arr = []
        arr.push(links[i].id)
        linkss.push({ links: arr, size: MAX_SIZE })

        //fill nodesInLinks
        var s1 = links[i].id
        var s2 = links[i].nodes
        nodesInLinks[s1] = s2
    }//end

    //fill valLinksNodes
    console.log("@@@@@ val links @@@@@@")
    nodelinks.forEach(element => {
        if (valLinksNodes[element.link] === undefined) {
            valLinksNodes[element.link] = {}
            valLinksNodes[element.link][element.node] = element.value

        } else {
            valLinksNodes[element.link][element.node] = element.value
        }
    });
    nodes.forEach(node => {
        var intersection = node.links
        if (valLinksNodes[intersection] === undefined) {
            valLinksNodes[intersection] = {}
        }
        if (intersection.length > 1) {
            intersection.forEach(element => {
                if (valLinksNodes[intersection][element] === undefined) {
                    valLinksNodes[intersection][element] = {}
                }
                valLinksNodes[intersection][element][node.id] = valLinksNodes[element][node.id]
            });
        }
    });
    console.log(valLinksNodes)


    //intersections, sizes and nodes
    nodes.forEach(element => {
        //interctions
        if (map[element.links] === undefined) {
            map[element.links] = 1
        } else { map[element.links] = map[element.links] + 1; }

        //fill nodesInLinks
        if (nodesInLinks[element.links] === undefined) {
            nodesInLinks[element.links] = new Array(element.id)
        } else {
            if (element.links.length != 1) {
                var v = nodesInLinks[element.links]
                v.push(element.id)
                nodesInLinks[element.links] = v
            }
        }

        //fill nodesToDisplay
        if (nodesToDisplay[element.links] === undefined) {
            nodesToDisplay[element.links] = new Array(element.id)
        } else {
            var v = nodesToDisplay[element.links]
            v.push(element.id)
            nodesToDisplay[element.links] = v
        }

        //add couples needed for display
        if (element.links.length > 2) {
            for (var i = 0; i < element.links.length - 1; i++) {
                for (var j = i + 1; j < element.links.length; j++) {
                    var couple = [element.links[i], element.links[j]]
                    if (map[couple] === undefined) {
                        map[couple] = 1
                    } else { map[couple] = map[couple] + 1 }
                }
            }
        }
    });//end


    i = 0
    //add intersections
    Object.entries(map).forEach(entry => {
        //entry[0] is the intersection
        //entry[1] is the number of nodes inside of intersection
        if (entry[0].length != 0 && entry[0].length != 1) {
            var arr = []
            arr = entry[0].split(",");
            linkss.push({ links: arr, size: Math.round(MAX_SIZE / entry[0].length * MAX_SIZE / 100 + OFFSET) })
            i++
        }
    })//end

    var obj = { links: linkss, nodes: nodes, nodesInLinks: nodesInLinks, nodesToDisplay: nodesToDisplay, valLinksNodes: valLinksNodes };
    return obj;
}

