require.config({
    paths: {
        d3: 'https://d3js.org/d3.v4.min'
    }
});

$(document).ready(function(){
    $("#confirm").click(function(){
        var x = $('#newnodes').val();
        if(x!=null){
            require(['d3'],function(d3){
            d3.json("scripts/data.json", function(error, graph) {
                graph["nodes"].push({"id":x,"link":[]});
                console.log(graph);
                readJson(graph);
            });
            });
        }
    });


    
  });

