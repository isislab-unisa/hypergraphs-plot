struct Widget
    type::String
    body::String
end

function widgetColorEdge(s::String)
    w= Widget("colorEdge", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/color-edge-style.css">
    </head>
    <div class="hg-plot"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgColorEdgePlot({graph:"""*s*"""});
    </script>
    """)

    return w
end

function widgetVenn(s::String)
    w= Widget("venn", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/venn-style.css">
    </head>
    <div id="venn"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgVennNodesPlot({graph:"""*s*"""});
    </script>
    """)

    return w
end

function widgetRadal(s::String)
    w= Widget("radal", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/radal-style.css">
    </head>
    <div class="radarChart"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgRadalPlot({graph:"""*s*"""})
    </script>
    """)

    return w
end

function display(w::Widget)
    HTML(w.body)
end
