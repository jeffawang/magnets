import logo from './logo.svg';
import './App.css';

import Draggable from 'react-draggable'

const fridgeStyle = {
  position: 'relative',
  height: '300px',
  backgroundColor: '#ddd',
  boxShadow: 'inset 0px 0px 10px 3px #999'
}

const magnetStyle = {
  position: 'absolute',
  display: 'inline-block',
  backgroundColor: 'white',
  padding: '5px',
  border: '1px solid black',
  borderBottom: '3px solid black',
}

const Magnet = ({left, top, word}) => {
  return <Draggable bounds="parent" defaultPosition={{x: left, y: top}}>
    <div style={{...magnetStyle}}>{word}</div>
  </Draggable>
}

function App() {
  return (
    <div style={{padding: "30px"}}>
      <div style={fridgeStyle}>
        <Magnet left={10} top={20} word="hello" />
        <Magnet left={100} top={66} word="world" />
        <Magnet left={50} top={200} word="(" />
        <Magnet left={80} top={160} word=")" />
        <Magnet left={120} top={30} word="print" />
        <Magnet left={10} top={100} word='"' />
        <Magnet left={100} top={200} word='"' />
      </div>
    </div>
  );
}

export default App;
