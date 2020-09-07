import React from "react"
import PropTypes from "prop-types"
import Sticker from "./Sticker"

class Stickers extends React.Component {
  constructor(props) {
    super(props);
    this.onClick    = this.onClick.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      stickers: []
    };
  }
  
  componentDidMount(){
    //load stickers
    fetch('/v1/stickers')
      .then(res => res.json())
      .then(
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
    //for now grab a random photo
    fetch('/v1/pexels_api/')
      .then(res => res.json())
      .then(
        (result) => {
          let photo = result.photos[0];
          photo = {
            photo_id: photo.id, 
            url: photo.src.small,
            artist: photo.photographer,
            xpos: xpos,
            ypos: ypos
          };
          //add new photo to the db
          $.ajax({
            url: '/v1/sticker',
            type: 'post',
            dataType: 'json',
            data: {photo: photo},
            success: function(photo) {
              //add photo to stickers
              AddSticker(photo);
            },
            error: function(error){
              console.error("Could not add sticker");
            }
          });
        },
        (error) => {
          console.error("Could not add sticker");
        }
    );
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
    
    console.log(stickers);
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