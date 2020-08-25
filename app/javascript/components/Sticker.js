import React from "react";
import PropTypes from "prop-types";
class Sticker extends React.Component {
  constructor(props)
  {
    super(props);
    this.setWdithHeight = this.setWdithHeight.bind(this)
    
    //clean this up need to find better solution for position
    if(props.pos)
    {
      this.state = {
        url: props.url,
        xClickPos: props.pos.posX,
        yClickPos: props.pos.posY,
        height: 0,
        width:  0
      };
    }
    else{
      this.state = {
        url: props.url
      }
    }
  }
  
  setWdithHeight(width, height)
  {
    this.setState({
        height: height,
        width:  width
      });
  }
  
  //load the image width and height
  componentDidMount(){
    let image = new Image();
    let updateWidthHeight = this.setWdithHeight;
    image.addEventListener("load", function(){
      updateWidthHeight(this.naturalWidth, this.naturalHeight);
    });
    
    image.src = this.state.url;
  }
  
  render () {
    const {xClickPos, yClickPos, width, height, url} = this.state;
    let xpos = xClickPos? xClickPos - width/2: 0;
    let ypos = yClickPos? yClickPos - height/2: 0;
    const Stickerstyle = {
      top: ypos,
      left: xpos
    };
    
    return (
      <div style={Stickerstyle} className="sticker">
        <img src={url}/>
        <div>
          xpos: {xpos}
          ypos: {ypos}
        </div>
      </div>
    );
  }
}

export default Sticker;
