using SimpleHypergraphs

#=generate a random Hypergraph
params: node_num: number of nodes, default: 5
        he_num: number of hyper edges, default: 5

return: H: Hypergraph with Int64 values
=#
function generatehg(node_num=10, he_num=5)
    H= Hypergraph{Int64}(node_num, he_num)
    for i in 1:node_num
        for j in 1:he_num
            random= rand()
            if random<= 1/5
                H[i,j]= 1
            end
        end
    end
    return H
end





function conversionJSON(path::String)
    f = JSON.parsefile(path)
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
    
    json_string = JSON.json(Ipergrafo)
    
    return json_string
    end
