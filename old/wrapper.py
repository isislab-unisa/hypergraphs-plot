from IPython.display import HTML
'''
from IPython.display import IFrame

IFrame(src='./nice.html', width=700, height=600)
'''

def plotColorEdge(JSONPath):
    return HTML("""<!DOCTYPE html>
<meta charset="utf-8">
<head>
    <link rel="stylesheet" type="text/css" href="scripts/color-edge/color-edge-style.css">
    <script src="scripts/require.js"></script>
</head>
<style>

</style>
<body>
    <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg"><h2>New Nodes</h2></span>
        </div>
        Id Nodes
        <input type="text" id="idNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="5"> 
        <br>
        Id Hypergraph
        <input type="text" id="idHypergraphNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">
        <br>
        Values Nodes HyperEdges
        <input type="text" id="valueNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1">


        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-lg"><h2>New HyperEdges</h2></span>
          </div>
          Id HyperEdges
          <input type="text" id="newIdHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="5">
          <br>
          Nodes HyperEdges
          <input type="text" id="nodesInNewHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">
          <br>
          Values Nodes HyperEdges
          <input type="text" id="valuesNodesInNewHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">

          <br>
        <button type="button" id="confirm">Invia</button>
        <button type="button" id="reset">Reset</button>
      </div>

      

    <div class="hg-plot"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="scripts/functions.js"></script>
    <script src="scripts/color-edge/hg-color-edge-plot.js"></script>
    
    <script>
    hgColorEdgePlot({json:'"""+JSONPath+"""'})
    </script>
</body>
""")

def plotVenn(JSONPath):
    return HTML("""<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Venn Diagram - pack layout</title>
    <script src="scripts/require.js"></script>
    <link rel="stylesheet" type="text/css" href="scripts/venn/venn-style.css">
</head>
 
<body>
  <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg"><h2>New Nodes</h2></span>
      </div>
      Id Nodes
      <input type="text" id="idNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="5"> 
      <br>
      Id Hypergraph
      <input type="text" id="idHypergraphNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">
      <br>
      Values Nodes HyperEdges
      <input type="text" id="valueNewNode" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1">


      <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg"><h2>New HyperEdges</h2></span>
        </div>
        Id HyperEdges
        <input type="text" id="newIdHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="5">
        <br>
        Nodes HyperEdges
        <input type="text" id="nodesInNewHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">
        <br>
        Values Nodes HyperEdges
        <input type="text" id="valuesNodesInNewHypergraph" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" size="10" placeholder="1,2,3">

        <br>
        
      <button type="button" id="confirm" >Invia</button>
      <button type="button" id="reset" >Reset</button>
    </div>

              
              <div id="links_information">
                <span id="close_information">x</span>
                <table id="table_information">
                  <tr>
                    <th>Set</th>
                    <th>Node</th>
                    <th>Value</th>
                  </tr>
                  
                </table>
              </div>

    <div id="original"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="scripts/functions.js"></script>
    <script src="scripts/venn/venn-functions.js"></script>
    <script type="text/javascript" src="scripts/venn/hg-venn-plot.js"></script>
    <script>
        hgVennPlot({json:'"""+JSONPath+"""'})
    </script>   
</body>

</html>""")