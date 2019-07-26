using IJulia

function venn(s::String)
    
    HTML( """
    <style>
    .input-group-lg{
    position:absolute;
    top:0;
    right:50px;
    max-width:15%;
}
#confirm{
    margin-top:5%;
}
#reset{
    margin-top:5%;
}

#original {
    margin-left: 0%;
}

.venntooltip{
    position:absolute;
    text-align: left;
    background: #333;
    color: #ddd;
    padding: 2px;
    border: 0px;
    border-radius: 8px;
}

#links_information{
    min-width: 20%;
    min-height: 20%;
    position: absolute;
    bottom:0;
    right: 0;
    display: none;
}

#links_information span{
    font-size: 1.8em;
    cursor: pointer;
    margin-left: 0.5%;
    padding:5px;
}

#close_information{
    float: right; 
    color: brown;
}

table {
    border-collapse: collapse;
    border-radius: 8px;
    background-color: #f7dc6f;
}
  
th{
    border-bottom: 1px solid black;
    min-width: 5%;
    text-align: center;
}

td{
    text-align: center;
}
</style>

    <div id="original"></div>
    <script src="./dist/bundle.js"></script>
    <script src="old/julia/wrapper.js"></script>
    <script>
        vennPlot({json:'"""*s*"""'});
    </script>
    
    """)
    
end

function colorEdge(s::String)
    
    HTML( """
    <style>
    .link {
        stroke-width:2px;
      fill: none;
      stroke: #bbb;
    }
    .node circle {
      pointer-events: all;
      stroke: #000;
      stroke-width: 1px;
    }
    </style>

    <div class="hg-plot"></div>
    <script src="./dist/bundle.js"></script>
    <script src="old/julia/wrapper.js"></script>
    <script>
        colorEdgePlot({json:'"""*s*"""'});
    </script>
    
    """)
    
end
