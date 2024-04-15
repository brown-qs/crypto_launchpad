import React from 'react';
import '../App.css';
import Pools from '../components/pools/Pools';
import useAuth from '../hooks/useAuth';

const ActivePools = () => {
  const { login } = useAuth();

  const headerStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px'
  };

  return (
    <div className="App">
      <h3 style={headerStyle}>Active Pools</h3>
      <div className="gradient__bg">
        <Pools login={login} />
      </div>
    </div>

  );
};

export default ActivePools;
