(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

	var hypergraph = function (links,nodes,nodelinks) {
		var map= {} //map used to store the sets and the number of nodes
		
		console.log(links)
		console.log(nodes)
		console.log(nodelinks)

		//intersections and sizes
		nodes.forEach(element => {
			console.log(element.links)
			console.log(map[element.links])
			if(map[element.links] === undefined){
				map[element.links]=1
			}else{ map[element.links]= map[element.links] + 1; }
			
			if(element.links.length>2){
				console.log("SIZE " + element.links.length)
				for(var i=0; i<element.links.length-1; i++){
					for(var j=i+1; j<element.links.length; j++){
						var couple= [element.links[i], element.links[j]]
						console.log("@@@@COPPIA@@@@ " + couple)
						if(map[couple] === undefined){
							map[couple]=1
						}else{ map[couple]= map[couple] + 1 }
					}
				}
			}
			console.log(element.id);
		});//end
		
		console.log(" @@@@@@@@ MAP @@@@@@@")
		console.log(map)

		//add sets
		var linkss= []
		for(var i=0; i<links.length; i++){
			var arr= []
			arr.push(""+(i+1))
			linkss.push({links: arr, size: 100})
		}//end
		i=0
		//add intersections
		Object.entries(map).forEach(entry=>{
			//entry[0] is the intersection
			//entry[1] is the number of nodes inside of intersection
			console.log("@@@@@ LENGTH @@@@@@")
			console.log(entry[0])
			console.log(entry[0].length)
			if(entry[0].length!=0 && entry[0].length!=1){
				var arr= []
				arr= entry[0].split(",");
				console.log("@@@@@ ARR[0] @@@@@")
				console.log(arr[0])
				linkss.push({links: arr, size: Math.round(100/entry[0].length)})
				i++
			}
		})//end

		console.log(" @@@@@@@ INTERSECTIONS @@@@@@@@@")
		console.log(linkss)
		var obj  = {links:linkss,nodes:nodes};
		console.log("@@@@@@@ HYPERGRAPH @@@@@@")
		console.log(obj)
		return obj;
	}

	exports.hypergraph = hypergraph;

	Object.defineProperty(exports, '__esModule', { value: true });

}));