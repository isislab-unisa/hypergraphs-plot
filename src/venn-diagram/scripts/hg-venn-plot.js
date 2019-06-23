
require.config({
    paths: {
        d3src: "https://d3js.org",
        venn:'https://rawgit.com/benfred/venn.js/master/venn'
    },
    map: {
        '*': {
            'd3'             : 'd3src/d3.v4.min',
            'd3-selection'   : 'd3src/d3-selection.v1.min',
            'd3-transition'  : 'd3src/d3-transition.v1.min',
            'd3-dispatch'    : 'd3src/d3-dispatch.v1.min',
            'd3-timer'       : 'd3src/d3-timer.v1.min',
            'd3-interpolate' : 'd3src/d3-interpolate.v1.min',
            'd3-color'       : 'd3src/d3-color.v1.min',
            'd3-ease'        : 'd3src/d3-ease.v1.min',
        }
    }
});
        

function hgVennPlot(){  
    require(['d3', 'venn'], function(d3, venn){
        d3.json("dataVENN.json", function(error, graph) {
            if (error) throw error;
            
          var nodes = graph.nodes,
              links = graph.links,
              nodelinks = graph.nodelinks;
  
          nodes.forEach(element => {
              console.log(element.id + "  " + element.links)
          });
          console.log("links " + links)
          nodelinks.forEach(element => {
              console.log(element.id + "  " + element.link + "  " + element.value)
          });

          //d3.hypergraph invocation passing links and nodes 
          let data = hypergraph(links,nodes,nodelinks)
          
          //creating sets
          var sets= [];
  
          console.log("@@@@@ HTML @@@@@")
          console.log(data.links)
          console.log(data.nodes)
  
          //creating sets
          for(var i=0; i<data.links.length; i++){
              sets.push({sets: data.links[i].links, size: data.links[i].size})
          }

          console.log("sets");
          console.log(sets);
  
          //per rendere il grafo interattivo
          // add listeners to all the groups to display tooltip on mouseover
          var div= d3.select("#original");
          div.datum(sets).call(venn.VennDiagram().width(screen.width * 0.5).height(screen.height * 0.5));
          var tooltip = d3.select("body").append("div").attr("class","venntooltip");
  
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
  
          div.selectAll("g").on("mouseover", function(d, i) {
              // sort all the areas relative to the current item
              venn.sortAreas(div, d);
              console.log(venn.sortAreas(div, d))
              console.log(d.sets);
              console.log(d.sets.length);
              console.log("NODIIII" + d.nodes)
  
              // Display a tooltip with the current size
              tooltip.transition().duration(400).style("opacity", .9);
              tooltip.text(d.size)
              
              
              // highlight the current path
              var selection = d3.select(this).transition("tooltip").duration(400);
              selection.select("path")
                  .style("stroke-width", 3)
                  .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                  .style("stroke-opacity", 1)
                  .style("stroke", "white");
              }).on("mousemove", function() {
                  tooltip.style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
              }).on("mouseout", function(d, i) {
                  tooltip.transition().duration(400).style("opacity", 0);
                  var selection = d3.select(this).transition("tooltip").duration(400);
                  selection.select("path")
                      .style("stroke-width", 0)
                      .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                      .style("stroke-opacity", 0);
              });
              
          });
  
          //unused
          function calculateRange(){
  
              var brother= d3.select(this.parentNode.firstChild);
              console.log("brother " + brother)
              console.log("attr d " + brother.attr("d"))
  
              var as= brother.attr("d").split('\n');
              console.log("a " + as);
              var dimensions= []
              for(i=0; i<as.length; i++){
                  var worlds= as[i].split(" ");
                  c= worlds[0];
                  if(c==='a' || c=== 'A'){
                      dimensions.push(worlds[1]);
                  }
              }
              console.log("dimensions " + dimensions);
  
              var minDistance= d3.min(dimensions, function(d){return d; })
              console.log("min distance " + minDistance)
  
              var ran= minDistance / d.size;
              console.log("range " + ran);
  
              return ran;
          }
    })
}