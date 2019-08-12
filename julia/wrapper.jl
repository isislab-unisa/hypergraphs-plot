using IJulia

function venn(s::String)
    HTML( """
    <head>
    <link rel="stylesheet" type="text/css" href="css/venn-style.css">
    </head>
    <div id="venn"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgVennNodesPlot({graph:"""*s*"""});
    </script>
    """) 
end

function colorEdge(s::String)
    HTML( """
    <head>
    <link rel="stylesheet" type="text/css" href="css/color-edge-style.css">
    </head>
    <div class="hg-plot"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgColorEdgePlot({ graph: """*s*""" });
    </script>
    """)
end


function radal(s::String)
    HTML("""
    <head>
    <link rel="stylesheet" type="text/css" href="css/radal-style.css">
    </head>
    <div class="radarChart"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgRadalPlot({graph:"""*s*"""})
    </script>
    """)

end