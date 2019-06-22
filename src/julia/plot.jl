#=
plot hypergraph with different layouts and visualizations

type: extra_node, eulero_venn, matrix
layout: spring_layout, circular_layout

params: h: Hyperhgraph
        type: extra_node(default), eulero_venn, matrix
        layout: spring_layout(default), circular_layout
=#
function hgplot(h::Hypergraph, vis="color-edge")
    if vis== "color-edge"
        extranodeJSON(h)
    elseif vis=="eulero_venn"
        eulero_vennJSON(h)
    end
end

function hgplot(h::Hypergraph; type= "color-edge", layout="spring_layout")
    if type=="color-edge"
        hgplot(h, "color-edge")
    elseif type=="eulero_venn"
        hgplot(h, "eulero_venn")
    end
end

function extranodeJSON(h::Hypergraph)
    generateFileJSON(h)
end

function eulero_vennJSON(h::Hypergraph)
    #createJSON eulero
end