import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import PoolDetail from '../components/pools/PoolDetail';
import pools from '../config/constants/pools';

const ShowPool = () => {

    const { sousId } = useParams();
    
    const resPools = pools.filter(pool => (pool.sousId === Number(sousId)));
    
    return (
        <div className="App">
            <div className="gradient__bg">
            <PoolDetail pool={resPools[0]} />
            </div>
        </div>
    );
};

export default ShowPool;
