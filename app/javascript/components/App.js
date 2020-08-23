import React, {Component} from "react";
import Sticker from './Sticker'
import PropTypes from "prop-types";

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  
  componentDidMount() {
    //fetch pictures from the pexels api wrapper
    fetch('/v1/pexels_api')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  RenderStickers(photos){
    let stickers = photos.map((photo) => {
        return (
        <li key={photo.url}> 
          <Sticker url={photo.src.medium}/> 
        </li>)
      });
    return <ul> {stickers} </ul>
  }
  
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        this.RenderStickers(items.photos)
      );
    }
  }
}

export default App;
