import React from "react";
class Sticker extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      url: props.url,
      xClickPos: props.xpos,
      yClickPos: props.ypos,
      height: 0,
      width:  0,
      isLoaded: false
    };
  }
  
  //load the image width and height
  componentDidMount(){
    let image = new Image();
    let setWidthHeight = (width, height) => this.setState({
          width: width,
          height: height,
          isLoaded: true
        });
    image.addEventListener("load", function(){
      let width = this.naturalWidth;
      let height = this.naturalHeight;
      
      setWidthHeight(width, height);
    });
    
    image.src = this.state.url;
  }
  
  render () {
    const {xClickPos, yClickPos, width, height, url, isLoaded} = this.state;
    let xpos = xClickPos - width/2;
    let ypos = yClickPos - height/2;
    const Stickerstyle = {
      top: ypos,
      left: xpos
    };
    if(!isLoaded){
      return(<React.Fragment/>);
    }
    else{
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
}

export default Sticker;
