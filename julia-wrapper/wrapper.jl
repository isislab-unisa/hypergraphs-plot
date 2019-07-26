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


function radal(s::String)

    HTML("""
    
    <style type="text/css">
        body {
            font-family: 'Open Sans', sans-serif;
            font-size: 11px;
            font-weight: 300;
            fill: #242424;
            text-align: center;
            text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
            cursor: default;
        }

        .legend {
            font-family: 'Raleway', sans-serif;
            fill: #333333;
        }

        .tooltip {
            fill: #333333;
        }
    </style>
    <div class="radarChart"></div>
    <script src="./dist/bundle.js"></script>
    <script type="text/javascript">
        radalPlot({json:'"""*s*"""'})
    </script>


    
    """)

end