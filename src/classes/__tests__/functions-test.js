test("questo è un test", function () {
    expect(1 + 1).toBe(2);
});


test("Numero nodi di un hypergraph", function(){
    this.nodes =[
        {"id":"1" , "links":["5"]},
        {"id":"2" , "links":["2","3","4"]},
        {"id":"3" , "links":["2","4"]},
        {"id":"4" , "links":["2"]},
        {"id":"5" , "links":["1","2","3","4"]},
        {"id":"6" , "links":[]},
        {"id":"7" , "links":["2"]},
        {"id":"8" , "links":["1","3","4","5"]},
        {"id":"9" , "links":["3"]},
        {"id":"10" , "links":["1","3","4"]}
    ];
    this.links=[
        {"id":"1", "nodes": ["5","8","10"]},
        {"id":"2", "nodes": ["2","3","4","5","7"]},
        {"id":"3", "nodes": ["2","5","8","9","10"]},
        {"id":"4", "nodes": ["2","3","5","8","10"]},
        {"id":"5", "nodes": ["1","8"]}
    ];
    this.nodelinks=[
        {"node":"1","link":"5","value":"1"},
        {"node":"2","link":"2","value":"1"},
        {"node":"2","link":"3","value":"1"},
        {"node":"2","link":"4","value":"1"},
        {"node":"3","link":"2","value":"1"},
        {"node":"3","link":"4","value":"1"},
        {"node":"4","link":"2","value":"1"},
        {"node":"5","link":"1","value":"1"},
        {"node":"5","link":"2","value":"1"},
        {"node":"5","link":"3","value":"1"},
        {"node":"5","link":"4","value":"1"},
        {"node":"7","link":"2","value":"1"},
        {"node":"8","link":"1","value":"1"},
        {"node":"8","link":"3","value":"1"},
        {"node":"8","link":"4","value":"1"},
        {"node":"8","link":"5","value":"1"},
        {"node":"9","link":"3","value":"1"},
        {"node":"10","link":"1","value":"1"},
        {"node":"10","link":"3","value":"1"},
        {"node":"10","link":"4","value":"1"}
];
    this.HGColorEdge = new ColorEdge(nodes,links,nodelinks);
    expect(getNumNodes(this.HGColorEdge)).toBe(10);
});