import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="carousel w-full h-[500px] bg-white shadow-md">

                {/* Slide 1  */}
                <div id="slide1" className="carousel-item relative w-full px-20">
                    
                    <div className="flex w-full h-full items-center justify-between px-10">

                    <div className="w-1/2 text-left space-y-4">
                        <h1 className="text-4xl font-bold text-[#664932]">Welcome to Readers Hub</h1>
                        <p className="text-lg text-[#664932]">
                        Explore thousands of amazing books across categories.
                        </p>
                        <button className="btn bg-[#664932] text-[#d8c8b9] border-none">
                        Explore More
                        </button>
                    </div>

                    <div className="w-1/2 flex justify-end">
                        <img
                        src="/public/slide1.png"
                        className="h-[400px] object-cover"
                        />
                    </div>

                    </div>

                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>

                </div>


                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full">
                    
                    <div className="flex w-full h-full items-center justify-between px-10">

                    <div className="w-2/3 space-y-4">
                        <h1 className="text-4xl font-bold text-[#664932]">Slide 2 Title</h1>
                        <p className="text-lg text-[#664932]">Slide 2 description goes here...</p>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <img
                        src="https://example.com/image2.jpg"
                        className="h-[400px] object-cover rounded-xl shadow-lg"
                        />
                    </div>

                    </div>

                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>

                </div>

</div>

        </div>
    );
};

export default Home;