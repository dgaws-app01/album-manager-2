import React from "react";
import {PlayersProvider as PP} from './TestProvider'

const {addPlayer, removePlayer, testProviderApis} = PP

addPlayer({name : "lion", age : 22})

export const Players = (props) => {
  console.log({addPlayer, removePlayer, testProviderApis})
  return <>We are players .. {JSON.stringify(PP.players)} </>
}