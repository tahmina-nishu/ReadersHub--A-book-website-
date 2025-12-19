import React, { useEffect, useState } from 'react';
import Genre from './Genre';

const Genres = () => {
    const [allbooks, setAllbooks] = useState([]);

    useEffect(() => {
        fetch("/public/allBooks.json")  
            .then((response) => response.json())
            .then((data) => setAllbooks(data));
    }, []);

    return (

        <div className="py-10 px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                {allbooks.map((allbook) => (
                    <Genre key={allbook.id} allbook={allbook}></Genre>
                ))}
        </div>
        
    );
};

export default Genres;