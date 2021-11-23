import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import * as Y from 'yjs'

import Draggable from 'react-draggable'
import { WebrtcProvider } from 'y-webrtc';

const fridgeStyle = {
  position: 'relative',
  height: '512px',
  width: '512px',
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

const Magnet = ({word}) => {
  const data = word.toJSON()

  const onDrag = (e, drag) => {
    const newPos = {
      x: drag.x,
      y: drag.y,
    }
    word.set("position", newPos)
  }

  const [xy, setXY] = useState(data.position)

  useEffect(()=>{
    word.observe((e)=> {
      setXY(e.target.get("position"))
    }
    )
  }, [])

  return <Draggable bounds="parent" position={data.position} onDrag={onDrag}>
    <div style={{...magnetStyle}}>{data.word}</div>
  </Draggable>
}

const defaultWords = [
  {
    "word": "hello",
    "position": {
      "x": 10,
      "y": 20
    }
  },
  {
    "word": "world",
    "position": {
      "x": 100,
      "y": 66
    }
  },
  {
    "word": "(",
    "position": {
      "x": 50,
      "y": 200
    }
  },
  {
    "word": ")",
    "position": {
      "x": 80,
      "y": 160
    }
  },
  {
    "word": "print",
    "position": {
      "x": 120,
      "y": 30
    }
  },
  {
    "word": '"',
    "position": {
      "x": 10,
      "y": 100
    }
  },
  {
    "word": '"',
    "position": {
      "x": 100,
      "y": 200
    }
  }
]

function App() {

  const [words, setWords] = useState([])
  const [provider, setProvider] = useState()
  const [awareness, setAwareness] = useState()

  const [yarrayLog, setYArrayLog] = useState([])

  useEffect(() => {
    const ydoc = new Y.Doc()
    const p = new WebrtcProvider('fridge-magnets-12345', ydoc)

    const yarray = ydoc.getArray('words')

    setWords(yarray)

    yarray.observeDeep((event) => {
      setYArrayLog(yarrayLog.concat([event]))
    })


    setProvider(p)
    setAwareness(p.awareness)

  }, [])

  const [newWord, setNewWord] = useState("hello")

  const onNewWordInputChange = (e) => {
    const value = e.target.value
    setNewWord(value)
  }

  const onNewWordSubmit = () => {
    if (newWord.length === 0) return
    const ymap = new Y.Map(Object.entries({...defaultWords[0], word: newWord}))
    // ymap.set('word', newWord)
    // ymap.set('position', {x: 10, y: 25})
    words.push([ymap])
    setNewWord("")
  }

  return (
    <div>
      <div style={{padding: "30px"}}>
        <div style={fridgeStyle}>
          {
            words.map((word) => {
              return <Magnet word={word} />
            })
          }
        </div>
      </div>
      <div>
        <p>New Word</p>
        <input value={newWord} onChange={onNewWordInputChange}/>
        <button onClick={onNewWordSubmit}>submit new word</button>
      </div>
      <p>WORDS: {JSON.stringify(words)}</p>
      {/* <p>DRAG LOG: {JSON.stringify(dragLog, getCircularReplacer())}</p> */}
      {/* <p>YARRAY LOG: {JSON.stringify(yarrayLog)}</p> */}
    </div>
  );
}

export default App;
