#=
plot hypergraph with different layouts and visualizations

type: extra_node, eulero_venn, matrix
layout: spring_layout, circular_layout

params: h: Hyperhgraph
        type: extra_node(default), eulero_venn, matrix
        layout: spring_layout(default), circular_layout
=#
function hgplot(h::Hypergraph; type= "color-edge", layout="spring_layout")
    generateFileJSON(h,"color-edge")
end