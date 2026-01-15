import React from 'react';

const BuyBook = ({ sellingbook, addToCart }) => {
  const {
    availability,
    price,
    author,
    title,
    image,
    rating,
    details,
    id,
    offerAvailable,
    discountPercent
  } = sellingbook;

  // 🔥 Discount calculation (React side)
  const discountedPrice = offerAvailable
    ? (price - (price * discountPercent) / 100).toFixed(2)
    : price;

  return (
    <div className="card bg-base-100 shadow-lg rounded-xl w-80 relative">

      {/* 🔴 Discount Badge */}
      {offerAvailable && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-md font-bold px-4 py-2 rounded-full z-10">
          {discountPercent}% OFF
        </span>
      )}

      <figure>
        <img src={image} className="h-64 w-48 mt-6" alt={title} />
      </figure>

      <div className="card-body">

        <div className="flex justify-between items-center gap-3">
          <h2 className="card-title text-lg font-bold">{title}</h2>
          <span
            className={`text-sm font-bold ${
              availability === "In Stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {availability}
          </span>
        </div>

        <p className="text-sm text-gray-700">Author: {author}</p>
        <p className="text-sm font-semibold">Rating: {rating}⭐</p>

        {/* 💲 Price Section */}
        <div className="mt-1">
          {offerAvailable ? (
            <div className="flex items-center gap-2">
              <span className="text-md font-semibold"> Price: </span>
              <span className="text-sm line-through text-gray-500">
                ${price}
              </span>
              <span className="text-md font-semibold">
                ${discountedPrice}
              </span>
            </div>
          ) : (
            <p className="text-md font-semibold">Price: ${price}</p>
          )}
        </div>

        <div className="flex mt-4 gap-2">

          {/* Add to Cart */}
          <button
            className={`basis-2/3 px-4 py-2 rounded-lg border-2 font-bold 
              bg-[#f7f5f4] border-[#664932] text-[#664932]
              transition-all duration-300 
              ${
                availability === "In Stock"
                  ? "hover:bg-[#664932] hover:text-[#f7f5f4]"
                  : "blur-[1px] opacity-60 cursor-not-allowed"
              }`}
            disabled={availability !== "In Stock"}
            onClick={() => addToCart(sellingbook)}
          >
            Add to Cart
          </button>

          {/* Details Button */}
          <button
            className="flex-1 px-4 py-2 rounded-lg border-2 font-bold 
              bg-[#f7f5f4] border-[#664932] text-[#664932]
              transition-all duration-300
              hover:bg-[#664932] hover:text-[#f7f5f4]"
            onClick={() =>
              document.getElementById(`modal_${id}`).showModal()
            }
          >
            Details
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id={`modal_${id}`} className="modal backdrop-blur-sm">
        <div className="modal-box max-w-5xl py-24">
          <div className="flex flex-col md:flex-row gap-6 items-center">

            <div className="md:w-1/3 flex justify-center">
              <img
                src={image}
                alt={title}
                className="w-40 md:w-56 rounded-lg"
              />
            </div>

            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-4xl font-bold mb-2">{title}</h3>
              <p className="text-2xl text-gray-600 mb-2">
                Author: {author}
              </p>
              <p className="text-lg leading-relaxed">{details}</p>

              <div className="modal-action justify-center md:justify-start mt-4">
                <form method="dialog">
                  <button
                    className="px-6 py-2 rounded-lg border-2 font-bold 
                      bg-[#f7f5f4] border-[#664932] text-[#664932]
                      transition-all duration-300
                      hover:bg-[#664932] hover:text-[#f7f5f4]"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BuyBook;
