import * as d3 from "d3";
//import * as venn from "venn.js";
import * as classes from "./classes/index"
import * as drawing from "./drawing/index"
import * as exeptions from "./exceptions/index"
import * as generators from "./generators/index"

 function foo(){
    var sets = [ {sets: ['A'], size: 12} ]
    sets.push({sets: ["1"], size: 30})
    var div = d3.select("#original");
    div.datum(sets).call(venn.VennDiagram().width(800).height(800));
}

export {
    foo,
    classes,
    drawing,
    exeptions,
    generators
}