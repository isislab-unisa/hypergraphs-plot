#=
plot hypergraph with different layouts and visualizations

type: extra_node, eulero_venn, matrix
layout: spring_layout, circular_layout

params: h: Hyperhgraph
        type: extra_node(default), eulero_venn, matrix
        layout: spring_layout(default), circular_layout
=#
function plot(h::Hypergraph; type= "color-edge")
    generateFileJSON(h)
    if type=="color-edge"
        plotColorEdge()
    elseif type=="venn"
        plotVenn()
    end
end

plotColorEdge() = py"plotColorEdge"()
plotVenn() = py"plotVenn"()