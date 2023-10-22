import React from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Draggable from 'react-draggable';

const boxStyle = {border: 'grey solid 2px', borderRadius: '10px', padding: '5px',justifyContent:'center'};

const DraggableBox = ({id,step,path,readInput,readNumber,handleClick}) => {
    const updateXarrow = useXarrow();

    const str = (id,path,step) => {
        if(path === null || step === -1)return;
        if(parseInt(id) !== path[step][0])return;
        if(step === path.length-1)return 'Reached';
        const data = 'data';
        const s = `${path[(step + 1)%path.length][2]} ${path[step][2]} ${path[0][1]} ${path[path.length-1][1]} ${data}`;
        console.log(s);
        return s;
    }
  
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} >
            <div id={id} style={boxStyle} onClick={() => handleClick(id)}>
              <div style = {{border: 'grey solid 2px',margin:'auto',width:'80%',height:'1rem',padding:'0.2rem'}}>{str(id,path,step)}</div>
              <img src = 'https://static.vecteezy.com/system/resources/thumbnails/000/569/512/small/vector60-3879-01.jpg' style = {{width:'6rem',height:'6rem'}} draggable = {false} alt = 'computer'/>
                <div style = {{display:'flex',justifyContent:'space-evenly', width:'100%',margin:'0.1rem'}}>
                <input style = {{width:'1rem',border: 'black solid 0.1rem',paddingLeft:'0.5rem',borderRadius:'5px'}} onChange={(event)=> readInput(event,parseInt(id))}/>
                <input style = {{width:'1rem',border: 'black solid 0.1rem',paddingLeft:'0.2rem',borderRadius:'5px'}} onChange = {(event) => readNumber(event,parseInt(id))}/>
                </div>
            </div>
        </Draggable>
    );
};

export default function Arrow({num, edges,readInput,readNumber,handleClick,step,path}) {
  const array = [];
  
  for(let i = 0; i < num; i++)array.push(<DraggableBox key = {i} id = {i.toString()} readInput={readInput} readNumber={readNumber} handleClick={handleClick} step = {step} path = {path}/>);
  for(const i of edges)array.push(<Xarrow key = {i} start = {(i[0]).toString()} end = {(i[1]).toString()} showHead={false}/>);

    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            <Xwrapper>
                {array}
            </Xwrapper>
        </div>
    );
}