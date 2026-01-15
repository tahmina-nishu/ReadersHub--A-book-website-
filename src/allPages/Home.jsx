import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const sectionsRef = useRef({}); // section scroll refs

    useEffect(() => {
        fetch("/sellingBooks.json")
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((err) => console.error(err));
    }, []);

    const scrollToSection = (section) => {
        if (sectionsRef.current[section]) {
        sectionsRef.current[section].scrollIntoView({ behavior: "smooth" });
        }
    };

    // Slides / Banner
    const slides = [
        {
        title: "Welcome to Readers Hub",
        description:
            "Explore thousands of amazing books across all genres, from fiction to self-help, fantasy to historical, and much more. Find your next favorite read with us!",
        button: "Explore More",
        image: "/slide1.png",
        buttonAction: () => scrollToSection("New Arrivals"),
        },
        {
        title: "Exclusive Book Offers!",
        description:
            "Get your favorite books at amazing discounts. Discover limited-time offers on popular titles, including bestsellers and new arrivals.",
        button: "See Offers",
        image: "/slide2.png",
        buttonAction: () => scrollToSection("Special Offers"),
        },
        {
        title: "New Arrivals",
        description:
            "Discover the latest books added this month. From trending novels to insightful non-fiction, our new arrivals section brings fresh stories and ideas right to you.",
        button: "Browse Now",
        image: "/slide3.png",
        buttonAction: () => scrollToSection("New Arrivals"),
        },
        {
        title: "Best Sellers",
        description:
            "Check out the most loved books by readers worldwide. Browse our bestsellers collection and find highly-rated books across different categories.",
        button: "View Collection",
        image: "/slide4.png",
        buttonAction: () => scrollToSection("Best Sellers"),
        },
    ];

    const [current, setCurrent] = useState(0);
    const slideInterval = useRef(null);

    useEffect(() => {
        slideInterval.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(slideInterval.current);
    }, );

    // Helper to render sections
    const renderSection = (title, items, icon, sectionKey) => (
        <div
        ref={(el) => (sectionsRef.current[sectionKey] = el)}
        className="my-16"
        >
        <h2 className="flex items-center justify-center text-4xl font-bold mt-10 mb-6">
            {icon && <img src={icon} alt={title} className="mr-3 h-16 w-16" />}
            {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((book) => (
            <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow-lg transition"
            >
                <img
                src={book.image}
                alt={book.title}
                className="h-40 w-full object-contain mb-4"
                />
                <h3 className="font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <p className="font-bold mt-2">${book.price}</p>
            </div>
            ))}
        </div>
        </div>
    );

    // Offers Section
    const renderOffers = () => {
        const offerBooks = books.filter((book) => book.offerAvailable);
        if (!offerBooks.length) return null;

        return (
        <div
            ref={(el) => (sectionsRef.current["Special Offers"] = el)}
            className="my-16"
        >
            <h2 className="flex items-center justify-center text-3xl font-bold mb-6">
            <img
                src="https://img.icons8.com/color/48/sale.png"
                className="mr-3 h-10 w-10"
                alt="offer"
            />
            Special Offers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {offerBooks.map((book) => {
                const offerPrice = (
                (book.price * (100 - book.discountPercent)) /
                100
                ).toFixed(2);
                return (
                <div
                    key={book.id}
                    className="bg-white p-4 rounded-lg relative shadow-xl transition"
                >
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {book.discountPercent}% OFF
                    </div>
                    <img
                    src={book.image}
                    alt={book.title}
                    className="h-40 w-full object-contain mb-4"
                    />
                    <h3 className="font-semibold mb-2">{book.title}</h3>
                    <div className="flex justify-between items-center">
                    <span className="line-through text-gray-400">${book.price}</span>
                    <span className="font-bold text-green-600">${offerPrice}</span>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        );
    };

    if (books.length === 0)
        return <p className="text-center mt-10">Loading...</p>;

    return (
        <div>
        {/* Banner */}
        <div className="relative w-screen overflow-hidden h-[500px] bg-stone-200">
            <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${current * 100}vw)` }}
            >
            {slides.map((slide, idx) => (
                <div
                key={idx}
                className="shrink-0 w-screen flex items-center justify-between px-6 md:px-20 h-full relative"
                >
                {/* Left Text */}
                <div className="md:w-1/2 flex flex-col justify-center space-y-4 text-left relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#664932]">
                    {slide.title}
                    </h1>
                    <p className="text-base md:text-lg leading-relaxed text-[#4b2e2a]">
                    {slide.description}
                    </p>
                    <button
                    onClick={slide.buttonAction}
                    className="w-36 py-2 rounded-lg font-bold bg-[#664932] text-[#f7f5f4] hover:opacity-90 transition-all"
                    >
                    {slide.button}
                    </button>
                </div>
                {/* Right Image */}
                <div className="md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0 relative z-10">
                    <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full max-w-md h-auto object-cover"
                    />
                </div>
                </div>
            ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {slides.map((_, idx) => (
                <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                    idx === current ? "bg-[#664932]" : "bg-gray-400"
                }`}
                ></button>
            ))}
            </div>
        </div>

        {/* Sections */}
        <div className="container mx-auto px-4">
            {renderSection(
            "New Arrivals",
            books.slice(0, 4),
            "https://img.icons8.com/color/48/new.png",
            "New Arrivals"
            )}
            {renderSection(
            "Best Selling Books",
            books.slice(4, 8),
            "https://img.icons8.com/color/48/book.png",
            "Best Sellers"
            )}
            {renderSection(
            "Top Rated",
            books.slice(8, 12),
            "https://img.icons8.com/color/48/star.png",
            "Top Rated"
            )}
            {renderOffers()}
        </div>
        </div>
    );
    };

export default Home;
