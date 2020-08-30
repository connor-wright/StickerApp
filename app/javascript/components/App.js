import React, {Component} from "react";
import Sticker from './Sticker'
import PropTypes from "prop-types";

//Root for our component tree
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      photos: []
    };
  }
  
  componentDidMount() {
    
    //get existing photos
    let photos;
    fetch('/v1/stickers')
      .then(res => res.json())
      .then(
        (result) => photos = result,
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
      });
      
    //get photo objects from pexels api
    if(photos)
    {
      photos.map((photo) => {
        this.addPhoto(photo.photo_id, photo.xpos, photo.ypos);
      });
    }
    //fornow just add one photo
    else{
      this.addPhoto(100, 100);
    }
  }
  
  //TODO this name is bad/doesnt represnet its function
  //maybe load?
  addPhoto(photo_id, xpos, ypos){
    this.fetchPhoto('/v1/pexels_api/sticker/' + photo_id);
  }
  
  addPhoto(clientX, clientY){
    //fetch pictures from the pexels api wrapper
    this.fetchPhoto('/v1/pexels_api', clientX, clientY, this.updateDb);
  }
  
  updateDb(photo_id, xpos, ypos)
  {
    console.log(photo_id, xpos, ypos);
    fetch('/v1/sticker', {
      method: 'POST',
      body: JSON.stringify({photo_id: photo_id, xpos: xpos, ypos: ypos})
    })
    .then(response => response.json)
    .then(data => {
      console.log("success: ", data);
    }).catch((error) => {
      console.log("error: ", error);
    });
  }
  
  fetchPhoto(url, xpos, ypos, updateDb)
  {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          let photo = result.photos[0];
          photo.pos = {posX: xpos, posY: ypos};
          this.setState(previousState => ({
            isLoaded: true,
            photos: [...previousState.photos, photo]
          }));
          //update db if we need to 
          if(updateDb)
            updateDb(photo.id, xpos, ypos);
        },
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
    //TODO investigate if the entire collection is being remade every render. 
    //if so we need to find a different solution
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
