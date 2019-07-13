class Hypergraph{
    /**
         * 
         * @param {links}, Is an object that has the id of the link and the nodes that belong to it
         * @param {nodes}, Is an object that has the id of the node and the links that belong to it
         * @param {nodelink}, Is an object that has the id of the node  associated with the hyperarch id with its own value
     */
    constructor(links,nodes,nodelink){
        this.nodes=nodes;
        this.links=links;
        this.nodelink=nodelink;
    }

    /**
     * Return a copy of the hypergraph nodes in a list.
     *
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array of Objects} List of nodes with the attributes id of the node and links where it belongs
     */
    getNodes(){
    return this.nodes;
    }

    /**
     * Return a copy of the hypergraph links in a list.
     *
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array of Objects} List of links with the attributes id of the link and the nodes he has
     */
    getLinks(){
    return this.links;
    }

    /**
     * Return a copy of the hypergraph node-link with value in a list.
     * 
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array of Objects} Array of objects (node,link,value)
     */
    getNodesLinks(){
    return this.nodelink;
    }

    /**
     * Return the number of nodes in the hypergraph.
     *
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Int} Number of nodes
     */
    getNumNodes(){
    return this.nodes.length;
    }

    /**
     * Return the number of edges in the hypergraph.
     *
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Int} Number of links
     */
    getNumLinks(){
    return this.links.length;
    }

    getNodeAttributes(idNode){
    var obj=null;
    this.nodes.forEach(function(node){
        if(node.id == idNode){
            return node;
        }
    })
    return obj;
    }



}

module.exports={Hypergraph};