import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import InactivePoolDetail from '../components/inactivepools/InactivePoolDetail';
import pools from '../config/constants/pools';

const ShowInactivePool = () => {

    const { sousId } = useParams();
    
    const resPools = pools.filter(pool => (pool.sousId === Number(sousId)));
    
    return (
        <div className="App">
            <div className="gradient__bg">
            <InactivePoolDetail pool={resPools[0]} />
            </div>
        </div>
    );
};

export default ShowInactivePool;
