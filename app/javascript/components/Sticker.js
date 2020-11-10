import React from "react";
class Sticker extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  
  //load the image to remove loading flickering
  componentDidMount(){
    let image = new Image();
    let loaded = () => this.setState({
      isLoaded: true
    });
    image.addEventListener("load", function(){
      loaded();
    });
    
    image.src = this.props.url;
  }
  
  render () {
    const {xpos, ypos, url} = this.props;
    const {isLoaded} = this.state;
    const dimension = 350;
    
    let stickerXpos = xpos - dimension/2;
    let stickerYpos = ypos - dimension/2;
    const Stickerstyle = {
      width: `${dimension}px`,
      height: `${dimension}px`,
      top: stickerYpos,
      left: stickerXpos
    };
    if(!isLoaded){
      return(<React.Fragment/>);
    }
    else{
      return (
        <div style={Stickerstyle} className="sticker">
          <img className="stickerImg" src={url}/>
          <div>
            xpos: {stickerXpos}
            ypos: {stickerYpos}
            clickY: {ypos}
            clickX: {xpos}
          </div>
        </div>
      );
    }
  }
}

export default Sticker;
