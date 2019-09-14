using PyCall
#=
plot hypergraphs with different visualizations

layout: color-edge, venn, radal

params: h: Hyperhgraph
        type: color-edge(default), venn, radal

example: plot(h, type="color-edge")
         plot("data.json", type="venn")
=#
function plot(JSONString::String;type="color-edge",colorNodes="#D3D3D3",colorEdges="default",sizeNodes=10)
    preferences=Dict()
    preferences["colorNodes"]=colorNodes;
    preferences["colorEdges"]=colorEdges;
    preferences["sizeNodes"]=sizeNodes;

    f = open(JSONString,"r")
    data = read(f,String)
    close(f)
    plotting(data,preferences,type)
end

function plot(h::Hypergraph;type="color-edge",colorNodes="#D3D3D3",colorEdges="default",sizeNodes=10)
    preferences=Dict()
    preferences["colorNodes"]=colorNodes;
    preferences["colorEdges"]=colorEdges;
    preferences["sizeNodes"]=sizeNodes;

    generateFileJSON(h) #generate a json file into default path

    f = open("data.json","r")
    data = read(f,String)
    close(f)
    plotting(data,preferences,type)

end

function plotting(data,Preferences,type)
    if type=="venn"
        plotVenn(data)
    elseif type=="color-edge"
        plotColorEdge(data,Preferences)
    elseif type=="radal"
        plotRadal(data)
    end
end

