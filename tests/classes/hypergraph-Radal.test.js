import {RadalHG} from '../../src/classes/index';


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
const HG = new RadalHG(links,nodes,nodelink);

describe('Testing the return of the edges of a RadalHG',()=>{
test('Edges',()=>{
    var result = [ { nodo1: 'idNodo1', nodo2: 'idNodo2', link: '1' } ];
    expect(HG.getEdges()).toEqual(result);
});
});

/*
describe('Testing the return of the dictNodeLinkValue of a RadalHG',()=>{
test('dictNodeLinkValue',()=>{
    var result=    
  [ 'Nodo:idNodo1 Link:1': 'Nodo:1 Link:1 Value:1',
    'Nodo:idNodo1 Link:2': 'Nodo:1 Link:2 Value:1',
    'Nodo:idNodo1 Link:3': 'Nodo:1 Link:3 Value:1',
    'Nodo:idNodo2 Link:1': 'Nodo:2 Link:1 Value:1',
    'Nodo:idNodo2 Link:2': 'Nodo:2 Link:2 Value:1',
    'Nodo:idNodo3 Link:2': 'Nodo:3 Link:2 Value:1',
    'Nodo:idNodo4 Link:2': 'Nodo:4 Link:2 Value:1',
    'Nodo:idNodo5 Link:2': 'Nodo:5 Link:2 Value:1' ];
    expect(HG.getDictNodeLinkValue()).toEqual(result);
});
});*/

describe('Testing the return of the StartLevel of a RadalHG',()=>{
test('StartLevel',()=>{
    expect(HG.getStartLevel()).toBe(0);
});
});

/*
describe('Testing the return of the Data of a RadalHG',()=>{
test('Data',()=>{
    var result =[ [ 
    { axis: 'idNodo1', value: 2, bool: true, link: '2' },
    { axis: 'idNodo2', value: 2, bool: true, link: '2' },
    { axis: 'idNodo3', value: 2, bool: true, link: '2' },
    { axis: 'idNodo4', value: 2, bool: true, link: '2' },
    { axis: 'idNodo5', value: 2, bool: true, link: '2' } ],
  [ { axis: 'idNodo1', value: 0, bool: false },
    { axis: 'idNodo2', value: 0, bool: true },
    { axis: 'idNodo3', value: 0, bool: true },
    { axis: 'idNodo4', value: 0, bool: true },
    { axis: 'idNodo5', value: 0, bool: true } ] ];
    expect(HG.getData()).toEqual(result);
});
});*/

describe('Testing the return of the Selfloop of a RadalHG',()=>{
test('Selfloop',()=>{
    var result =     [ { nodo: 'idNodo1', link: '3' } ];
    expect(HG.getSelfloop()).toEqual(result);
});
});