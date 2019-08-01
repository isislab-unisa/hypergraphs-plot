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
