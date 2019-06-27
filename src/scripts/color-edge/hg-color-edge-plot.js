require.config({
    paths: {
        d3: 'https://d3js.org/d3.v4.min'
    }
});
var grafo={};
var dictN={};
var dictL={};

function hgColorEdgePlot({graph,json}={}){
    require(['d3'],function(d3){
        if(graph!==undefined){
            console.log("graph")
            plotColorEdge(graph)
        }else if(json!==undefined){
            console.log("json")
            d3.json(json, function(error,graph){
                plotColorEdge(graph)    
            })
        }else{
            d3.json("scripts/data.json", function(error,graph){
                plotColorEdge(graph)
            })
        }
        
    })
}

    
function plotColorEdge(graph){
    require(['d3'],function(d3){
        grafo=graph;
    //var dataMarker = { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' };
var nodeR = 20, lNodeR = 0.3;    //raggio nodi e nodo iperarco
var nodeE = 30;
//var nodeId = 0;
var width = 2000,height = 2000;
var color = d3.scaleOrdinal(d3.schemeCategory20);
//zoom handler
var zoom = d3.zoom()
    .scaleExtent([1/2, 10])
    .on("zoom", zoomed);

//drag handler
var drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

//svg creation
var svg = d3.select(".hg-plot")
            .append("svg:svg")
            .attr("width",width)
            .attr("height",height)
            .attr("class", "amazingViz")
            .call(zoom)
            .append("g");


//defs creation for markers
var defs = svg.append("defs");

//force layout definition
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))//.distance(80).strength(1))
    .force("charge", d3.forceManyBody().strength(-50).distanceMin(30).distanceMax(200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide",d3.forceCollide(50));

//data reading from json file
    var nodes = graph.nodes,
        links = graph.links,
        bilinks = [];

    var nod=graph.nodelinks;
    grafo = JSON.parse(JSON.stringify(graph));

    nodes.forEach(function(element,i){
        dictN[element.id]=element.links;
    });
    links.forEach(function(element,i){
        dictL[element.id]=element.nodes;
    });

    var dictlinks ={};
    links.forEach(function(element,i){
        if((element.nodes).length>2)
        dictlinks[element.id]="ln"+(element.nodes).toString();
        if((element.nodes).length==2)
        dictlinks[element.id]=(element.nodes[1]).toString();
        if((element.nodes).length==1)
        dictlinks[element.id]=(element.nodes[0]).toString();
    });

    var dict = {};
    nod.forEach(function(element,i){
        dict["node:"+element.node+"-"+"link:"+dictlinks[element.link]]="Node:"+element.node+" - Link:"+element.link+" - Value:"+element.value;
    });


    
    //d3.hypergraph invocation passing links and nodes
    var data = hypergraph(links,nodes);
    //d3.hypergraph links
    links = data.links;
    //d3.hypergraph nodes
    nodes = data.nodes;
    //node mapping by id
    nodeById = d3.map(nodes, function(d) { return d.id; });

    links.forEach(function (link){
    var s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
        if(t==null && s!=null){
            t={
                id:s.id,
                link:null
            }
        }
        if(t!=null && s!=null){
        nodes.push(i);
        links.push({source: s, target: i}, {source: i, target: t});
        bilinks.push([s, i, t]);
        }
    });
    
    //links creation
        var link = svg.selectAll(".link")
        .data(bilinks)
        .enter().append("path")
        .attr("class", "link")
            .attr("marker-start","url(#circleMarker)")
        .attr("marker-mid","url(#textMarker)")
            .attr("marker-end",function (d){ 
                if (!d[2].link)
                    return "url(#circleMarker)";
            else
                return "null";
            })
            .style("stroke",function(d){
                if(isNaN(d[2].id)) return color(d[2].id);
                else               return color(d[2].id+d[0].id);
            });

    //node creation
        var node = svg.selectAll(".node")
        .data(nodes.filter(function(d) {
                return d.id;
                }))
        .enter().append("g")
        .attr("class", "node");
    //for every node -> svg circle creation
    node.append("circle")
        .attr("class", function(d){
            if (d.link){
                return "linknode";
            }else{
                return "node";
            }
        })
        .attr("r", function(d){
            if (d.link){
                return lNodeR;
            }else{
                return nodeR;
            }
        })
        .attr("fill", function(d) {
            if (d.link){
                return "rgb(100,100,100)";
                }else{
                return color(d.id);
                }
            });

    //id text
    node.append("text")
        .attr("dx", 22)
        .attr("dy", ".35em")
        .text(function(d) {
            if (!d.link)
                return d.id;
            return null;
        });

    link.append("title")
            .text(function(d,i){   
                return dict["node:"+d[0].id+"-"+"link:"+d[2].id];
            })

    //onmouseover id text
    node.append("title")
        .text(function(d) {
            if (!d.link)
                return d.id;
            return null;
        });

    node.call(drag);

    //sphere marker
    var marker = defs.append("marker")
    .attr("id","circleMarker")
    .attr("markerHeight", 5)
    .attr("markerWidth", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("viewBox", "-6 -6 12 12")
    .append("path")
    .attr("d","M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0")
    .attr("fill","black");

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
        diffX0 = d[0].x - d[1].x;
        diffY0 = d[0].y - d[1].y;
        diffX2 = d[2].x - d[1].x;
        diffY2 = d[2].y - d[1].y;
    
        pathLength01 = Math.sqrt((diffX0 * diffX0) + (diffY0 * diffY0));
        pathLength12 = Math.sqrt((diffX2 * diffX2) + (diffY2 * diffY2));
    
        offsetX0 = (diffX0 *  nodeR) / pathLength01;
        offsetY0 = (diffY0 *  nodeR) / pathLength01;
        if(!d[2].link){
            offsetX2 = (diffX2 * nodeR) / pathLength12;
            offsetY2 = (diffY2 * nodeR) / pathLength12;
        }else{
            offsetX2 = (diffX2 * lNodeR) / pathLength12;
            offsetY2 = (diffY2 * lNodeR) / pathLength12;
        }
    
        var x0Pos,y0Pos,x2Pos,y2Pos;
    
        if (d[0].link){
            x0Pos = d[0].x;
            y0Pos = d[0].y;
        }else{
            x0Pos = d[0].x - offsetX0;
            y0Pos = d[0].y - offsetY0;
        }
        if (d[2].link){
            x2Pos = d[2].x;
            y2Pos = d[2].y;
        }else{
            x2Pos = d[2].x - offsetX2;
            y2Pos = d[2].y - offsetY2;
        }

        if(d[2].link==null){
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
            if ( x1 === x2 && y1 === y2 ) {
              // Fiddle with this angle to get loop oriented.
              xRotation = -45;
      
              // Needs to be 1.
              largeArc = 1;
      
              // Change sweep to change orientation of loop. 
              //sweep = 0;
      
              // Make drx and dry different to get an ellipse
              // instead of a circle.
              drx = 30;
              dry = 20;
      
              // For whatever reason the arc collapses to a point if the beginning
              // and ending points of the arc are the same, so kludge it.
              x2 = x2 + 1;
              y2 = y2 + 1;
            } 
       return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
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
    
    function hypergraph(links,nodes) {
            var obj;
            var hyper = [];
            var	i;
            var	j;
            var	k;
            links.forEach(function(d) {
                //if link length >2 there's an Hyperlink: i need to create a connection node
                d = d.nodes;
                if (d.length > 2) {
                //connection node id creation
                    var	id = 'ln';
                    for(k = 0; k < d.length; k++) {
                        id += d[k]+",";
                    }
                    id = id.slice(0, -1); 
                //connection node creation
                    i = {id: id,link: true};
                //add the connection node to the node array
                    nodes.push(i);
                //creation of the link from every node of the connection set to the connection node
                    for (j = 0; j < d.length; j++) {
                        hyper.push({source: d[j], target: i.id});
                    }
                }else{
                //if link < 2 then the connection is the traditional one w/o connection node
                    hyper.push({source: d[0],target: d[1]});
                }
            });
    
                var obj  = {links:hyper,nodes:nodes};
                return obj;
    }
})
}







    $(document).ready(function(){
        $("#confirm").click(function(){
                var idNewNode = $('#idNewNode').val();                      //id new node
                var idHypergraphNewNode = $("#idHypergraphNewNode").val();  //id hypergraph for new node
                var idHypergraphNewNodeV = idHypergraphNewNode.split(',');  // vector hypergraph
                var valueNewNode = $("#valueNewNode").val();                //value of new node
                var valueNewNodeV = valueNewNode.split(',');                //vector values
                    if(idNewNode!=null && idNewNode && valueNewNodeV.length==idHypergraphNewNodeV.length){
                        $("svg").remove();
                        grafo["nodes"].push({"id":idNewNode.toString(),"links":idHypergraphNewNodeV});
                        idHypergraphNewNodeV.forEach(function(element,i){
                            grafo["links"].forEach(function(element,j){
                                if(grafo["links"][j].id==idHypergraphNewNodeV[i]){
                                    var z = grafo["links"][j].nodes;
                                    z.push(idNewNode);
                                    grafo["links"][j].nodes= z;
                                }
                            });
                            grafo["nodelinks"].push({"node":idNewNode.toString(),"link":idHypergraphNewNodeV[i].toString(),"value":valueNewNodeV[i].toString()})
                        });  
                        refresh();
                        plotColorEdge(grafo);
                    }


                var newIdHypergraph = $("#newIdHypergraph").val();
                var nodesInNewHypergraph = $("#nodesInNewHypergraph").val();
                var nodesInNewHypergraph = nodesInNewHypergraph.split(',');
                var valuesNodesInNewHypergraph = $("#valuesNodesInNewHypergraph").val();
                var valuesNodesInNewHypergraphV = valuesNodesInNewHypergraph.split(',');
                if(nodesInNewHypergraph.length==valuesNodesInNewHypergraphV.length && nodesInNewHypergraph.length!=1 && valuesNodesInNewHypergraphV.length!=1 && newIdHypergraph!=null && newIdHypergraph!=""){
                    $("svg").remove();
                    grafo["links"].push({"id":newIdHypergraph.toString(),"nodes":nodesInNewHypergraph});   //inserisco ai links, l'id e i nodi
                    nodesInNewHypergraph.forEach(function(element,i){
                        grafo["nodelinks"].push({"node":nodesInNewHypergraph[i].toString(),"link":newIdHypergraph.toString(),"value":valuesNodesInNewHypergraphV[i].toString()});    //nodelinks,  nodo - link - value
                        var z = dictN[nodesInNewHypergraph[i]];
                        z.push(newIdHypergraph.toString());
                        grafo["nodes"].forEach(function(element,j){
                            if(grafo["nodes"][j].id==nodesInNewHypergraph[i]){
                                grafo["nodes"][j].links=z;
                            }
                        });
                    });
                    refresh();
                    plotColorEdge(grafo);
                    }
        });

        $('input[type="checkbox"]').click(function(){
            var selnode = $("#selectnode").val();
            var x="";
            if($(this).prop("checked") == true){
                grafo["nodelinks"].forEach(function(element,i){
                    if(element.node==selnode)x=x+"Link:"+element.link+" with value:"+element.value+"\n";
                })
                alert(x);
                $("#checkbox").prop( "checked", false );
                refresh();
            }
        });


        $("#reset").click(function(){
            refresh();
        });


        function refresh(){
            $('#idNewNode').val("");
            $("#idHypergraphNewNode").val("");
            $("#valueNewNode").val("");
            $("#newIdHypergraph").val("");
            $("#nodesInNewHypergraph").val("");
            $("#valuesNodesInNewHypergraph").val("");
        }

});

