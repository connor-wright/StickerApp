import React from "react";
import PropTypes from "prop-types";
class Sticker extends React.Component {
  constructor(props)
  {
    super(props);
    if(props.pos)
    {
      this.state = {
        url: props.url,
        xpos: props.pos.posX,
        ypos: props.pos.posY
      };
    }
    else{
      this.state = {
        url: props.url
      }
    }
  }
  
  render () {
    const {xpos, ypos, url} = this.state;
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
