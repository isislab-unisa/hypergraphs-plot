import * as d3 from "d3";
import * as venn from "venn.js";
import * as classes from "./classes/index"

 function a(){
    var sets = [ {sets: ['A'], size: 12} ]
    console.log("1")
    sets.push({sets: ["1"], size: 30})
    console.log("2")
    var div = d3.select("#original");
    console.log("3")
    div.datum(sets).call(venn.VennDiagram().width(800).height(800));
    console.log("4")
}

export default {
    a,
    classes
}