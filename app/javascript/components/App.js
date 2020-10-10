import React from "react";
import Stickers from './Stickers';
import SearchBar from './SearchBar';
import {SearchImgs} from "./BackendAPI";

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeId: null};
    
    this.setActiveId = activeId => {
      this.setState({activeId: activeId});
    };
  }
  
  render() {
    return (
      <div className='AppContainer'>
        <SearchBar searchImgs={SearchImgs}  setActiveId={this.setActiveId}/>
        <Stickers activeId={this.state.activeId}/>
      </div>
    );
  }
}

export default App;
