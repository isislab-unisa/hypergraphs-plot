//var JSNetworkXError = require('../exceptions/HypergraphsPlotError');
import Hypergraph from './index';

/**
 * Return the name of the hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {String} The name
 */
export function getName(Hypergraph){
    return Hypergraph.getName();
}

/**
 * Set the name to a hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} name The name
 * @return {String}  Return a confirmation that set it
 */
export function setName(Hypergraph,name){
    return Hypergraph.setName(name);
}

/**
 * Return the number of nodes in the hypergraph.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {number} Number of nodes
 */
export function getNumNodes(Hypergraph){
    return Hypergraph.getNumNodes();
}

/**
 * Return a copy of the hypergraph nodes in a list.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of nodes
 */
export function getNodes(Hypergraph){
    return Hypergraph.getNodes();
}

/**
 * Return a copy of the hypergraph links in a list.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of links
 */
export function getLinks(Hypergraph){
    return Hypergraph.getLinks();
}

/**
 * Return the number of edges in the hypergraph.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Int} Number of links
 */
export function getNumLinks(Hypergraph){
    return Hypergraph.getNumLinks();
}

/**
 * Return a copy of the hypergraph node-link with value in a list.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of Node-Link-Value
 */
export function getNodesLinks(Hypergraph){
    return Hypergraph.getNodesLinks();
}

/**
 * Get node attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idNode id of the node
 * @return {Object} Object of attributes by node 
 */
export function getNodeAttributes(Hypergraph,idNode){
    return Hypergraph.getNodeAttributes(idNode);
}

/**
 * Get links attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idLink id of the link
 * @return {Object} Object of attributes by node 
 */
export function getLinkAttributes(Hypergraph,idLink){
    return Hypergraph.getLinkAttributes(idLink);
}

/**
 * Add a single node n and update node/links/node-link attributes.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} idNode id of the new node
 * @param {Array} links the links of the new node
 * @param {Array} values the values of the new node in the links
 * @return {String} A confirmation if it has been added
 */
export function addNode(Hypergraph,idNode,links,values){
    return Hypergraph.addNode(idNode,links,values);
}

/**
 * Return true if the hypergraph contains the node with the same id.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} idNode One node to search
 * @return {boolean} Return a boolean
 */
export function hasNode(Hypergraph,idNode){
    return Hypergraph.hasNode(idNode);
}

/**
 * Remove the node in the Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} idNode A node in the Hypergraph
 */
export function removeNode(Hypergraph,idNode){
    return Hypergraph.removeNode(idNode);
}

/**
 * Add a single link and update node/links/node-link attributes.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} idLink id of the new link
 * @param {Array} links the nodes of the new link
 * @param {Array} values the values of the old nodes in the new link
 * @return {String} A confirmation if it has been added
 */
export function addEdge(Hypergraph,idLink,nodes,values){
    return Hypergraph.addEdge(idLink,nodes,values);
}

/**
 * Remove the link in the Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @param {String} idLink A link in the Hypergraph
 */
export function removeEdge(Hypergraph,idLink){
    return Hypergraph.removeEdge(idLink);
}

/**
 * Return the number of selfloop edges.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {number} the number of 
 */
export function numberSelfLoop(Hypergraph){
    return Hypergraph.numberSelfLoop();
}


/**
 * Return a list of nodes with selfloop
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of nodes
 */
export function nodesWithSelfLoop(Hypergraph){
    return Hypergraph.nodesWithSelfLoop();
}


/**
 * Return a list of links with selfloop
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array} List of links
 */
export function linksWithSelfLoop(Hypergraph){
    return Hypergraph.linksWithSelfLoop();
}