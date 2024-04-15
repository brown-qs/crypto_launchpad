import React from 'react';
import { Link } from 'react-router-dom';
// import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <div className='flex__header__content'>
        <h1 className="gradient__text">Earn passive income with BrisePad</h1>
        <p>Brisepad is designed to help fuel the future of mass-market blockchain applications building on Bitgert chain We aim to be the largest decentralized launchpad on Bitgert Chain attracting solid projects and help them raise enough liquidity for their project development.</p>
      </div>

      <div className='header_button'>
        <div className="gpt3__header-content__input">
          <Link className='goto_link' to='/activepools'>Goto Pools</Link>
        </div>
        {/* <div  className="gpt3__header-content__input">
          <button type="button">Borrow</button>
        </div> */}
      </div>
    

      {/* <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
    </div>

    <div className="gpt3__header-image">
    {/* <p className='gradient__text'>Brisepad is designed to help fuel the future of mass-market blockchain applications building on Bitgert chain We aim to be the largest decentralized launchpad on Bitgert Chain attracting solid projects and help them raise enough liquidity for their project development.</p> */}

      {/* <img src={ai} /> */}
      {/* <img src='images/briselogo/brise-vertical.png' alt='Brise'/> */}
      {/* colour-brise.png */}
    </div>
  </div>
);

export default Header;
