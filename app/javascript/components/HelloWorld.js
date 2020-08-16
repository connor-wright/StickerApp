import PropTypes from "prop-types"
import React, {Component} from "react"
import Figaro  from 'figaro-js'
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
    Figaro.load();
    console.log(process.env.pexels_api_key);
    fetch('https://api.pexels.com/v1/curated?per_page=1', {
          headers: {'Authorization':process.environment.REACT_APP_PEXELS_API_KEY}})
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
