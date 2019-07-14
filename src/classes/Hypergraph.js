import { throwStatement } from "@babel/types";

export default class Hypergraph {
    /**
         * 
         * @param {links}, Is an object that has the id of the link and the nodes that belong to it
         * @param {nodes}, Is an object that has the id of the node and the links that belong to it
         * @param {nodelink}, Is an object that has the id of the node  associated with the hyperarch id with its own value
     */
    constructor(links,nodes,nodelink, name=''){
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

    /**
     * Return the attributes of a node, if there is return the node else null
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
     * Return the attributes of a link, if there is return the link else null
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

    hasNode(node){
        var exist="no";
        this.nodes.forEach(function(n){
            if(JSON.stringify(node) === JSON.stringify(n)) 
                exist="yes";
        });
        return exist;
    }

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
            return "notAdd";
        }
    }

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

    numberSelfLoop(){
        var count=0;
        this.links.forEach(function(link){
            if(link.nodes.length==1)count=count+1;
        });
        return count;
    }

    

}