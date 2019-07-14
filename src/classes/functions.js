//var JSNetworkXError = require('../exceptions/HypergraphsPlotError');
import Hypergraph from './index';

export function getName(Hypergraph){
    return Hypergraph.getName();
}

export function setName(Hypergraph,name){
    return Hypergraph.setName(name);
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
 * Return a copy of the hypergraph node-link with value in a list.
 * 
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Array of Objects} Array of objects (node,link,value)
 */
export function getNodesLinks(Hypergraph){
    return Hypergraph.getNodesLinks();
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
 * Return the number of edges in the hypergraph.
 *
 * @param {Hypergraph} Hypergraph Hypergraph
 * @return {Int} Number of links
 */
export function getNumLinks(Hypergraph){
    return Hypergraph.getNumLinks();
}

/**
 * Get node attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idNode id of the node
 * @return {!Map} Dictionary of attributes keyed by node 
 */
export function getNodeAttributes(Hypergraph,idNode){
    return Hypergraph.getNodeAttributes(idNode);
}

/**
 * Get links attributes from Hypergraph
 * 
 * @param {Hypergraph} Hypergraph Hyperpgrah
 * @param {String} idLink id of the link
 * @return {!Map} Dictionary of attributes keyed by node 
 */
export function getLinkAttributes(Hypergraph,idLink){
    return Hypergraph.getLinkAttributes(idLink);
}

export function hasNode(Hypergraph,node){
    return Hypergraph.hasNode(node);
}


export function addNode(Hypergraph,idNode,links,values){
    return Hypergraph.addNode(idNode,links,values);
}

export function removeNode(Hypergraph,idNode){
    return Hypergraph.removeNode(idNode);
}

export function addEdge(Hypergraph,idLink,nodes,values){
    return Hypergraph.addEdge(idLink,nodes,values);
}

export function removeEdge(Hypergraph,idLink){
    return Hypergraph.removeEdge(idLink);
}

export function numberSelfLoop(Hypergraph){
    return Hypergraph.numberSelfLoop();
}