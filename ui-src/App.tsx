import { useRef, useState } from "react";
import "./App.css";
import Button from "./components/buttons/Button";
import Footer from "./components/footer/Footer";

function App () {

  const frameThem = () => {
    console.log("Framing Them")
    parent.postMessage({
      pluginMessage: { type: 'frameThis' }
    }, "*")
  }
  const frameThisGroup = () => {
    console.log("Framing Group")
    parent.postMessage({
      pluginMessage: { type: 'frameThisGroup' }
    }, "*")
  }


  return (
    <div className="wrapper">
      <Button label="Frame each of them" onClick={() => frameThem()} />
      <Button label="Frame this group" onClick={() => frameThisGroup()} />
      <Footer />
    </div>
  );
}

export default App;