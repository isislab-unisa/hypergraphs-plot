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
        for x in 1:n_ver
            y=1
            for y in 1:n_he
                if getindex(h,x,y)!=nothing
                    sNodeLinks=sNodeLinks*"
                    {\"node\":\""*string(x)*"\",\"link\":\""*string(y)*"\",\"value\":\""*string(getindex(h,x,y))*"\"},"
                end
            end
        end
        sNodeLinks=chop(sNodeLinks)
        sNodeLinks=sNodeLinks*"
        ]
    }"




s=s*sNodes*sLinks*sNodeLinks

    open("scripts/data.json","w") do f
        write(f, s)
    end

end
