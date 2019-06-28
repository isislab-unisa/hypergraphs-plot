module HypergraphsPlot

using GraphPlot
using SimpleHypergraphs
using LightGraphs
using JSON
using PyCall

export plot
export generatehg
export generateFileJSON

include("plot.jl")
include("util.jl")
include("generateJSON.jl")

function __init__()
    py"""
    from IPython.display import display, Javascript, HTML

    def plotColorEdge():
        return HTML(filename='hg-color-edge.html')
    
    def plotVenn():
        return HTML(filename='hg_venn.html')
    """
end

end