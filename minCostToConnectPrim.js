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

  getAdj(){
    return this.adjList
  }

  getAdjList(v) {
    return this.adjList.get(v)
  }

  getNodeCount() {
    return this.nodeCount
  }

  prim() {
    const visited = new Set()
    let value = 0
    let pq = new MyPriorityQueue()
    pq.insert({node:0,distance:0})

    while (visited.size < this.nodeCount) {
      const {node, distance} = pq.pqDelMin()

      if(visited.has(node)) continue

      visited.add(node)

      value += distance
      

      for (let neighbor of this.adjList.get(node)) {

        if (!visited.has(neighbor.getNode())) {
          pq.insert({node: neighbor.node, distance:neighbor.weight})
        }
      }

    }

    return value;
  }
    
}


/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {

  const graph = new Graph();

  for(const x in points) graph.addNode(Number.parseInt(x))

  points.forEach((pointsA,indexA) => {

    for(let i = indexA + 1; i < points.length; i++) {
      let dist = Math.abs(pointsA[0] - points[i][0]) + Math.abs(points[i][1] - pointsA[1])
      graph.addEdge(indexA,i,dist)
    }
  })

  return graph.prim()
};