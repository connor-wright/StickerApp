import React from "react";
import Sticker from "./Sticker";
import {GetStickers, GetImgurImg, PostSticker} from "./BackendAPI";

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
    GetStickers().then(
        (result) => {
          this.setState({
            stickers: result.map(sticker => this.CreateSticker(sticker)),
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
    let AddSticker = (sticker) => this.setState(previousState => ({
                stickers: [...previousState.stickers, this.CreateSticker(sticker)]
              }));
    if(this.props.activeId)
    {
      GetImgurImg(this.props.activeId)
      .then(
        (result) => {
          let sticker = {
            img_id: result.data.id, 
            url: result.data.link,
            xpos: xpos,
            ypos: ypos
          };
          //add new img to the db
          PostSticker(sticker).then((response) => {
            AddSticker(response);
          },
          (error) => {
            console.error("Could not add sticker " + error);
          });
        },
        (error) => {
          console.error("Could not add sticker" + error);
        }
      );
    }
    
  }
  
  CreateSticker(sticker){
    return(
      <Sticker
        url={sticker.url}
        xpos = {sticker.xpos}
        ypos = {sticker.ypos}
        key = {sticker.id}
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