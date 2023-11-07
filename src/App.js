import {useState} from 'react';
import Arrow from './arrow';
import bfs from './explore';
import './App.css';

const button = {fontSize:'1.1rem',padding:'0.5rem',borderWidth:'1.5px', borderRadius:'10px',backgroundColor:'white'}

function App() {

  const [num,setNum] = useState(1);
  const [edges,setEdges] = useState([]);
  const [alpha,setAlpha] = useState(Array(num).fill(null));
  const [number,setNumber] = useState(Array(num).fill(null));
  const [connecting,setConnecting] = useState(false);
  const [pair,setPair] = useState(null);
  const[cursor,setCursor] = useState('auto');
  const [step,setStep] = useState(-1);

  const[source,setSource] = useState(null);
  const [destination,setDestination] = useState(null);
  const [path,setPath] = useState(null);


  const readInput = (event,id) => {
    const temp = alpha.slice();
    temp[id] = event.target.value;
    setAlpha(temp);
    console.log(temp);
  }
  const handleClick = (id) => {
    if(!connecting)return;
    if(pair == null) setPair(id);
    else {
      const temp = [pair,id];
      if(edges.includes(temp)){
        handleEdge();
        setPair(null);
        return;
      }
      const newEdges = edges.slice();
      newEdges.push(temp);
      setPair(null);
      setEdges(newEdges);
      handleEdge();
    }
  }
  const readNumber = (event,id) => {
    const temp = number.slice();
    temp[id] = event.target.value;
    setNumber(temp);
    console.log(temp);
  }
const handleAdd = () =>{
  setNum(num=>num+1)
}
const handleSub = () => {
  if(num === 0)return;
  let temp = alpha.slice(0,num-1);
  setAlpha(temp);
  temp = number.slice(0,num-1);
  setNumber(temp);
  temp = [];
  for(const it of edges) {
    if(it.includes((num-1).toString()))continue;
    temp.push(it);
  }
  setEdges(temp);
  setNum(num-1);
}

const handleEdge = () => {
  if(connecting)setCursor('auto');
  else setCursor('crosshair');
  setConnecting(!connecting)
}

const handlePlay = () => {
  if(source == null || destination == null)return;
  if(path == null) {
    setPath(bfs(source,destination,edges,alpha,number));
    console.log("path is " ,path);
    setStep(step => step + 1);
    console.log("step is ",step);
    return;
  }
  if(step >= path.length - 1) {
    setStep(-1);
    setPath(null);
    setSource(null); 
    setDestination(null);
  }
  else setStep(step=>step + 1);
  console.log("steppu is ",step);
}

  return (
   <div style = {{cursor:cursor}}>
    <div style = {{margin:100}}>
    <Arrow num = {num} edges = {edges} readInput={readInput} readNumber={readNumber} handleClick = {handleClick} step = {step} path = {path}/>
    </div>
    <div style = {{justifyContent:'space-between',margin:'auto',width:'80%',position:'fixed',bottom:'5rem',left:'5rem'}}>
      <div style = {{display: 'flex', justifyContent: 'space-evenly', width: '100%',backgroundColor:'#303030',color:'white',borderRadius:'20px',padding:'0.5rem'}}>
      <button onClick={handleAdd} style = {button}>+</button>
      <button onClick={handleSub} style = {button}>-</button>
      <button onClick={handleEdge} style = {button}> {"<=>"}</button>
      <button onClick={handlePlay} style = {button}>Run</button>
      <label style = {{fontSize:'1.2rem',marginTop:'0.2rem'}}>Source:
      <input onChange = {(event)=> {setSource(event.target.value)}} style = {{marginLeft:'0.4rem',width:'0.8rem'}}></input>
      </label>
      <label style = {{fontSize:'1.2rem',marginTop:'0.2rem'}}>Destination: 
      <input onChange = {(event)=> {setDestination(event.target.value)}} style = {{marginLeft:'0.4rem',width:'0.8rem'}}></input>
      </label>
      </div>
    </div>
   </div>
  );
}

export default App;
