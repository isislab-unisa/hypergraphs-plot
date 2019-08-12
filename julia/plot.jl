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
    plotting(JSON.json(JSON.parsefile(JSONString)),type)
end

function plot(h::Hypergraph; type="color-edge")
    generateFileJSON(h) #generate a json file into default path

    f = open("data.json","r")
    s = read(f,String)
    close(f)
    plotting(s,type)

end

function plotting(JSON::String,type)
    if type=="venn"
        venn(JSON)
    elseif type=="color-edge"
        colorEdge(JSON)
    elseif type=="radal"
        radal(JSON)
    end
end