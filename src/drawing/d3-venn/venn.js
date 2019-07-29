import * as d3 from "./d3.v3"

import {
    binder,
    applier
  }
  from "./getSet.js";
  import {
    pack, distribute, force
  }
  from "./packStrategies.js";
  // import distributeCircles from "./distributeCircles";
  // import distributeCircles from "./distributeCircles"; // as an alternative to packCircles
  import {
    venn as vennDiagram, normalizeSolution, scaleSolution
  }
  from "venn.js/src/layout";
  import {
    intersectionAreaPath, computeTextCentres
  }
  from "venn.js/src/diagram"
  import {
    distance
  }
  from "venn.js/src/circleintersection"
  
  export default function() {
    // d3.layout.venn = function() {
  
    var opts = {
      sets: null,
      setsAccessor: setsAccessorFn,
      setsSize: setsSize,
      packingStragegy: pack,
      packingConfig: {
        value: valueFn,
      },
      size: [1, 1],
      padding: 0,
  
      // options from venn (https://github.com/benfred/venn.js)
      layoutFunction: vennDiagram,
      orientation: Math.PI / 2,
      normalize: true
  
    };
  
    var circles,
      nodes,
      packer,
      centres;
  
  
    // Build simple getter and setter Functions
    binder(venn, opts);
  
    //The layout function
    function venn(data) {
      if (!arguments.length) return nodes;
       nodes = compute(data);
       return venn;
    }
  
  
  
    function compute(data) {
      var sets = venn.sets(),
          setsValues,
        layout = venn.layoutFunction(),
        packingStragegy = venn.packingStragegy(),
        size = venn.size(),
        width = size[0],
        height = size[1],
        // normalizeSolution = normalizeSolution,
        // scaleSolution = scaleSolution,
        // computeTextCentres = computeTextCentres,
  
        solution,
        oldCircles;
  
  
      sets = extractSets(data);
      console.log("@@@@@@ sets @@@@@@")
      console.log(sets)
      setsValues = sets.values()
      console.log("@@@@@@ setsValues @@@@@@")
      console.log(setsValues)
      solution = layout(setsValues);
  
      console.info("data: ", data)
      console.info("sets: ", sets)
  
      if (venn.normalize()) {
        solution = normalizeSolution(solution, venn.orientation());
      }
  
      oldCircles = circles;
      circles = scaleSolution(solution, width, height, venn.padding());
  
      for (var k in oldCircles) {
        if (circles[k]) {
          circles[k].previous = oldCircles[k];
        }
      }
      oldCircles = null;
  
      centres = computeTextCentres(circles, setsValues);
  
      // store intersectionAreaPath into sets
      sets.forEach(function(k,set) {
        set.d = pathTween(set);
        set.center = centres[k];
        set.innerRadius = computeDistanceToCircles(set);
        // packingStragegy(set, valueFunction, circles);
      });
  
      packer = packingStragegy(venn, data)
  
      function computeDistanceToCircles(set) {
        var sets = set.sets,
          center = set.center,
          // hasOneSet = set.length ==1,
          k, circle, dist, isInside, isOverlapp,
          candidate = Infinity;
        // if(sets.length ==1)  {
        for (k in circles) {
          circle = circles[k];
          isInside = sets.indexOf(k) > -1;
          isOverlapp = sets.indexOf(k) < -1 && checkOverlapp(sets, circle);
          dist = distance(center, circle);
          dist = isInside ? circle.radius - dist : isOverlapp ? dist - circle.radius : dist + circle.radius;
          if (dist < candidate) {
            candidate = dist;
          }
  
        }
        return candidate;
      }
  
      function checkOverlapp(sets, circle) {
        var i = 0,
          l = sets.length,
          c;
        for (i; i < l; i++) {
          c = circles[sets[i]];
          if (distance(c, circle) < c.radius) {
            return true;
          }
        }
        return false;
      }
      // interpolate intersection area paths between previous and
      // current paths
      function pathTween(set) {
        return function(t) {
          var c = set.sets.map(function(set) {
            // var start = previous[set],
            var circle = circles[set];
  
            var start = circle && circle["previous"],
              end = circle;
            if (!start) {
              start = {
                x: width / 2,
                y: height / 2,
                radius: 1
              };
            }
            if (!end) {
              end = {
                x: width / 2,
                y: height / 2,
                radius: 1
              };
            }
            if (t == 1 && circle) {
              circle["previous"] = end;
            }
            return {
              'x': start.x * (1 - t) + end.x * t,
              'y': start.y * (1 - t) + end.y * t,
              'radius': start.radius * (1 - t) + end.radius * t
            };
          });
  
          return intersectionAreaPath(c);
        };
      };
      return data
    }
  
    // loop over data and build the set so that they comply with https://github.com/benfred/venn.js
    /*
    from  data = [
        {"set":["A"],"name":"node_0"},
        {"set":["B"],"name":"node_1"},
        {"set":["B","A"],"name":"node_2"}
        {"set":["B","A"],"name":"node_3"}
        ]
  
    to sets = [ 
        {sets: ['A'], size: 1, nodes : ['node_0']}, 
        {sets: ['B'], size: 1, nodes : ['node_1']},
        {sets: ['A','B'], size: 2, nodes ['node_2', 'node_3']}
        ];
    */
    function extractSets(data) {
      var sets = d3.map({}, function(d) {
          return d.__key__
        }),
        individualSets = d3.map(),
        accessor = venn.setsAccessor(),
        size = venn.setsSize(),
        set,
        s,
        key,
        i,
        n = data.length;
  
      for (i = -1; ++i < n;) {
        set = accessor(data[i]);
        if (set.length) {
          key = set.sort().join(','); //so taht we have the same key as in https://github.com/benfred/venn.js
          set.forEach(function(val) {
            if (s = individualSets.get(val)) {
              s.size++;
              console.log(s)
              
              // s.nodes.push([data[i]]);
            } else {
              individualSets.set(val, {
                __key__: val,
                size: 5,
                sets: [val],
                nodes: []
                  // nodes: [data[i]]
              })
            }
          });
          data[i].__setKey__ = key;
          if (s = sets.get(key)) {
            s.size++;
            s.nodes.push(data[i]);
          } else {
            sets.set(key, {
              __key__: key,
              sets: set,
              size: 1,
              nodes: [data[i]]
            });
          }
        }
  
      }
      individualSets.forEach(function(k, v) {
        if (!sets.get(k)) {
          sets.set(k, v);
        }
      });
      // reset the size for each set. 
      sets.forEach(function(k, v) {
        v.size = size(v.size);
      })
      // sets = sets.values();
  
      venn.sets(sets);
      return sets;
    }
  
    function setsSize(size) {
      return size;
    }
  
    // data accessors 
    function setsAccessorFn(d) {
      return d.set || [];
    }
  
    function valueFn(d) {
      return d.value;
    }
    venn.packingConfig = function(_) {
      var config = opts.packingConfig;
      if (!arguments.length) {
        return config;
      }
      for (var k in _) {
        config[k] = _[k]
      }
      if(packer) {
          applier(packer, _)
      }
      return venn;
  
    };
  
    venn.packer = function() {
      return packer;
    }
  
    venn.circles = function() {
      return circles;
    };
  
    venn.centres = function() {
      return centres;
    };
  
    venn.nodes = venn;
  
    return venn;
    // return d3.rebind(venn, event, "on");
  };
  export {
    pack, distribute, force
  };
  