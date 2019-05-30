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
			
			//if link < 2 then the connection is the traditional one w/o connection node
				hyper.push(d);
		});
		
		 var obj  = {links:hyper,nodes:nodes};
		 return obj;
	}

	exports.hypergraph = hypergraph;

	Object.defineProperty(exports, '__esModule', { value: true });

}));