using PyCall
#=
plot hypergraphs with different visualizations

layout: color-edge, venn, radal

params: h: Hyperhgraph
        type: color-edge(default), venn, radal

example: plot(h, type="color-edge")
         plot("data.json", type="venn")
=#

idColorEdge=0
idRadal=0

function plot(JSONString::String;type="color-edge",colorNodes="default",colorEdges="default",sizeNodes="default")
    preferences=Dict()
    preferences["colorNodes"]=colorNodes;
    preferences["colorEdges"]=colorEdges;
    preferences["sizeNodes"]=sizeNodes;

    data = conversionJSON(JSONString)

    plotting(data,preferences,type)
end

function plot(h::Hypergraph;type="color-edge",colorNodes="default",colorEdges="default",sizeNodes="default")
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

function plotting(data,preferences,type)
    if type=="venn"
        plotVenn(data)
    elseif type=="color-edge"
        global idColorEdge=idColorEdge+1
        plotColorEdge(data,preferences,idColorEdge)
    elseif type=="radal"
        global idRadal=idRadal+1
        plotRadal(data,preferences,idRadal)
    end
end

