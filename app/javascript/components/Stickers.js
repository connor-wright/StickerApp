import React from "react"
import PropTypes from "prop-types"
import Sticker from "./Sticker"

class Stickers extends React.Component {
  constructor(props) {
    super(props);
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
            stickers: result,
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
  
  onClick(clientX, clientY)
  {
    console.log("clicked");
  }
  
  render () {
    const {error, isLoaded} = this.state;
    
    if(error){
      return <div>Error: {error.message}</div>;
    }
    else if(!isLoaded){
      return <div>Loading Stickers ...</div>;
    }
    else{
      return(
        <div onClick={this.onClick} className="Stickers">
          Hello
        </div>
      );
    }
  }
}

export default Stickers;
