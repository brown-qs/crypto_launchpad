import React from 'react';
import gpt3Logo from '../../logo.svg';
import './footer.css';

const Footer = () => (
  <div id="footer" style={{padding: '5px'}} className="gpt3__footer section__padding fixed__bottom">
    {/* <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Join our Waitlist</p>
    </div> 
    */}

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
      <p>@2022 All rights reserved.  BrisePad</p>
      </div>
      {/* <div className="gpt3__footer-links_div">
        <p>Twitter</p>
        <p>Github</p>
        <p>Telegram</p>
        <p>Discord</p>
      </div> */}
    
    </div>

    {/* <div className="gpt3__footer-copyright">

      <p>@2021 Mmasi. All rights reserved.</p>
    </div> */}
  </div>
);

export default Footer;
