import React from "react";
import Stickers from './Stickers';

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<Stickers/>);
  }
}

export default App;
