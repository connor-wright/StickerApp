import PropTypes from "prop-types"
import React, {Component} from "react"
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('/v1/pexels_api')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            
            isLoaded: true,
            items: result
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          
            <li key={items.photos[0].url}>
              <img src={items.photos[0].src.medium}/>
            </li>

        </ul>
      );
    }
  }
}
export default HelloWorld
