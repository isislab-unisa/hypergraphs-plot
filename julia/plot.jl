using PyCall
#=
plot hypergraphs with different visualizations

layout: color-edge, venn, radal

params: h: Hyperhgraph
        type: color-edge(default), venn, radal

example: plot(h, type="color-edge")
         plot("data.json", type="venn")
=#
function plot(JSONString::String; type="color-edge")
    f = open(JSONString,"r")
    data = read(f,String)
    close(f)
    plotting(data,type)
end

function plot(h::Hypergraph; type="color-edge")
    generateFileJSON(h) #generate a json file into default path

    f = open("data.json","r")
    data = read(f,String)
    close(f)
    plotting(data,type)

end

function plotting(data, type)
    if type=="venn"
        plotVenn(data)
    elseif type=="color-edge"
        plotColorEdge(data)
    elseif type=="radal"
        plotRadal(data)
    end
end

