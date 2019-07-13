//var JSNetworkXError = require('../exceptions/HypergraphsPlotError');
var Hypergraph = require('./Hypergraph');

/**
 * Return a copy of the hypergraph nodes in a list.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of nodes
 */
function getNodes(Hypergraph){
    return Hypergraph.getNodes();
}

/**
 * Return a copy of the hypergraph links in a list.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of links
 */
function getLinks(Hypergraph){
    return Hypergraph.getLinks();
}

/**
 * Return a copy of the hypergraph node-link with value in a list.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array of Objects} Array of objects (node,link,value)
 */
function getNodesLinks(Hypergraph){
    return Hypergraph.getNodesLinks();
}

/**
 * Return the number of nodes in the hypergraph.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {number} Number of nodes
 */
function getNumNodes(Hypergraph){
    return Hypergraph.getNumNodes();
}

/**
 * Return the number of edges in the hypergraph.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Int} Number of links
 */
function getNumLinks(Hypergraph){
    return Hypergraph.getNumLinks();
}

/**
 * Get node attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idNode id of the node
 * @return {!Map} Dictionary of attributes keyed by node 
 */
function getNodeAttributes(Hypergraph,idNode){
    return Hypergraph.getNodeAttributes(idNode);
}

/**
 * Set node attributes from Hypergraph nodes
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idNode id of the node
 * @param {String} attributes attributes
 */
function setNodeAttributes(Hypergraph,idNode,attributes){
    Hypergraph.nodes.forEach(function(node,i){
        if(node.id === idNode){
            node.attributes = attributes;
        }
    })
}

/**
 * Get links attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idLink id of the link
 * @return {!Map} Dictionary of attributes keyed by node 
 */
function getLinkAttributes(Hypergraph,idLink){
    var dict = new Map();
    Hypergraph.links.forEach(function(link,i){
        if(link.id === idLink){
            dict.set(link.id, link.nodes);
        }
    })
    return dict;
}

module.exports={getNodes,getLinks,getNodesLinks,getNumNodes,getNumLinks,getNodeAttributes,getNodeAttributes,getLinkAttributes};