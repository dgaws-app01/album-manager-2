import React from "react";
import {Api, stores} from './features/providers/masterProvider'
import {TestComp} from './test/TestComp'
import "./style.css";

console.log({Api, stores})

export default function App() {
  return (
    <div>
      <h1>Test Comp</h1>
      <TestComp></TestComp>
      <p>ready ...</p>
    </div>
  );
}
