import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingBottom: '10px', paddingTop: '10px' };
    return (
      <div className='landing-green-background' style={divStyle}>
        <footer>
          <div className="ui center aligned container">
            Carpool-And-Go <br />
              University of Hawaii<br />
            Kenji, Robin, Cory, Johanan, Kaialii, Michael <br />
            <a style={{ color: 'white' }} href="https://carpool-and-go.github.io">carpool-and-go.github.io</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
