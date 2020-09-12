import React from "react";
import Stickers from './Stickers';
import SearchBar from './SearchBar';

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='AppContainer'>
        <SearchBar/>
        <Stickers/>
      </div>
    );
  }
}

export default App;
