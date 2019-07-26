import Hypergraph from './Hypergraph';

export default class RadalHG extends Hypergraph {
    constructor(links, nodes, nodelinks) {
        super(links, nodes, nodelinks);
        var data = [];	//data per la costruzione di tutto
        var selfloop = [];	//selfloop

        var count = 0;
    
        var dictNodeLinkValue=[];
    
        nodelinks.forEach(function(element,i){
            dictNodeLinkValue["Nodo:idNodo"+element.node+" Link:"+element.link]="Nodo:"+element.node+" Link:"+element.link+" Value:"+element.value;
        });
    
        var firstnodes = [];
    
        var start = Math.floor(nodes.length / 10);
        console.log("START = " + start);
        nodes.forEach(function (element, j) {
            var obj = { "axis": "idNodo" + element.id, "value": start, "bool": true }
            firstnodes.push(obj);
        });
        //bool true, disegna, false non disegna
    
        var cc = start + 1;
        links.forEach(function (element, i) {
            var nod = element.nodes;	//esempio ["1","2","3"];
            if (nod.length != 1 && nod.length > 2) {	//controllo per vedere se è selfloop
                var d = [];
                nodes.forEach(function (ele, j) {
                    var obj = { "axis": "idNodo" + ele.id, "value": cc, "bool": false }	//pre ogni link, setto momentaneamente tutti i nodi
                    d.push(obj);
                });
                data.push(d);
            }
            if (nod.length != 1 && nod.length > 2) {
                nod.forEach(function (el, x) {
                    var result = d.filter(obj => {
                        if (obj.axis === "idNodo" + el) obj.bool = true;	// e qui dico chi deve essere visibile grazie al bool=true;
                    });
                })
            }
            if (nod.length == 1) {
                firstnodes.filter(obj => {
                    if (obj.axis === "idNodo" + nod[0]) obj.bool = false;	//selfloop
                });
                count = count + 1;
            }
            if (nod.length == 2) {	//link with 2 nodes
                selfloop.push({ "nodo1": "idNodo" + nod[0], "nodo2": "idNodo" + nod[1] });
            }
            cc = cc + 1;
        });
        data.push(firstnodes);

        this.selfloop=selfloop;
        this.dictNodeLinkValue=dictNodeLinkValue;
        this.startlevel=start;
        this.data=data;
        this.links=links;
        this.nodes=nodes;
        this.nodelinks=nodelinks;
    }
}