import { throwStatement } from "@babel/types";

export default class Hypergraph {
    /**
         * 
         * @param {links}, Is an object that has the id of the link and the nodes that belong to it
         * @param {nodes}, Is an object that has the id of the node and the links that belong to it
         * @param {nodelink}, Is an object that has the id of the node  associated with the hyperarch id with its own value
         * @param {name}, Is the name of the hypergraph
     */
    constructor(links=[],nodes=[],nodelink=[], name=''){
        this.nodes=nodes;
        this.links=links;
        this.nodelink=nodelink;
        this.name=name;
    }
  
    /**
     * Gets or sets the name of the hypergraph.
     *
     * @param {string=} name Hypergraph name.
     * @return {(string|undefined)} Hypergraph name if no parameter was passed.
     */
    getName(){
        return this.name || '';
    } 
    setName(name){
        this.name=name;
        return "done";
    }

    /**
     * Return the number of nodes in the hypergraph.
     *
     * ###Example
     * 
     * '''
     * var nodes = [{"id":"1","links":["1","2","3"]},
     *              {"id":"2","links":["2","3"]}];
     * var G = new Hypergraph([],nodes);
     * G.getNumNodes();
     * //2
     * '''
     * 
     * @return {number} Number of nodes
     */
    getNumNodes(){
        return this.nodes.length;
    }


    /**
     * Return a copy of the hypergraph nodes in a list.
     *
     * ###Example
     * 
     * '''
     * var nodes = [{"id":"1","links":["1","2","3"]},
     *              {"id":"2","links":["2","3"]}];
     * var G = new Hypergraph([],nodes);
     * G.getNodes();
     * //[{"id":"1","links":["1","2","3"]},
     *    {"id":"2","links":["2","3"]}]
     * '''
     * 
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array} List of nodes
     */
    getNodes(){
    return this.nodes;
    }


    /**
     * Return a copy of the hypergraph links in a list.
     *
     * ###Example
     * 
     * '''
     * var links = [{"id":"1","nodes":["1","2"]},
     *              {"id":"2","nodes":["2","3"]}];
     * var G = new Hypergraph(links);
     * G.getLinks();
     * //   [{"id":"1","nodes":["1","2"]},
     *       {"id":"2","nodes":["2","3"]}]
     * '''
     * 
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array} List of links
     */
    getLinks(){
    return this.links;
    }

    /**
     * Return the number of links in the hypergraph.
     *
     * ###Example
     * 
     * '''
     * var links = [{"id":"1","nodes":["1","2"]},
     *              {"id":"2","nodes":["2","3"]}];
     * var G = new Hypergraph(links);
     * G.getLinks();
     * //2
     * '''
     * 
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Int} Number of links
     */
    getNumLinks(){
    return this.links.length;
    }

    /**
     * Return a copy of the hypergraph node-link with value in a list.
     * 
     * #Example
     * 
     * '''
     * var nodelink=[{"node":"1","link":"1","value":"1"},
     *               {"node":"2","link":"2","value":"2"}];
     * var G = new Hypergraph([],[],nodelink);
     * G.nodelink();
     * //[{"node":"1","link":"1","value":"1"},
     *   {"node":"2","link":"2","value":"2"}]
     * '''
     * 
     * @param {Hypergraph} Hypergraph Hypergraph
     * @return {Array} List of node-link-value
     */
    getNodesLinks(){
    return this.nodelink;
    }

    /**
     * Return the attributes of a node
     * 
     * #Example
     * 
     * '''
     * var nodes = [{"id":"1","links":["1","2","3"]},
     *              {"id":"2","links":["2","3"]}];
     * var G = new Hypergrap([],nodes);
     * G.getNodeAttributes("2");
     * //{"id":"2","links":["2","3"]}
     * '''
     * 
     * #Notes
     * If exist the node return the node else return null
     * 
     * @param {String} idNode id of a node
     * @return {Object} Object Can be a node or null
     */
    getNodeAttributes(idNode){
    var obj=null;
    this.nodes.forEach(function(node) {
        if(node.id == idNode) {
            obj=node;
        }

    });
    return obj;
    }

