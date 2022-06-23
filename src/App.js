import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const eventSource = new EventSource("http://localhost:3000/join-lobby/AMOGUS")
  console.log("am i running twice")
  eventSource.onmessage = (event) => {
    console.log("event received", event)
    console.log("event.data", event.data)

  }

  return (
    <div className="App">
      Whatever this shit is
    </div>
  )
}

export default App;
