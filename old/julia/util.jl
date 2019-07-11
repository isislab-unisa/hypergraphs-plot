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
            if random<= 1/3
                H[i,j]= 1
            end
        end
    end
    return H
end
