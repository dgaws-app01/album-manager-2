import React from "react";
import {Api, stores} from './features/providers/masterProvider'
//import {TestComp} from './test/TestComp'
import {Players} from './test/TestComp2'
import "./style.css";

console.log({Api, stores})

export default function App() {
  return (
    <div>
      <h1>Test Comp</h1>
      <Players></Players>
      <p>ready ...</p>
    </div>
  );
}
