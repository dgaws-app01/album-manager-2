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

      //let x = "https://script.google.com/macros/s/AKfycbz-sN9HyNIDWW0hPnaZlfZOFmsXF8M7y_4oq68iDucPDIVonUIbIws_7vu_x2t5zZE75g/exec"
      //let f = fetch(x, {method:"POST", body:{id:45, desc: "prior"}}).then(d=> d.json().then(j=> console.log(j)))

      }}>abcde</button>
  </>
}

