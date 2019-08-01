import {ColorEdgeHG} from '../../src/classes/index';


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
const HG = new ColorEdgeHG(links,nodes,nodelink);

describe('Testing the return of the hyper of ColorEdge',()=>{
test('Hyper',()=>{
    var result =    [ { source: '1', target: '2', linkid: '1', type: 'edge' },
    { source: '1',
        target: 'Link:2-ln1,2,3,4,5',
        linkid: '2',
        type: 'hyperedge' },
    { source: '2',
        target: 'Link:2-ln1,2,3,4,5',
        linkid: '2',
        type: 'hyperedge' },
    { source: '3',
        target: 'Link:2-ln1,2,3,4,5',
        linkid: '2',
        type: 'hyperedge' },
    { source: '4',
        target: 'Link:2-ln1,2,3,4,5',
        linkid: '2',
        type: 'hyperedge' },
    { source: '5',
        target: 'Link:2-ln1,2,3,4,5',
        linkid: '2',
        type: 'hyperedge' },
    { source: '1',
        target: '1',
        linkid: '3',
        type: 'selfloop',
        size: 12 } ];
    expect(HG.getHyper()).toEqual(result);
});
});

describe('Testing the return of the dictNode of ColorEdge',()=>{
test('dictNode is size 5',()=>{
    var result ={ 
    '1': [ '1', '2', '3' ],
    '2': [ '1', '2' ],
    '3': [ '2' ],
    '4': [ '2' ],
    '5': [ '2' ] };
    expect(HG.getDictNodes()).toEqual(result);
});
});

describe('Testing the return of the dictLinks of ColorEdge',()=>{
test('dictLinks',()=>{
    var result =[
        {"id": "1", "nodes": ["1", "2"]}, 
        {"id": "2", "nodes": ["1", "2", "3", "4", "5"]}, 
        {"id": "3", "nodes": ["1"]}];
    expect(HG.getLinks()).toEqual(result);
});
});

describe('Testing the return of the dictNodeLinks of ColorEdge',()=>{
test('dictNodeLinks',()=>{
    var result =    { 
        'node:1-Link:1-ln1,2': 'Node:1 - Link:1 - Value:1',
        'node:1-Link:2-ln1,2,3,4,5': 'Node:1 - Link:2 - Value:1',
        'node:1-Link:3-SelfLoop:3': 'Node:1 - Link:3 - Value:1',
        'node:2-Link:1-ln1,2': 'Node:2 - Link:1 - Value:1',
        'node:2-Link:2-ln1,2,3,4,5': 'Node:2 - Link:2 - Value:1',
        'node:3-Link:2-ln1,2,3,4,5': 'Node:3 - Link:2 - Value:1',
        'node:4-Link:2-ln1,2,3,4,5': 'Node:4 - Link:2 - Value:1',
        'node:5-Link:2-ln1,2,3,4,5': 'Node:5 - Link:2 - Value:1' };
    expect(HG.getDictNodeLinks()).toEqual(result);
});
});
