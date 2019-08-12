import Hypergraph from './Hypergraph';

export default class VennNodesHG extends Hypergraph{
    constructor(links, nodes, nodelinks) {
        super(links, nodes, nodelinks);
        var map = {} //map used to store the sets and the number of nodes
        var nodesInLinks = {} //object that store the sets and the nodes inside the sets
        var nodesToDisplay = {} //object that store the node to display
        var valLinksNodes = {} //object that store the val of the nodes in each links
        var MAX_SIZE = nodes.length * 10 //max size of venn diagram
        var OFFSET = links.length //offset used for the visualization

        //add sets and nodes inside sets
        var linkss = []
        for (var i = 0; i < links.length; i++) {
            var arr = []
            arr.push(links[i].id)
            linkss.push({ links: arr, size: MAX_SIZE })

            //fill nodesInLinks
            var s1 = links[i].id
            var s2 = links[i].nodes
            nodesInLinks[s1] = s2
        }//end

        //fill valLinksNodes
        nodelinks.forEach(element => {
            if (valLinksNodes[element.link] === undefined) {
                valLinksNodes[element.link] = {}
                valLinksNodes[element.link][element.node] = element.value

            } else {
                valLinksNodes[element.link][element.node] = element.value
            }
        });
        nodes.forEach(node => {
            var intersection = node.links
            if (valLinksNodes[intersection] === undefined) {
                valLinksNodes[intersection] = {}
            }
            if (intersection.length > 1) {
                intersection.forEach(element => {
                    if (valLinksNodes[intersection][element] === undefined) {
                        valLinksNodes[intersection][element] = {}
                    }
                    valLinksNodes[intersection][element][node.id] = valLinksNodes[element][node.id]
                });
            }
        });


        //intersections, sizes and nodes
        nodes.forEach(element => {
            //intersections
            if (map[element.links] === undefined) {
                map[element.links] = 1
            } else { map[element.links] = map[element.links] + 1; }

            //fill nodesInLinks
            if (nodesInLinks[element.links] === undefined) {
                nodesInLinks[element.links] = new Array(element.id)
            } else {
                if (element.links.length != 1) {
                    var v = nodesInLinks[element.links]
                    v.push(element.id)
                    nodesInLinks[element.links] = v
                }
            }

            //fill nodesToDisplay
            if (nodesToDisplay[element.links] === undefined) {
                nodesToDisplay[element.links] = new Array(element.id)
            } else {
                var v = nodesToDisplay[element.links]
                v.push(element.id)
                nodesToDisplay[element.links] = v
            }

            //add couples needed for display
            if (element.links.length > 2) {
                for (var i = 0; i < element.links.length - 1; i++) {
                    for (var j = i + 1; j < element.links.length; j++) {
                        var couple = [element.links[i], element.links[j]]
                        if (map[couple] === undefined) {
                            nodes.push({links: couple})
                            map[couple] = 1
                        } else { map[couple] = map[couple] + 1 }
                    }
                }
            }
        });//end


        i = 0
       
        this.nodes= nodes
        this.nodesInLinks= nodesInLinks
        this.nodesToDisplay= nodesToDisplay
        this.valLinksNodes= valLinksNodes
    }

}