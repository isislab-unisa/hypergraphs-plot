require.config({
    paths: {
        d3: 'https://d3js.org/d3.v4.min'
    }
});
var grafo;
var dictN ={};
var dictL ={};
var dictNL={};

function hgColorEdgePlot(){
    require(['d3'],function(d3){

    //var dataMarker = { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' };
    var nodeR = 20, lNodeR = 0.3;    //raggio nodi e nodo iperarco
    var nodeId = 0;
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
    var svg = d3.select("#hg-plot")
                .append("svg:svg")
                .attr("width",width)
                .attr("height",height)
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
    d3.json("scripts/data.json", function(error, graph) {
          if (error) throw error;
          if(grafo==null)
          grafo=graph;

          readJson(grafo);
    });


    function readJson(graph){
        var nodes = graph.nodes,
            links = graph.links,
            bilinks = [];
        
        var nod=graph.nodelinks;
        
        var dictlinks ={};
        links.forEach(function(element,i){
            if((element.nodes).length>2)
            dictlinks[element.id]="ln"+(element.nodes).toString();
            else
            dictlinks[element.id]=(element.nodes[1]).toString();
        });
       // console.log(dictlinks);

        var dict = {};
        nod.forEach(function(element,i){
            dict["node:"+element.node+"-"+"link:"+dictlinks[element.link]]=element.value;
        });
        nodes.forEach(function(element,i){
            dictN[element.id]=element.links;
        });
        links.forEach(function(element,i){
            dictL[element.id]=element.nodes;
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
            nodes.push(i);
            links.push({source: s, target: i}, {source: i, target: t});
            bilinks.push([s, i, t]);
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
                    //console.log(d);                 
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




        $(document).ready(function(){

            var x = $('#newnodes').val();
            var idhe = $("#newhyperedgesid").val();
            var nodeshe = $("#newhyperedgesnodes").val();
            var newhyperedgesvalues = $("#newhyperedgesvalues").val();

            $("#confirm").click(function(){
                if(x!=null && x){
                    $("#hg-plot").empty();
                    grafo["nodes"].push({"id":x.toString(),"links":[]});
                    hgColorEdgePlot();
                }
                if(nodeshe.length==newhyperedgesvalues.length && idhe && nodeshe && newhyperedgesvalues){
                        var numbersArray = nodeshe.split(',');
                        var values = newhyperedgesvalues.split(',');
                        grafo["links"].push({"id":idhe.toString(),"nodes":numbersArray});
                        numbersArray.forEach(function(element,i){
                            grafo["nodelinks"].push({"node":numbersArray[i].toString(),"link":idhe.toString(),"value":values[i].toString()});
                            var z = dictN[numbersArray[i]];
                            z.push(nodeshe.toString());
                            grafo["nodes"].forEach(function(element,j){
                                if(grafo["nodes"][j].id==numbersArray[i]){
                                    grafo["nodes"][j].links=z;
                                }
                            });

                        });
                }



            });

            $("#reset").click(function(){
                $('#newnodes').val("");
                $("#newhyperedgesid").val("");
                $("#newhyperedgesnodes").val("");
                $("#newhyperedgesvalues").val("");
            });

            
            


            $('input[type="checkbox"]').click(function(){

                if($(this).prop("checked") == true){
    
                    alert("Checkbox is checked.");
    
                }
            });





          });
        




    });
}

