using JSON

function generateFileJSON(h::Hypergraph)
    n_ver,n_he=size(h)
    s="{"


    sNodes="
    \"nodes\":["
    x=1
    for x in 1:n_ver
        sNodes=sNodes*"
        {\"id\":\""*string(x)*"\" , \"links\":["
        flag=true;
        y=1
        for y in 1:n_he
            if getindex(h,x,y)!=nothing
                sNodes=sNodes*"\""*string(y)*"\","
                flag=false;
            end
        end
        if flag==false
            sNodes=chop(sNodes);
        end
        sNodes=sNodes*"]},"
    end
    sNodes=chop(sNodes);
    sNodes=sNodes*"
    ],"




    sLinks="
    \"links\":["
    x=1
    for x in 1:n_he
        sLinks=sLinks*"
        {\"id\":\""*string(x)*"\", \"nodes\": ["
        flag=true;
        y=1
        for y in 1:n_ver
            if getindex(h,y,x)!=nothing
                sLinks=sLinks*"\""*string(y)*"\","
                flag=false;
            end
        end
        if flag==false
            sLinks=chop(sLinks)
        end
        sLinks=sLinks*"]},"
    end
    sLinks=chop(sLinks)
    sLinks=sLinks*"
    ],"



    sNodeLinks="
    \"nodelinks\":["
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
                y=1
                temp="ln"
                for y in y:length(pos)
                    temp=temp*string(pos[y])
                end
                for y in y:length(pos)
                    sNodeLinks=sNodeLinks*"
                    {\"node\":\""*string(pos[y])*"\",\"link\":\""*temp*"\",\"value\":\""*string(getindex(h,pos[y],x))*"\"},"
                end
            end
        end
        sNodeLinks=chop(sNodeLinks)
        sNodeLinks=sNodeLinks*"
        ]
    }"




s=s*sNodes*sLinks*sNodeLinks

    open("src/scripts/data.json","w") do f
        write(f, s)
    end

end
