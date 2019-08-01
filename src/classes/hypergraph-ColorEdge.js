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
        var nodesSelfloop={};

        nodes.forEach(function(element,i){
            nodesSelfloop[element.id]=8;
        })
        
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
        nodelink.forEach(function (element, i) {
            dictNodeLinks["node:" + element.node + "-Link:" + element.link + "-" + dictLinks[element.link]] = "Node:" + element.node + " - Link:" + element.link + " - Value:" + element.value;
            //dictNodeLinks["node:1-linkid1-ln1,2,3]="node1-link1-value1""
        });

        links.forEach(function (d) {
            var linkid = d.id,  //id of the link
            d = d.nodes;    //nodes of the link
            //if link length >2 there's an Hyperlink: i need to create a connection node
            if (d.length > 2) {
                //connection node id creation
                var id = 'Link:' + linkid + '-ln';
                for (k = 0; k < d.length; k++) {
                    id += d[k] + ",";
                }
                id = id.slice(0, -1);
                //connection node creation
                i = { id: id, link: true};
                //add the connection node to the node array
                nodes.push(i);
                //creation of the link from every node of the connection set to the connection node
                for (j = 0; j < d.length; j++) {
                    hyper.push({source: d[j], target: i.id,linkid: linkid,type:"hyperedge" });
                }
            }
            // d.lengh ==2 , is an edge
            if(d.length==2){
                hyper.push({source: d[0],target: d[1],linkid: linkid,type: "edge"});
            }
            //if is a selfloop, target and source is the same node
            if (d.length == 1) {
                nodesSelfloop[d[0]]=nodesSelfloop[d[0]]+4;
                hyper.push({ source: d[0], target: d[0],linkid: linkid,type: "selfloop",size:nodesSelfloop[d[0]]});
                
            }
        });
        
        this.links = links;
        this.nodes= nodes;
        this.nodelinks=nodelink;
        this.hyper= hyper;
        this.dictNodes= dictNodes;
        this.dictLinks= dictLinks;
        this.dictNodeLinks= dictNodeLinks;
    }

/**
 * Return the hyper of the ColorEdge
 * 
 * @return {Array} 
 */
getHyper(){
    return this.hyper;
}

/**
 * Return the dict of the nodes of a ColorEdge
 * 
 * @return {dict} 
 */
getDictNodes(){
    return this.dictNodes;
}

/**
 * Return the dict of the links of a ColorEdge
 * 
 * @return {dict} 
 */
getDictLinks(){
    return this.dictLinks;
}

/**
 * Return the dict of the node-links of a ColorEdge
 * 
 * @return {dict} 
 */
getDictNodeLinks(){
    return this.dictNodeLinks;
}
    
}
