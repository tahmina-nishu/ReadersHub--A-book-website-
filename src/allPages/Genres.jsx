import React, { useEffect, useState } from "react";
import Genre from "./Genre";

const Genres = () => {
    const [allbooks, setAllbooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Books");

    useEffect(() => {
        fetch("/allBooks.json")
        .then((response) => response.json())
        .then((data) => setAllbooks(data));
    }, []);

    
    useEffect(() => {
        setSelectedCategory("All Books");
    }, []);

    const categories = [
        "All Books",
        "Classic",
        "Fantasy",
        "Horror",
        "Drama",
        "Philosophy",
        "Productivity",
        "Business",
        "Psychology",
        "Finance",
        "Biography",
        "History",
    ];

    const filteredBooks =
        selectedCategory === "All Books"
        ? allbooks
        : allbooks.filter(
            (book) => book.category === selectedCategory
            );

    return (
        <>
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-4 mt-8 mb-10">
    {categories.map((cat) => (
        <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-5 py-2 rounded-full font-semibold transition
            ${
            selectedCategory === cat
                ? "bg-[#5f442e] text-[#f2e7df]"
                : "bg-[#e0cab4] text-[#6f4727]"
            }`}
        >
        {cat}
        </button>
    ))}
    </div>


        <div className="py-10 px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
            {filteredBooks.map((allbook) => (
            <Genre key={allbook.id} allbook={allbook} />
            ))}
        </div>
        </>
    );
};

export default Genres;