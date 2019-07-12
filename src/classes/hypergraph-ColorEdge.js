export default class ColorEdgeHG {
    constructor(links, nodes, nodelinks) {
        var hyper = [];
        var i;
        var j;
        var k;
        var dictNodes = {};
        var dictLinks = {};
        var dictNodeLinks = {};
        nodelinksvalue = nodelinks;

        nodes.forEach(function (element, i) {
            dictNodes[element.id] = element.links;
        });
        links.forEach(function (element, i) {
            if ((element.nodes).length >= 2)
                dictLinks[element.id] = "ln" + (element.nodes).toString();
            if ((element.nodes).length == 1)
                dictLinks[element.id] = "SelfLoop:" + element.id.toString();
        });
        nodelinksvalue.forEach(function (element, i) {
            dictNodeLinks["node:" + element.node + "-linkid:" + element.link + "-" + dictLinks[element.link]] = "Node:" + element.node + " - Link:" + element.link + " - Value:" + element.value;
        });

        links.forEach(function (d) {
            //if link length >2 there's an Hyperlink: i need to create a connection node

            linkid = d.id;
            d = d.nodes;
            if (d.length >= 2) {
                //connection node id creation
                var id = 'linkid:' + linkid + '-ln';
                for (k = 0; k < d.length; k++) {
                    id += d[k] + ",";
                }
                id = id.slice(0, -1);
                //connection node creation
                i = { id: id, link: true };
                //add the connection node to the node array
                nodes.push(i);
                //creation of the link from every node of the connection set to the connection node
                for (j = 0; j < d.length; j++) {
                    hyper.push({ source: d[j], target: i.id, linkln: id, linkid: linkid });
                }
            }
            if (d.length == 1) {
                hyper.push({ source: d[0], target: d[0], linkid: linkid });
            }
        });

        this.links= hyper
        this.nodes= nodes
        this.dictNodes= dictNodes
        this.dictLinks= dictLinks
        this.dictNodeLinks= dictNodeLinks
    }





    getNumNodes(){
        return this.nodes.length;
    }
}


