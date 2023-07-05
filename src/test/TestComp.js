import React from "react";
import {modifyStore, stores} from '../features/providers/masterProvider'


let stMod = modifyStore({
  master: {
    testReducer: {
      initialState: { selectedItem: 0, items: ['L', 'P', 'H'] },
      actions: {
        testAction_01: (payload, state) => {
          console.log({when:"performing action 'testAction_01'", params : {payload, state}})
          state.curtime = payload.curtime  
        },
        testAction_02: (payload, state) => {          
          //state.items.push('A')
          console.log({when:"performing action 'testAction_02'", params : {payload, state }})
          state.today = new Date().toDateString()
          
          //return state;
        },
      },
    },
  },
});

let stMod2 = modifyStore({
  master: {
    testReducer2: {
      initialState: { game: "cric", players : [{name : "sri", age:23}, {name: "faf", age: 34}]},
      actions: {
        testAction_99: (payload, state) => {
          console.log({when:"performing action 'testAction_99'", params : {payload, state}})
          state.game = payload.game  
        },
        testAction_100: (payload, state) => {          
          //state.items.push('A')
          console.log({when:"performing action 'testAction_100", params : {payload, state, players : state.players }})
          state.players.push({name:"king", age:27})
          state.today = new Date().toDateString()
          
          //return state;
        },
      },
    },
  },
});

let {testAction_01, testAction_02} = stMod
let {testAction_99, testAction_100} = stMod2

//console.log(testAction_01);
testAction_01({curtime : new Date().getTime() })
testAction_99({gameDay: "lion", game: "footb"})
let f = function (){ testAction_02({name: "aabbcc", ids: [3,7]}) }
window.setTimeout(f, 5000 )
let f2 = function (){ testAction_100({name: "aabbcc", ids: [3,7]}) }
window.setTimeout(f2, 5000 )



export const TestComp = (params) => {
  console.log(stores.master.state)
  return <>{ JSON.stringify(stores.master.state) }</>
}