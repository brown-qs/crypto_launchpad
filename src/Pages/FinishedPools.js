import React from 'react';
import '../App.css';
import InactivePools from '../components/inactivepools/InactivePools';
import useAuth from '../hooks/useAuth';

const FinishedPools = () => {
  const { login } = useAuth();

  const headerStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px'
  };

  return (
    <div className="App">
        <h3 style={headerStyle}>Finished Pools</h3>
        <div className="gradient__bg">
            <InactivePools login={login} />
        </div>
    </div>

  );
};

export default FinishedPools;
