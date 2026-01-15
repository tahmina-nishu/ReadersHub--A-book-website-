import React, { useState } from "react";

const Genre = ({ allbook }) => {
                const { image, title, author, rating, type, description } = allbook;

                const [openModal, setOpenModal] = useState(false);

                return (
                    <div className="card bg-base-100 w-80 shadow-sm mx-auto">
                    <figure className="px-10 pt-8">
                        <img src={image} alt={title} className="h-64 w-48" />
                    </figure>

                    <div className="card-body items-center text-center space-y-[4px]"> 
                        {/* gap komano holo */}
                        <h2 className="card-title">{title}</h2>

                        <p>Author: {author}</p>
                        <p>Rating: ⭐ {rating}</p>
                        <p>Type: {type}</p>

                        <div className="card-actions mt-1">
                        <button onClick={() => setOpenModal(true)} className="px-4 py-2 rounded-lg bg-[#ded1c4] font-bold text-[#5a3f2b]"  >
                            Details
                        </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {openModal && (
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                        {/* No black background */}
                        <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center space-y-4">

                            <h2 className="text-2xl font-bold text-[#56361d]">{title}</h2>

                            <p className="text-[#664932] leading-relaxed">{description}</p>

                            <button
                            onClick={() => setOpenModal(false)}
                            className="mt-3 px-4 py-2 rounded-lg"
                            style={{
                                backgroundColor: "#664932",
                                color: "#f7f5f4",
                            }}
                            >
                            Close
                            </button>
                        </div>
                        </div>
                    )}
                </div>
    );
};

export default Genre;