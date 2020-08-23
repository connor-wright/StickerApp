import React, {Component} from "react";
import Sticker from './Sticker'
import PropTypes from "prop-types";

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      photos: []
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
            photos: result.photos
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
      );
  }
  
  addPhoto(clientX, clientY){
    //fetch pictures from the pexels api wrapper
    fetch('/v1/pexels_api')
      .then(res => res.json())
      .then(
        (result) => {
          let photo = result.photos[0];
          photo.pos = {posX: clientX, posY: clientY};
          this.setState(previousState => ({
            isLoaded: true,
            photos: [...previousState.photos, photo]
          }));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.error("Could not load image");
        }
      );
  }
  
  onClick(e){
    console.log("x: " + e.clientX + ", " + "y: " + e.clientY);
    {this.addPhoto(e.clientX, e.clientY);}
  }
  
  RenderStickers(photos){
    let stickers = photos.map((photo) => {
      return (
        //Need to add a unique key based on x and y pos
        <Sticker url={photo.src.small} 
                 pos={photo.pos} 
                 //clean up your keys these are nasty need a way to uniquely identify
                 key={photo.pos? `X:${photo.pos.posX} Y:${photo.pos.posX}`: photo.src.small}/>
      );
    });
    return stickers;
  }
  
  render() {
    const { error, isLoaded, photos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div onClick={this.onClick} className="App">
          {this.RenderStickers(photos)}
        </div>
      );
      
    }
  }
}

export default App;
