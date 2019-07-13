import Hypergraph from './Hypergraph';

export default class ColorEdgeHG extends Hypergraph {
        constructor(links, nodes, nodelink) {
        super(links, nodes, nodelink);
        var hyper = [];
        var i;
        var j;
        var k;
        var dictNodes = {};
        var dictLinks = {};
        var dictNodeLinks = {};
        console.log(links)
        console.log(nodes)
        console.log(nodelinks)
        var nodelinksvalue = nodelinks;

        
        nodes.forEach(function (element, i) {
            dictNodes[element.id] = element.links;
        });
        links.forEach(function (element, i) {
            //if the nodes are more than two then is a hyperedge
            if ((element.nodes).length >= 2)
                dictLinks[element.id] = "ln" + (element.nodes).toString();
            //if the node is just one then is a selfloop
            if ((element.nodes).length == 1)
                dictLinks[element.id] = "SelfLoop:" + element.id.toString();
        });
        nodelinksvalue.forEach(function (element, i) {
            dictNodeLinks["node:" + element.node + "-linkid:" + element.link + "-" + dictLinks[element.link]] = "Node:" + element.node + " - Link:" + element.link + " - Value:" + element.value;
            //dictNodeLinks["node:1-linkid1-ln1,2,3]="node1-link1-value1""
        });

        links.forEach(function (d) {
            linkid = d.id;  //id of the link
            d = d.nodes;    //nodes of the link
            //if link length >2 there's an Hyperlink: i need to create a connection node
<<<<<<< HEAD
=======

            var linkid = d.id;
            d = d.nodes;
>>>>>>> 57955414acf36c2b7a0365418a940419c6968da8
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
            //if is a selfloop, target and source is the same node
            if (d.length == 1) {
                hyper.push({ source: d[0], target: d[0], linkid: linkid });
            }
        });

        this.dictNodes= dictNodes;
        this.dictLinks= dictLinks;
        this.dictNodeLinks= dictNodeLinks;
    }



    
}
