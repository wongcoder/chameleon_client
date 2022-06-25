import { useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';

function Waiting(props) {

  const clientList = props.clients.map((clientId) => {
    return <li>{clientId}</li>
  })
  return (
    <div className="Waiting">
      You are currently in the lobby/waiting room.

      <div className="Clients">
        Users in the Lobby:
        <ul>{clientList}</ul>
      </div>
    </div>

  )
}

function Game(props) {
  const renderedWords = props.wordList.map((word) => {
    return <li>{word}</li>
  })

  return (
    <div className="Game">
      You are now inside the game  
      <div className="WordList">
        <ul>{renderedWords}</ul>  
      </div>
      <WordOrChameleon chosenWord={props.chosenWord}/>
    </div>
  )
}

function WordOrChameleon(props) {
  if (props.chosenWord == '') {
    return (
      <div className="Chameleon">
        You are the impostor! If you're first... uhh... be general?
        Utilize the word list above so you don't... uhh... get outed.

        Haha.

        Good luck!
      </div>
    )
  } else {
    return (
      <div>
        The chosen word is the following:
        <div className="Word">
          {props.chosenWord}
        </div>
        Be careful with the word you say. You don't want to be too vague or too specific,
        otherwise the impostor among us will be able to kill us!
      </div>

    ) 
  }
}

export default function Lobby() {
  const params = useParams() 
  const [isActive, setActive] = useState(false)
  const [wordList, setWordList] = useState([])
  const [chosenWord, setWord] = useState('')
  const [clients, setClients] = useState(['test'])
  const [errorMessages, setErrorMessage] = useState('')

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/join-lobby/${params.lobbyCode}`)
  
    eventSource.addEventListener("game_error", (event) => {
      console.log("event listener response: ", event.data)
      setErrorMessage(event.data)
    })

    eventSource.addEventListener("game_start", (event) => { 
      console.log("Received Game Start Event: ", event.data)
      let data = JSON.parse(event.data)
      console.log(data)
      setWord(data.chosenWord)
      setWordList(data.wordList)
      setActive(true)
    })

    eventSource.addEventListener("game_end", (event) => {
      console.log("Received Game End Event: ", event.data)
      setActive(false)
    })

    eventSource.addEventListener("lobby_message", (event) => {
      console.log("Game Event Response")
      let data = JSON.parse(event.data)
      setClients(data)
    })

    eventSource.addEventListener("join_success", (event) => {
      console.log("You successfully joined the game server")
    })
  }, [])
  if (isActive) {
    return (
      <div className="Lobby">
        Whatever this shit isActive 
        <div className="Errors">
          {errorMessages}
        </div>
        <Game chosenWord={chosenWord} wordList={wordList}/>
      </div>
    )
  } else {
    return (
      <div className="Lobby">
        Whatever this shit isActive 
        <div className="Errors">
          {errorMessages}
        </div>
        <Waiting clients={clients}/>
      </div>
    )
  }
}