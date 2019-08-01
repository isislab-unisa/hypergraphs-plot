import {VennHG} from '../../src/classes/index';


const nodes = [
    {"id":"1" , "links":["1","2","3"]},
    {"id":"2" , "links":["1","2"]},
    {"id":"3" , "links":["2"]},
    {"id":"4" , "links":["2"]},
    {"id":"5" , "links":["2"]}
];
const links = [
    {"id":"1", "nodes": ["1","2"]},
    {"id":"2", "nodes": ["1","2","3","4","5"]},
    {"id":"3", "nodes": ["1"]}
];
const nodelink =[
                {"node":"1","link":"1","value":"1"},
                {"node":"1","link":"2","value":"1"},
                {"node":"1","link":"3","value":"1"},
                {"node":"2","link":"1","value":"1"},
                {"node":"2","link":"2","value":"1"},
                {"node":"3","link":"2","value":"1"},
                {"node":"4","link":"2","value":"1"},
                {"node":"5","link":"2","value":"1"}
];
const HG = new VennHG(links,nodes,nodelink);

describe('Testing the return of the nodesInLinks of a VennHG',()=>{
test('nodesInLinks',()=>{
    var result =    { 
    '1': [ '1', '2' ],
    '2': [ '1', '2', '3', '4', '5' ],
    '3': [ '1' ],
    '1,2,3': [ '1' ],
    '1,2': [ '2' ] };
    expect(HG.getNodesInLinks()).toEqual(result);
});
});

describe('Testing the return of the dictNode of ColorEdge',()=>{
test('dictNode is size 5',()=>{
    var result =    
    { 
    '2': [ '3', '4', '5' ], 
    '1,2,3': [ '1' ], 
    '1,2': [ '2' ] };
    expect(HG.getNodesToDisplay()).toEqual(result);
});
});

describe('Testing the return of the dictLinks of ColorEdge',()=>{
test('dictLinks',()=>{
    var result ={
        "1": {"1": "1", "2": "1"}, 
        "1,2": {"1": {"2": "1"}, 
        "2": {"2": "1"}}, 
        "1,2,3": {"1": {"1": "1"}, 
        "2": {"1": "1"}, 
        "3": {"1": "1"}}, 
        "2": {"1": "1", "2": "1", "3": "1", "4": "1", "5": "1"}, 
        "3": {"1": "1"}};
    expect(HG.getValLinksNodes()).toEqual(result);
});
});

