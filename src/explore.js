export default function Bfs(source,destination,edges,alpha,number) {
  let visited = Array(alpha.length).fill(-1);
  let adj = Array.from(Array(alpha.length), () => []);
  for(let it of edges) {
    adj[parseInt(it[0])].push(parseInt(it[1]));
    adj[parseInt(it[1])].push(parseInt(it[0]));
  }
  let ans = [];
  let q = [];
  for(let i = 0; i < alpha.length; i++) {
    if(source === alpha[i]) {
      source = i;
    }
    if(destination === alpha[i]){
      destination = i;
    }
  }
  console.log(edges);
  console.log(adj);
  visited[source] = source;
  q.push(source);
  while(q.length > 0) {
    let front = q.shift();   
    for(const neigh of adj[front]) {
      if(visited[neigh] !== -1)continue;
      visited[neigh] = front;
      q.push(neigh);
    }
  }
  if(visited[destination]===-1)return null;
  let iter = destination;
  while(visited[iter]!== iter) {
    ans.push([iter,alpha[iter],number[iter]]);
    iter = visited[iter];
  }
  ans.push([iter,alpha[iter],number[iter]]);
  console.log(visited);
  return ans.reverse();
}