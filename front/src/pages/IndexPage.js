import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const secret = localStorage.getItem('userSecret')
 
  return (
    <>
          <div className="container">
        <div className="container_text">
          <span className="text_subscription">PREMIUM 12 months</span>
          <div className="container_price">
            <span className="text_price">€24,74</span>
            <span className="text_month"> /month.</span>
          </div>
          <p>Gym opened 24/7</p>
          <p>Sauna</p>
          <p>Group training</p>
          <Link to='/subscription'>Click to get your subscription!</Link>
        </div>
      </div>
    </>
  )
}

export default IndexPage