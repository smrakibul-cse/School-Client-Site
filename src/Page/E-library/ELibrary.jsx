import React, { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from '../../Navber/NavBar';

const ELibrary = () => {
    const axiosPublic = useAxiosPublic();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosPublic.get('/bookCollection');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [axiosPublic]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortToggle = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const filteredBooks = search
        ? books.filter(book => book.class === search)
        : books;

    const sortedBooks = filteredBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.class.localeCompare(b.class);
        } else {
            return b.class.localeCompare(a.class);
        }
    });

    return (
        <div>
            <NavBar></NavBar>
            <div className="">
                <h1 className="text-2xl text-center border rounded-lg mt-4 bg-[#382b56] text-white mb-6 p-2 font-bold md:w-96 w-full mx-auto">
                    E-Library
                </h1>

                <div className='flex justify-center items-center gap-2 mb-4'>
                    <label className='font-bold'>Search by class</label>
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search by class (e.g., 6)"
                            value={search}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border-2 rounded-md w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className='flex justify-center items-center mb-4'>
                    <button
                        onClick={handleSortToggle}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sort by Class ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                    </button>
                </div>

                <div className='container p-4 mx-auto'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sortedBooks.length > 0 ? (
                            sortedBooks.map((book) => (
                                <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-2">{book['book-name']}</h2>
                                        <p className="text-gray-700 mb-4 font-bold">Class: {book.class}</p>
                                        <a
                                            href={book.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        >
                                            View Book
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center font-bold flex mx-auto justify-center text-red-600">
                                No books found for this class
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ELibrary;
