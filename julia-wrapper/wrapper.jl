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

    </style>

    <div id="original"></div>
    <script src="./dist/bundle.js"></script>
    <script src="julia-wrapper/wrapper.js"></script>
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
    <script src="julia-wrapper/wrapper.js"></script>
    <script>
        colorEdgePlot({json:'"""*s*"""'});
    </script>
    
    """)
    
end
