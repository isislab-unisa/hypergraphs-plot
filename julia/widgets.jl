struct Widget
    type
    body
end

function widgetColorEdge(data,Preferences)
    w= Widget("colorEdge", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/color-edge-style.css">
    </head>
    <div class="hg-plot"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgColorEdgePlot({graph:"""*data*"""},{Preferences:"""*JSON.json(Preferences)*"""});
    </script>
    """)

    return w
end

function widgetVenn(data)
    w= Widget("venn", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/venn-style.css">
    </head>
    <div id="venn"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgVennNodesPlot({graph:"""*data*"""});
    </script>
    """)

    return w
end

function widgetRadal(data)
    w= Widget("radal", """
    <head>
    <link rel="stylesheet" type="text/css" href="css/radal-style.css">
    </head>
    <div class="radarChart"></div>
    <script src="./bundle.v1.0.js"></script>
    <script>
    hgplot.drawing.hgRadalPlot({graph:"""*data*"""})
    </script>
    """)

    return w
end

function display(w::Widget)
    HTML(w.body)
end
