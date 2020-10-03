import React from "react";
import Sticker from "./Sticker";
import {GetImgs, GetImgByID, PostNewPhoto} from "./APIInterface";

class Stickers extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      stickers: []
    };
  }
  
  componentDidMount(){
    //load stickers
    GetImgs().then(
        (result) => {
          this.setState({
            stickers: result.map(photo => this.CreateSticker(photo)),
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            error: error,
            isLoaded: true
          });
        });
  }
  
  onClick(e)
  {
    let xpos = e.clientX;
    let ypos = e.clientY;
    let AddSticker = (photo) => this.setState(previousState => ({
                stickers: [...previousState.stickers, this.CreateSticker(photo)]
              }));
    if(this.props.activeId)
    {
      GetImgByID(this.props.activeId)
      .then(
        (result) => {
          let photo = result;
          photo = {
            photo_id: photo.id, 
            url: photo.src.small,
            artist: photo.photographer,
            xpos: xpos,
            ypos: ypos
          };
          //add new photo to the db
          PostNewPhoto(photo).then((response) => {
            AddSticker(response);
          },
          (error) => {
            console.error("Could not add sticker " + error);
          });
        },
        (error) => {
          console.error("Could not add sticker " + error);
        }
      );
    }
    
  }
  
  CreateSticker(photo){
    return(
      <Sticker
        url={photo.url}
        xpos = {photo.xpos}
        ypos = {photo.ypos}
        key = {photo.id}
      />
    );
  }
  
  render () {
    const {error, isLoaded, stickers} = this.state;
    
    if(error){
      return <div>Error: {error.message}</div>;
    }
    else if(!isLoaded){
      return <div>Loading Stickers ...</div>;
    }
    else{
      return(
        <div onClick={this.onClick} className="Stickers">
          {stickers}
        </div>
      );
    }
  }
}

export default Stickers;