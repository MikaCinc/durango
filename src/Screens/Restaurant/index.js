import React, { useEffect, useState } from 'react';

const Restaurant = props => {

    const [id, setId] = useState(null)

    useEffect(() => {
        console.log('herrere')
    }, []);

    return <div style={{ backgroundColor: '#0000ff' }}>

    </div>;
};

export default Restaurant;