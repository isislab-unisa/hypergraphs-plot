using JSON

function generateFileJSON(h::Hypergraph)
    n_ver,n_he=size(h)
    s="{
    \"nodes\":["
    x=1
    for x in 1:n_ver
        s=s*"
        {\"id\": \""*string(x)*"\", \"group\":"*string(x)*"},"
    end
    s=chop(s)
    s=s*"
    ],
    \"links\":["
    x=1
    for x in 1:n_he
        y=1
        for y in 1:n_ver
            if getindex(h,y,x)!=nothing
                s=s*"
                {\"source\": \""*string(y)*"\", \"target\":\""*string(x)*"\", \"value\":"*string(getindex(h,y,x))*"},"
            end
        end
    end
    s=chop(s)
    s=s*"
    ]
    }"
open("C:\\Users\\Marti\\github\\hypergraphs-plot\\src\\color-edge\\data.json","w") do f
  write(f, s)
end
end
