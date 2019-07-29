using PyCall
#=
plot hypergraph with different layouts and visualizations

type: extra_node, eulero_venn, matrix
layout: spring_layout, circular_layout

params: h: Hyperhgraph
        type: extra_node(default), eulero_venn, matrix
        layout: spring_layout(default), circular_layout
=#
function plot(JSONString::String; type="color-edge")
    if type=="venn"
        plotVenn(JSONString)
    elseif type=="radal"
        plotRadal(JSONString)
    else plotColorEdge(JSONString)
    end
end

function plot(h::Hypergraph; type="color-edge")
    generateFileJSON(h) #generate a json file into default path
    if type=="venn"
        plotVenn("data.json")
    elseif type=="radal"
        plotRadal("data.json")
    else plotColorEdge("data.json")
    end
end

function plotVenn(JSONString::String)
    #plotVennPY= pyimport("wrapper")[:plotVenn]
    #plotVennPY(JSONString)
    venn(JSONString)
end

function plotColorEdge(JSONString::String)
    #plotColorEdgePY= pyimport("wrapper")[:plotColorEdge]
    #plotColorEdgePY(JSONString)
    colorEdge(JSONString)
end

function plotRadal(JSONString::String)
    radal(JSONString)
end