    /**
     * Return the attributes of a node
     * 
     * #Example
     * 
     * '''
     * var links = [{"id":"1","nodes":["1","2","3"]},
     *              {"id":"2","nodes":["2","3"]}];
     * var G = new Hypergrap(links);
     * G.getLinkAttributes("2");
     * //{"id":"2","nodes":["2","3"]}
     * '''
     * 
     * #Notes
     * If exist the link return the link else return null
     * 
     * @param {String} idLink id of a link
     * @return {Object} Object Can be a link or null
     */
    getLinkAttributes(idLink){
        var obj=null;
        this.links.forEach(function(link) {
            if(link.id == idLink) {
                obj=link;
        }
    });
    return obj;
    }

    /**
     * Return true if the hypergraph contains the node with the same id.
     * 
     * #Example
     * var idNode = "1";
     * var links = ["1","2"];
     * var values = ["1","1"];
     * var G = new Hypergraph();
     * G.addNode(idNode,links,values);
     * G.hasNode
     * @param {String} idNode Node to search
     * @return {boolean} returna true/false
     */
    hasNode(idNode){
        var exist=false;
        this.nodes.forEach(function(n){
            if(n.id == idNode)            //JSON.stringify(node) === JSON.stringify(n)
                exist=true;
        });
        return exist;
    }

    /**
     * Add a single node n and update node/links/node-link attributes.
     * 
     * #Example
     * '''
     * var idNode = "1";
     * var links = ["1","2"];
     * var values = ["1","1"];
     * var G = new Hypergraph();
     * G.addNode(idNode,links,values);
     * G.getNumNodes();
     * //1
     * '''
     * 
     * @param {String} idNode id of the new node
     * @param {Array} links the links of the new node
     * @param {Array} values the values of the new node in the links
     * @return {String} A confirmation if it has been added
     */
    addNode(idNode,links,values){
        var count=0;
        if(links.length!=0 && idNode!=null && idNode!="" && links.length== values.length){
            var hyperlinks = this.links;
            links.forEach(function(add){
                hyperlinks.find(obj => {
                    if(obj.id==add) count=count+1;
                  });
            });
        }
        else{
            return "inputIncorrect";
        }
        if(count==links.length){
            this.links.forEach(function(link){
                links.forEach(function(id){
                    if(id==link.id) link.nodes.push(idNode);
                })
        });
        var nodelink = this.nodelink;
        links.forEach(function(link,i){
            nodelink.push({"node":idNode,"link":link,"value":values[i]});
        });
        this.nodes.push({"id":idNode,"links":links});
            return "add";
        }        
        else{               
            return "linkDontExist";
        }
    }

    /**
     * Remove the node in the Hypergraph
     * 
     * #Example
     * '''
     * var idNode = "1";
     * var links = ["1","2"];
     * var values = ["1","1"];
     * var G = new Hypergraph();
     * G.removeNode("1");
     * G.getNumNodes();
     * //0
     * '''
     * 
     * @param {String} idNode An id of the node in the hypergraph
     * @return {String} A confirmation if it has been removed
     */
    removeNode(idNode){
        var nodes = this.nodes; //copy of this.nodes
        var indexNode=null;     //for the position of node
        nodes.forEach(function(node,i){
            if(node.id==idNode){
                indexNode=i;        //find the position
            }
        });
        //Scorro i links
        //Se trovo in link.nodes il nodo, mi ritorno la posizione
        //effettua lo split per eliminarlo
        var links = this.links;
        links.forEach(function(link){
            var j = link.nodes.findIndex(obj=>{
                if(obj == idNode) return obj;
            });
            if(j!=-1) link.nodes.splice(j,1);
        });   

        var nodelink = [];
        this.nodelink.forEach(function(nodlin){
            if(nodlin.node!=idNode){
                nodelink.push(nodlin);
            }
        });
        if(indexNode!=null){
            nodes.splice(indexNode,1);
            this.nodes=nodes;
            this.links=links;
            this.nodelink=nodelink;
            return "removed";
        }     
        else{ 
            return "notExisting";
        }
    }

