import React, { Component } from 'react';
import Img from 'gatsby-image';

class SafeImg extends Component {
  state = {
    placeholderExtraStyle: {}
  };

  onLoadHandler = () => {
    const { onLoad } = this.props;

    setTimeout(() => {
      this.setState({
        placeholderExtraStyle: { display: 'none' }
      });
    }, 500);

    if (onLoad) {
      onLoad();
    }
  };

  render() {
    const { placeholderStyle = {}, onLoad, ...props } = this.props;

    const { placeholderExtraStyle } = this.state;

    return (
      <Img
        onLoad={this.onLoadHandler}
        placeholderStyle={{ ...placeholderStyle, ...placeholderExtraStyle }}
        {...props}
      />
    );
  }
}

export default SafeImg;