import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'


function handleSubmit(event) {
  event.preventDefault()

}

function App(props) {
  return (
    <div className="App">
      <div className="JoinLobby">
        <form>
          <label>
            Enter Lobby Code:
            <input type="text" name="lobbyCode" />
          </label>
          <input type="submit" value="Join Game"/>
        </form>
      </div>
      <div className="CreateLobbyButton">
        <button>
          Create Game
        </button>
      </div>
    </div>
  )
}




export default App;
