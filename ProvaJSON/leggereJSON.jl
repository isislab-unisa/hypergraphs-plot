import JSON

println("Vecchio JSON")
f = JSON.parsefile("ProvaJSON/vecchioJSON.json")
#=
println("NODI")
println(f["nodes"])
println("LINKS")
println(f["links"])
println("NODELINK")
println(f["nodelinks"])
=#
println(f)

f = JSON.parsefile("ProvaJSON/nuovoJSON.json")
hg = f["hg"]
vertices = hg["vertices"]
hyperedges = hg["hyperedges"]


nodes = []
links = []
nodelinks = []


Nodi = Dict()
for (key,value) in vertices
    Nodi[key]=[]
end



for (keyLink, valueLink) in hyperedges
    Link = Dict()
    Link["id"]=keyLink
    vertici = []
    for (keyNodes, valueNodes) in valueLink["vertices"]   
        nodelink = Dict()
        nodelink["node"]=keyNodes
        nodelink["link"]=keyLink
        nodelink["value"]=string(valueNodes)
        push!(nodelinks,nodelink)

        push!(vertici,string(keyNodes))

        linksdeinodi = Nodi[keyNodes]
        Nodi[keyNodes] = push!(linksdeinodi,keyLink)
    end
    Link["nodes"]=vertici
    push!(links,Link)
end

for (key,value) in Nodi
    Nodo = Dict()
    Nodo["id"]=key
    Nodo["links"]=value
    push!(nodes,Nodo)
end

Ipergrafo = Dict()
Ipergrafo["nodes"]=nodes
Ipergrafo["links"]=links
Ipergrafo["nodelinks"]=nodelinks
#=
println("NUOVO JSON")
println("NODES")
println(nodes)
println("LINKS")
println(links)
println("NODELINKS")
println(nodelinks)
=#
println(Ipergrafo)
println(JSON.json(Ipergrafo))
json_string = JSON.json(Ipergrafo)


#=
open("ProvaJSON/risultato.json","w") do f
    JSON.print(f, json_string)
end
=#

open("ProvaJSON/risultato.json","w") do f
    JSON.print(f, Ipergrafo)
end