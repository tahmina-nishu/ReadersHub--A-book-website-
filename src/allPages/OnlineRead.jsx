import React from 'react';

const OnlineRead = ({ onlinebook }) => {
    // const {details, author, title, image, rating, link } = onlinebook;
    const {author, title, image, rating, link } = onlinebook;

    return (
        <div>
            <div className="card bg-base-100 w-80 shadow-sm">
                <figure className="px-6 pt-6">
                    <img 
                        src={image}
                        alt={title}
                        className="w-56 h-72 object-cover rounded"
                    />
                </figure>

                <div className="card-body items-center text-center">
                    <h2 className="card-title">Title : {title}</h2>
                    <p>Author : {author}</p>
                    <p className="font-semibold">Rating : ⭐ {rating}</p>

                    <div className="card-actions w-full flex gap-3 mt-3">

                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-2 px-4 py-2 rounded-lg bg-[#664932] text-white text-center hover:opacity-90 transition"
                        >
                            Read Now
                        </a>

                        <button className="flex-1 px-4 py-2 rounded-lg bg-[#664932] text-white hover:opacity-90 transition">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineRead;
