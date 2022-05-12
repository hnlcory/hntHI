import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingBottom: '10px', paddingTop: '10px', isolation: 'isolate', fontFamily: 'Barlow' };
    return (
      <div className='landing-green-background' style={divStyle}>
        <footer>
          <div className="ui center aligned container">
            hntHI<br />
              University of Hawaii<br />
            Cory Parker <br />
            <a style={{ color: 'white' }} href="https://hnlcory.github.io">GitHub Profile</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
