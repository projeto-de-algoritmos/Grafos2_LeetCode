class Edge {
    
  constructor(node,weight) {
    this.node = node
    this.weight = weight
  }

  getNode() {
    return this.node
  }

  getWeight() {
    return this.weight
  }
}

class Graph {

  constructor(node) {
    this.nodeCount = node
    this.adjList = new Map()
  }
  
  addEdge(v, w, weight) {
    this.adjList.get(v).push(new Edge(w,weight))
  }

  addNode(v) { 
    this.adjList.set(v,[])
  }

  getAdjList(v) {
    return this.adjList.get(v)
  }

  getNodeCount() {
    return this.nodeCount
  }

}

let dist

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
  
  const graph = new Graph(n)
  dist = Array(n+1)
  
  for(const node of times) graph.addNode(node[0])

  for(const node of times) {
    graph.addEdge(node[0],node[1],node[2])
  }

  shortestPath(graph, k)

  let max = 0
  dist.shift()
  for(const distance of dist) {
    if(distance == Number.MAX_VALUE){ 
      max = 0;
      break
    }

    if(distance > max) max = distance 
  }
  
  return max == 0 ? -1 : max
};

function shortestPath(graph,v) {
    
  const mature = Array(graph.getNodeCount()+1)
  
  dist.fill(Number.MAX_VALUE)
  mature.fill(false)    

  dist[v] = 0
  
  while(1) {
    let min = Number.MAX_VALUE
    let y
    
    for(let i = 1; i<= graph.getNodeCount(); i++) {
      if(mature[i]) continue;
      
      if(dist[i] < min) {
        min = dist[i]
        y = i
      }
    }
    
    if(min == Number.MAX_VALUE) break
    
    const list = graph.getAdjList(y)

    for(const node in list) {

      const t = list[node].node

      if(mature[t]) continue
      
      if(dist[y] + list[node].weight < dist[t]) {
        dist[t] = dist[y] + list[node].weight
      }
    }
    
    mature[y] = true
  }
  
    
}