    /**
     * Add a single link n and update node/links/node-link attributes.
     * 
     * #Example
     * '''
     * var idLink = "1";
     * var nodes = ["1","2"];
     * var values = ["1","1"];
     * var G = new Hypergraph();
     * G.addEdge(idNode,links,values);
     * G.getNumLinks();
     * //1
     * '''
     * 
     * @param {String} idLink id of the new link
     * @param {Array} nodes the nodes of the new link
     * @param {Array} values the values of the old nodes in the new link
     * @return {String} A confirmation if it has been added
     */
    addEdge(idLink,nodes,values){
        if(nodes.length!=values.length || idLink=="" || idLink==null) 
        return "inputIncorrect";
        
        var c=0;
        var count=0;
        this.nodes.forEach(function(nodo){
            nodes.find(obj => {
                if(obj==nodo.id)   
                    c=c+1;
            }) 
        });        

        if(c==nodes.length){
        this.links.push({"id":idLink,"nodes":nodes});
        var newnodes = this.nodes;
        nodes.forEach(function(nodo){
        newnodes.find(obj => {
                if(obj.id==nodo)    {
                    obj.links.push(idLink);
                    count=count+1;
                }    
        });});

        var newnodelink=this.nodelink;
        values.forEach(function(val,i){
            newnodelink.push({"nodo":nodes[i],"link":idLink,"value":val});
        });
        return "add";
        }
        else{    
            return "notAdd";
        }
    }
    
    /**
     * Remove a single link n and update node/links/node-link attributes.
     * 
     * #Example
     * '''
     * var idLink = "1";
     * var nodes = ["1","2"];
     * var values = ["1","1"];
     * var G = new Hypergraph();
     * G.removeEdge(idNode,links,values);
     * G.getNumLinks();
     * //0
     * '''
     * 
     * @param {String} idLink id of the new link
     * @param {Array} nodes the nodes of the new link
     * @param {Array} values the values of the old nodes in the new link
     * @return {String} A confirmation if it has been added
     */
    removeEdge(idLink){
        var check=0;
        this.links.forEach(function(link){
            if(link.id==idLink) check=1;
        });
        if(check==0) return "inputIncorrect";
        else{
            var links=[];
            this.links.forEach(function(link){
                if(link.id!=idLink) links.push(link);
            });
            this.links=links;

            this.nodes.forEach(function(node){
                var j = node.links.findIndex(obj=>{
                    if(obj == idLink) return obj;
                });
                if(j!=-1) node.links.splice(j,1);
            });
            var nodelink = [];
            this.nodelink.forEach(function(nodlin){
                if(nodlin.link!=idLink){
                    nodelink.push(nodlin);
                }
            });
            this.nodelink=nodelink;
            return "remove";
        }
    }

    /**
     * Return the number of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var idLink = "1";
     * var nodes = ["1"];
     * var values = ["1"];
     * var G = new Hypergraph();
     * G.addEdge(idNode,links,values);
     * G.numberSelfLoop();
     * //1
     * ```
     *
     * @return {number} The number of selfloops.
     */
    numberSelfLoop(){
        var count=0;
        this.links.forEach(function(link){
            if(link.nodes.length==1)count=count+1;
        });
        return count;
    }

    /**
     * Return the number of selfloop nodes.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var idNodes = "1";
     * var links = ["1"];
     * var values = ["1"];
     * var G = new Hypergraph();
     * G.addNode(idNode,links,values);
     * G.nodesWithSelfLoop();
     * //{"id":"1","links":"1"}
     * ```
     *
     * @return {Array} List of selfloop
     */
    nodesWithSelfLoop(){
        var nodes=[];
        this.links.forEach(function(link){
            if(link.nodes.length==1){
                nodes.push(link.nodes[0]);
            }
        });
        return nodes;
    }

    /**
     * Return the number of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var idLink = "1";
     * var nodes = ["1"];
     * var values = ["1"];
     * var G = new Hypergraph();
     * G.addEdge(idLink,nodes,values);
     * G.linksWithSelfLoop();
     * //{"id":"1","nodes":"1"}
     * ```
     *
     * @return {Array} List of selfloop
     */
    linksWithSelfLoop(){
        var links=[];
        this.links.forEach(function(link){
            if(link.nodes.length==1){
                links.push(link.id[0]);
            }
        });
        return links;
    }

    

}