import React from "react";
import {modifyStore, stores} from '../features/providers/masterProvider'


let stMod = modifyStore({
  master: {
    testReducer: {
      initialState: { selectedItem: 0, items: ['L', 'P', 'H'] },
      actions: {
        testAction_01: (state, act) => {
          console.log({when:"performing action 'testAction_01'", params : {state, act}})
          state.curtime = new Date().getTime();          
          return state;
        },
      },
    },
  },
});

let {testAction_01} = stMod

console.log(testAction_01);
let f = function (){ testAction_01({name: "aabbcc", ids: [3,7]}) }
window.setTimeout(f, 5000 )


export const TestComp = (params) => {
  return <>{ JSON.stringify(stores.master.state) }</>
}