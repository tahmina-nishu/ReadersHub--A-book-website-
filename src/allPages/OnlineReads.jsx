import React, { useEffect, useState } from 'react';
import OnlineRead from './OnlineRead';

const OnlineReads = () => {
    const [onlinebooks, setOnlinebooks] = useState([]);
    
        useEffect(() => {
            fetch("/onlineBooks.json")   // FIXED PATH
                .then((response) => response.json())
                .then((data) => setOnlinebooks(data));
        }, []);

    return (
        <div>
            <div className="py-10 px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                {onlinebooks.map((onlinebook) => (
                    <OnlineRead key={onlinebook.id} onlinebook={onlinebook}></OnlineRead>
                ))}
        </div>
        </div>
    );
};

export default OnlineReads;