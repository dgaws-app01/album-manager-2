import React from "react";
import {PlayersProvider as PP} from './TestProvider'


const {addPlayer, removePlayer, testProviderApis, getPlayers} = PP

export const Players = (props) => {
  
  
  let players = [{name: "smith", age: 34}, {name: "sami", age: 29}]
  //addPlayer({name : "lion", age : 22})

  //console.log({addPlayer, removePlayer, testProviderApis, getPlayers})



  return <>We are players .. {JSON.stringify(PP.players)} 
    <button onClick={(e)=> {getPlayers()}}>abcde</button>
  </>
}

