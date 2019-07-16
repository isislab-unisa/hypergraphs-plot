import {Hypergraph} from '../index';
import * as functions from '../index';


const nodes = [
    {"id":"1" , "links":["5"]},
    {"id":"2" , "links":["2","3","4"]},
    {"id":"3" , "links":["2","4"]},
    {"id":"4" , "links":["2"]},
    {"id":"5" , "links":["1","2","3","4"]},
    {"id":"6" , "links":[]},
    {"id":"7" , "links":["2"]},
    {"id":"8" , "links":["1","3","4"]},
    {"id":"9" , "links":["3"]},
    {"id":"10" , "links":["1","3","4"]}
];
const links = [
    {"id":"1", "nodes": ["5","8","10"]},
    {"id":"2", "nodes": ["2","3","4","5","7"]},
    {"id":"3", "nodes": ["2","5","8","9","10"]},
    {"id":"4", "nodes": ["2","3","5","8","10"]},
    {"id":"5", "nodes": ["1"]}
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
                {"node":"9","link":"3","value":"1"},
                {"node":"10","link":"1","value":"1"},
                {"node":"10","link":"3","value":"1"},
                {"node":"10","link":"4","value":"1"}
];
const HG = new Hypergraph(links,nodes,nodelink);

describe('Testing the return of the name of a Hypergraph',()=>{
test('The name is empty',()=>{
    expect(functions.getName(HG)).toBe('');
});
});

describe('Testing the set the name of a Hypergraph',()=>{
test('Set the name GrafoNetwork',()=>{;
    expect(functions.setName(HG,'GrafoNetwork')).toBe('done');
});
});

describe('Testing the return of the name of a Hypergraph',()=>{
test('The name is now GrafoNetwork',()=>{
    expect(functions.getName(HG)).toBe('GrafoNetwork');
});
});

describe('Testing the return number of the nodes of a Hypergraph',()=>{
test('The number of the nodes is 10',()=>{
    expect(functions.getNumNodes(HG)).toBe(10);
});
});

describe('Testing the return of the number of nodes',()=>{
test('The nodes are 10',()=>{
    expect(functions.getNodes(HG)).toBe(nodes);
});
});

describe('Testing return of the links of a Hypergraph',()=>{
test('The links are 5',()=>{
    expect(functions.getLinks(HG)).toBe(links);
});
});

describe('Testing return of the node-links of a Hypergraph',()=>{
test('The node-link are 10',()=>{
    expect(functions.getNodesLinks(HG)).toBe(nodelink);
});
});



describe('Testing return number of the links of a Hypergraph',()=>{
test('The number of the links is 5',()=>{
    expect(functions.getNumLinks(HG)).toBe(5);
});
});

describe('Testing return of a node which is in the hypergraph',()=>{
test('Node with id:1',()=>{
    expect(functions.getNodeAttributes(HG,"1")).toEqual(nodes[0]);
});
});

describe('Testing return of a node which is not in the hypergraph',()=>{
test('Node with id:11',()=>{
    expect(functions.getNodeAttributes(HG,"11")).toEqual(null);
});
});

describe('Testing return of a link which is in the hypergraph',()=>{
test('Node with id:1',()=>{
    expect(functions.getLinkAttributes(HG,"1")).toEqual(links[0]);
});
});

describe('Testing return of a link which is not in the hypergraph',()=>{
test('link with id:6',()=>{
    expect(functions.getLinkAttributes(HG,"6")).toEqual(null);
});
});


describe('Testing add a generic node of a Hypergraph',()=>{
test('Add node with id:12 and links["2","3"] and values ["1","2"]',()=>{
    const HGProva = new Hypergraph(links,nodes,nodelink);
    const idNode = "12";
    const link = ["2","3"];
    const values = ["1","2"];
    expect(functions.addNode(HGProva,idNode,link,values)).toEqual("add");
});
});

describe('Testing add a generic node with links  that do not exist of a Hypergraph',()=>{
test('Add node with id:14 and links["2","13"] and values ["1","2"]',()=>{
    const HGProva = new Hypergraph(links,nodes,nodelink);
    const idNode = "14";
    const link = ["2","13"];
    const values = ["1","2"];
    expect(functions.addNode(HGProva,idNode,link,values)).toEqual("notAdd");
});
});

describe('Testing add a generic node with more links than values in a Hypergraph',()=>{
test('Add node with id:15 and links["1","2"] and values ["1","2","3"]',()=>{
    const HGProva = new Hypergraph(links,nodes,nodelink);
    const idNode = "14";
    const link = ["2","13"];
    const values = ["1","2","3"];
    expect(functions.addNode(HGProva,idNode,link,values)).toEqual("inputIncorrect");
});
});

describe('Testing remove a node of a Hypergraph',()=>{
test('Remove node with id:12',()=>{
    const idNode = "12";
    expect(functions.removeNode(HG,idNode)).toEqual("removed");
});
});

describe('Testing remove a node not existing of a Hypergraph',()=>{
test('Remove node with id:14',()=>{
    const idNode = "14";
    expect(functions.removeNode(HG,idNode)).toEqual("notExisting");
});
});

describe('Testing if a hypergraph has a node',()=>{
test('Check if existing a node',()=>{
    const node={"id":"1" , "links":["5"]};
    expect(functions.hasNode(HG,node)).toBe("yes");
});
});

describe('Testing if a hypergraph not has a node',()=>{
test('Check if not existing a node',()=>{
    const node={"id":"1" , "links":["12"]};
    expect(functions.hasNode(HG,node)).toBe("no");
});
});

describe('Testing add a new hyperlink',()=>{
test('add link with id:6 and nodes:["1","3"] and values :["2","4"]',()=>{
    const idLink="6";
    const nodes=["1","3"];
    const values=["2","4"];
    expect(functions.addEdge(HG,idLink,nodes,values)).toBe("add");
});
});

describe('Testing add a new hyperlink with a node that not existing',()=>{
test('add link with id:6 and nodes:["1","13"] and values :["2","4"]',()=>{
    const idLink="7";
    const nodes=["1","13"];
    const values=["2","4"];
    expect(functions.addEdge(HG,idLink,nodes,values)).toBe("notAdd");
});
});


describe('Testing add a new hyperlink with more nodes than values',()=>{
test('add link with id:6 and nodes:["1","3","5"] and values :["2","4"]',()=>{
    const idLink="8";
    const nodes=["1","3","5"];
    const values=["2","4"];
    expect(functions.addEdge(HG,idLink,nodes,values)).toBe("inputIncorrect");
});
});

describe('Testing remove a hyperlink',()=>{
test('Remove link with id:6',()=>{
    const idLink="6";
    expect(functions.removeEdge(HG,idLink)).toBe("remove");
});
});

describe('Testing remove a hyperlink dosent exist',()=>{
test('Remove link with id:7',()=>{
    const idLink="7";
    expect(functions.removeEdge(HG,idLink)).toBe("inputIncorrect");
});
});

describe('Testing number of selfloop',()=>{
test('Selfloop is 1',()=>{
    expect(functions.numberSelfLoop(HG)).toBe(1);
});
});


