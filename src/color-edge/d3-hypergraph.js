(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

	var hypergraph = function (links,nodes) {
		var obj;
		var hyper = [];
		var	i;
		var	j;
		var	k;
		links.forEach(function(d) {
			//if link length >2 there's an Hyperlink: i need to create a connection node
			if (d.length > 2) {
			//connection node id creation
				var	id = 'ln';
				for(k = 0; k < d.length; k++) {
					id += d[k];
				}
			//connection node creation
				i = {id: id,link: true};
			//add the connection node to the node array
				nodes.push(i);
			//creation of the link from every node of the connection set to the connection node
				for (j = 0; j < d.length; j++) {
					hyper.push({source: d[j], target: i.id});
				}
			}else{
			//if link < 2 then the connection is the traditional one w/o connection node
				hyper.push({source: d[0],target: d[1]});
			}
		});
		
		 var obj  = {links:hyper,nodes:nodes};
		 return obj;
	}

	exports.hypergraph = hypergraph;

	Object.defineProperty(exports, '__esModule', { value: true });

}));