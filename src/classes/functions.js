import JSNetworkXError from '../exceptions/HypergraphsPlotError';


/**
 * Return a copy of the hypergraph nodes in a list.
 *
 * @param {Hypergraph} HG Hypergraph
 * @return {Array} List of nodes
 */
export function getNodes(HG){
    return HG.getNodes();
}

/**
 * Return a copy of the hypergraph links in a list.
 *
 * @param {Hypergraph} HG Hypergraph
 * @return {Array} List of links
 */
export function getLinks(HG){
    return HG.getLinks();
}

/**
 * Return a copy of the hypergraph node-link with value in a list.
 * 
 * @param {Hypergraph} HG Hypergraph
 * @return {Array of Objects} Array of objects (node,link,value)
 */
export function getNodesLinks(HG){
    return HG.getNodesLinks();
}

/**
 * Return the number of nodes in the hypergraph.
 *
 * @param {Hypergraph} HG Hypergraph
 * @return {number} Number of nodes
 */
export function getNumNodes(HG){
    return HG.getNumNodes();
}

/**
 * Return the number of edges in the hypergraph.
 *
 * @param {Hypergraph} HG Hypergraph
 * @return {Int} Number of links
 */
export function getNumLinks(HG){
    return HG.getNumLinks();
}

/**
 * Get node attributes from Hypergraph
 * 
 * @param {Hypergraph} HG Hyperpgrah
 * @param {String} idNode id of the node
 * @return {!Map} Dictionary of attributes keyed by node 
 */
export function getNodeAttributes(HG,idNode){
    var dict = new Map();
    HG.nodes.forEach(function(node,i){
        if(node.id === idNode){
            dict.set(node.id, node.attributes);
        }
    })
    return dict;
}

/**
 * Set node attributes from Hypergraph nodes
 * 
 * @param {Hypergraph} HG Hyperpgrah
 * @param {String} idNode id of the node
 * @param {String} attributes attributes
 */
export function setNodeAttributes(HG,idNode,attributes){
    HG.nodes.forEach(function(node,i){
        if(node.id === idNode){
            node.attributes = attributes;
        }
    })
}

/**
 * Get links attributes from Hypergraph
 * 
 * @param {Hypergraph} HG Hyperpgrah
 * @param {String} idLink id of the link
 * @return {!Map} Dictionary of attributes keyed by node 
 */
export function getLinkAttributes(HG,idLink){
    var dict = new Map();
    HG.links.forEach(function(link,i){
        if(link.id === idLink){
            dict.set(link.id, link.nodes);
        }
    })
    return dict;
}
