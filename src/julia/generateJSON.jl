using JSON

function generateFileJSON(h::Hypergraph)
    n_ver,n_he=size(h)
    s="{"

    sNodes="
    \"nodes\":["
    sLinks="
    \"links\":["
    sNodeLinks="
    \"nodelinks\":["

    x=1
    for x in 1:n_ver
        sNodes=sNodes*"
        {\"id\":\""*string(x)*"\"},"
    end
    sNodes=chop(sNodes);
    sNodes=sNodes*"
    ],"



    x=1
    for x in 1:n_he
        y=1
        pos=[]
        for y in 1:n_ver
            if getindex(h,y,x)!=nothing
                push!(pos,y)
            end
        end
        if length(pos)>1
            sLinks=sLinks*"
            ["
            y=1
            temp="ln"
            for y in y:length(pos)
                sLinks=sLinks*"\""*string(pos[y])*"\","
                temp=temp*string(pos[y])
            end
            for y in y:length(pos)
                sNodeLinks=sNodeLinks*"
                {\"id\":\""*string(pos[y])*"\",\"link\":\""*temp*"\",\"value\":\""*string(getindex(h,pos[y],x))*"\"},"
            end
            sLinks=chop(sLinks)
            sLinks=sLinks*"],"
        end
    end

    sLinks=chop(sLinks)
    sLinks=sLinks*"
    ],"

    sNodeLinks=chop(sNodeLinks)
    sNodeLinks=sNodeLinks*"
    ]
}"


s=s*sNodes*sLinks*sNodeLinks


open("../color-edge/data.json","w") do f
  write(f, s)
end
end
