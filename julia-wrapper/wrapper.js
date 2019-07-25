

require.config({
    paths: {
        d3: 'https://d3js.org/d3.v4.min'
    }
});

function vennPlot({ json } = {}) {
    if (json) {
        require(['d3'], function (d3) {
            d3.json(json, function (error, graph) {
                hgplot.drawing.hgVennPlot({ graph: graph })
            })
        });
    }else{
        hgplot.drawing.hgVennPlot();
    }
}

function colorEdgePlot({json} = {}){
    if (json) {
        require(['d3'], function (d3) {
            d3.json(json, function (error, graph) {
                hgplot.drawing.hgColorEdgePlot({ graph: graph })
            })
        });
    }else{
        hgplot.drawing.hgColorEdgePlot();
    }
}


function radalPlot({json} = {}){
    if (json) {
        require(['d3'], function (d3) {
            d3.json(json, function (error, graph) {
                hgplot.drawing.hgRadalPlot({ graph: graph })
            })
        });
    }else{
        hgplot.drawing.hgRadalPlot();
    }
}
