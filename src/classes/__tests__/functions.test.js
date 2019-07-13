const {Hypergraph} = require('../Hypergraph');
const {getNodes,getLinks,getNodesLinks,getNumNodes,getNumLinks} = require('../functions');

const nodes = [
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
const links = [
    {"id":"1", "nodes": ["5","8","10"]},
    {"id":"2", "nodes": ["2","3","4","5","7"]},
    {"id":"3", "nodes": ["2","5","8","9","10"]},
    {"id":"4", "nodes": ["2","3","5","8","10"]},
    {"id":"5", "nodes": ["1","8"]}
];
const nodelink =[
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
const HG = new Hypergraph(links,nodes,nodelink);

describe('Testing return of the nodes of a Hypergraph',()=>{
test('The nodes are 10',()=>{
    expect(getNodes(HG)).toBe(nodes);
});
});

describe('Testing return of the links of a Hypergraph',()=>{
test('The links are 5',()=>{
    expect(getLinks(HG)).toBe(links);
});
});

describe('Testing return of the node-links of a Hypergraph',()=>{
test('The node-link are 10',()=>{
    expect(getNodesLinks(HG)).toBe(nodelink);
});
});

describe('Testing return number of the nodes of a Hypergraph',()=>{
test('The number of the nodes is 10',()=>{
    expect(getNumNodes(HG)).toBe(10);
});
});

describe('Testing return number of the links of a Hypergraph',()=>{
test('The number of the links is 5',()=>{
    expect(getNumLinks(HG)).toBe(5);
});
});

describe('Testing return of a node of a Hypergraph',()=>{
    test('Node with id:1 e and links["5"]',()=>{
        expect(getNodeAttributes(HG,"1")).toBe(nodes[0]);
    });
    });