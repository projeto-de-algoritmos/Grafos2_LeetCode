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

  constructor() {
      this.nodeCount = 0
      this.adjList = new Map()
  }
  
  addEdge(v, w, weight) {
    this.adjList.get(v).push(new Edge(w,weight))
    this.adjList.get(w).push(new Edge(v,weight))
  }

  addNode(v) { 
    this.adjList.set(v,[])
    this.nodeCount++
  }

  getAdjList(v) {
    return this.adjList.get(v)
  }

  getNodeCount() {
    return this.nodeCount
  }

}

class MyPriorityQueue {

  constructor(size) {
    this.pq = Array(size)
    this.qtd = 0
  }

  exch(a,b) {
    let c = this.pq[a]; 
    this.pq[a] = this.pq[b] ; 
    this.pq[b] = c
  }

  insert(item) {
    this.pq[++this.qtd] = item;
    this.fixUp()
  }

  fixUp() {

    let k = this.qtd 

    while(k>1 && this.pq[Math.floor(k/2)].distance > this.pq[k].distance) {
      this.exch(k,Math.floor(k/2))
      k = Math.floor(k/2)
    }
  }

  fixDown() {
    
    let j, k = 1

    while(k*2<= this.qtd-1) {
      j = k*2;
      if(j < this.qtd - 1 && this.pq[j].distance > this.pq[j+1].distance) j++;
      if(this.pq[j].distance > this.pq[k].distance) break
      this.exch(k,j)

      k = j
    }
  }

  pqDelMin() {
    this.exch(1,this.qtd)
    this.fixDown()
    return this.pq[this.qtd--]
  }

  isEmpty() {
    return this.qtd == 0
  }

}

let dist
function shortestPath(graph,v) {
 
  const mature = Array(graph.getNodeCount())

  dist.fill(Number.MAX_VALUE)
  mature.fill(false)    

  dist[v] = 0

  const pq = new MyPriorityQueue(2*graph.getNodeCount()+1)

  pq.insert({node: v, distance: 0})

  while(!pq.isEmpty()) {
    
    const { node : nodeIn } = pq.pqDelMin()  
      
    if(mature[nodeIn]) continue;

    const list = graph.getAdjList(nodeIn)

    for(const node in list) {

      const t = list[node].node

      if(mature[t]) continue
      
      if(dist[nodeIn] + list[node].weight < dist[t]) {
        dist[t] = dist[nodeIn] + list[node].weight
        pq.insert({node: t,distance: dist[t]})
      }
    }
      
    mature[nodeIn] = true
  }
  
  
}

/**
* @param {number[][]} edges
* @param {number} maxMoves
* @param {number} n
* @return {number}
*/
var reachableNodes = function(edges, maxMoves, n) {
  const graph =  new Graph()

  for(let i = 0; i<n; i++) graph.addNode(i)

  edges.forEach(edge => {
    graph.addEdge(edge[0],edge[1],edge[2]+1)
  })

  dist = Array(graph.getNodeCount())

  shortestPath(graph,0)

  let result = 0
  dist.forEach(distance => {
    result += distance <= maxMoves ? 1 : 0
  })

  edges.forEach(edge => {
    let from = Math.max(0,(maxMoves - dist[edge[0]]))
    let dest = Math.max(0,(maxMoves-dist[edge[1]]))
    result += Math.min(edge[2],(from+dest))  
  })

  return result
};




