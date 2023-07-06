import React from "react";
import {PlayersProvider as PP} from './TestProvider'


const {addPlayer, removePlayer, testProviderApis, getPlayers, useMutation} = PP

export const Players = (props) => {
  let [getPlayers, getPlayerStatus] = useMutation()

  
  let players = [{name: "smith", age: 34}, {name: "sami", age: 29}]
  //addPlayer({name : "lion", age : 22})

  //console.log({addPlayer, removePlayer, testProviderApis, getPlayers})



  return <>We are players .. {JSON.stringify(PP.players)} 
    <button onClick={(e)=> { 
      console.log({getPlayers, getPlayerStatus }) ;
      getPlayers({question: {q:"file", id: "aas82"}})
      }}>abcde</button>
  </>
}

