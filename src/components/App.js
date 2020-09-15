import React from "react";
import Header from "./Header";
import BottleControl from "./GameControl";
import Container from "react-bootstrap/Container";

function App(){
  return (
    <React.Fragment>
      <Header />
      <BottleControl />
    </React.Fragment>
  );
}

export default App;