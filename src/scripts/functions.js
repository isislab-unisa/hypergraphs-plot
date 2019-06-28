
function calculateDict(){
    var nodes=grafo.nodes,
    links=grafo.links,
    nodelinksvalue=grafo.nodelinks;

nodes.forEach(function(element,i){
    dictNodes[element.id]=element.links;
});
links.forEach(function(element,i){
    if((element.nodes).length>=2)
    dictLinks[element.id]="ln"+(element.nodes).toString();
    if((element.nodes).length==1)
    dictLinks[element.id]="SelfLoop:"+element.id.toString();
});
nodelinksvalue.forEach(function(element,i){
    dictNodeLinks["node:"+element.node+"-"+"idlink"+element.link+"-link:"+dictLinks[element.link]]="Node:"+element.node+" - Link:"+element.link+" - Value:"+element.value;
});
}


$(document).ready(function(){
    $("#confirm").click(function(){
            calculateDict();
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
            if(nodesInNewHypergraph.length==valuesNodesInNewHypergraphV.length && nodesInNewHypergraph.length>=1 && valuesNodesInNewHypergraphV.length>=1 && newIdHypergraph!=null && newIdHypergraph!=""){
                $("svg").remove();
                grafo["links"].push({"id":newIdHypergraph.toString(),"nodes":nodesInNewHypergraph});   //inserisco ai links, l'id e i nodi
                nodesInNewHypergraph.forEach(function(element,i){
                    grafo["nodelinks"].push({"node":nodesInNewHypergraph[i].toString(),"link":newIdHypergraph.toString(),"value":valuesNodesInNewHypergraphV[i].toString()});    //nodelinks,  nodo - link - value
                    var z = dictNodes[nodesInNewHypergraph[i]];
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
