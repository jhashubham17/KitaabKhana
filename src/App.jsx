import React, { useState, useEffect } from "react";

const BookExplorer = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({
    maxResults: 20,
    startIndex: 0,
    orderBy: "relevance",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("programming"); // Default genre
  const [popularBooks, setPopularBooks] = useState([]);
  const [showPopularBooks, setShowPopularBooks] = useState(true);

  // Genre options
  const genres = [
    { label: "Programming", value: "programming" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Science Fiction", value: "science fiction" },
    { label: "Mystery & Thriller", value: "mystery" },
    { label: "Horror", value: "horror" },
    { label: "Romance", value: "romance" },
    { label: "Adventure", value: "adventure" },
    { label: "Historical Fiction", value: "historical fiction" },
    { label: "Dystopian", value: "dystopian" },
    { label: "Literary Fiction", value: "literary fiction" },
    { label: "Biography", value: "biography" },
    { label: "Self-Help", value: "self-help" },
    { label: "Science & Technology", value: "science" },
    { label: "History", value: "history" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Business", value: "business" },
    { label: "Travel", value: "travel" },
    { label: "Cooking", value: "cooking" },
    { label: "Children's Books", value: "children" },
    { label: "Young Adult", value: "young adult" },
    { label: "Adult Books", value: "adult" },
  ];

  // Load initial popular books on mount
  useEffect(() => {
    fetchPopularBooks();
    fetchBooks(selectedGenre);
  }, []);

  // Fetch popular books
  const fetchPopularBooks = async () => {
    setLoading(true);
    setError(null);

    // These are generally popular books
    const popularQueries = ["bestseller", "most read", "top rated"];
    const randomQuery =
      popularQueries[Math.floor(Math.random() * popularQueries.length)];

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          randomQuery
        )}&maxResults=${filters.maxResults}&orderBy=relevance`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular books");
      }

      const data = await response.json();
      setPopularBooks(data.items || []);
      setLoading(false);
    } catch (err) {
      setError(
        "An error occurred while fetching popular books. Please try again."
      );
      setLoading(false);
    }
  };

  const fetchBooks = async (searchTerm, newSearch = true) => {
    if (!searchTerm) return;

    setShowPopularBooks(false);

    if (newSearch) {
      setFilters((prev) => ({ ...prev, startIndex: 0 }));
    }

    setLoading(true);
    setError(null);

    const startIndex = newSearch ? 0 : filters.startIndex;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchTerm
        )}&maxResults=${filters.maxResults}&startIndex=${startIndex}&orderBy=${
          filters.orderBy
        }`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      if (newSearch) {
        setBooks(data.items || []);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]);
      }

      setFilters((prev) => ({
        ...prev,
        startIndex: startIndex + filters.maxResults,
      }));

      setLoading(false);
    } catch (err) {
      setError("An error occurred while fetching books. Please try again.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchBooks(query, true);
    }
  };

  const handleLoadMore = () => {
    if (showPopularBooks) {
      // Load more popular books
      setFilters((prev) => ({
        ...prev,
        startIndex: prev.startIndex + prev.maxResults,
      }));
      fetchPopularBooks();
    } else {
      // Load more genre-specific or search results
      fetchBooks(query || selectedGenre, false);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  const handleClearBook = () => {
    setSelectedBook(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    if (showPopularBooks) {
      fetchPopularBooks();
    } else {
      fetchBooks(query || selectedGenre, true);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setQuery(""); // Clear search query when switching genres
    setShowPopularBooks(false);
    // The useEffect will trigger the fetch
    fetchBooks(genre, true);
  };

  const handleHomeClick = () => {
    handleClearBook();
    setShowPopularBooks(true);
    setQuery("");
    fetchPopularBooks();
  };

  // Get the current display books (either popular or genre/search results)
  const displayBooks = showPopularBooks ? popularBooks : books;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={handleHomeClick}
            >
              Book Explorer
            </h1>

            <form onSubmit={handleSearch} className="w-full md:w-1/2 lg:w-2/5">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for books..."
                  className="w-full pl-4 pr-12 py-3 rounded-full shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-indigo-700 hover:bg-indigo-800 transition-colors duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow">
            <p>{error}</p>
          </div>
        )}

        {selectedBook ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <button
                onClick={handleClearBook}
                className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition-colors"
              >
                ← Back to results
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 lg:w-1/4 flex justify-center">
                  <div className="w-56 h-80 flex items-center justify-center bg-gray-100 rounded shadow">
                    {selectedBook.volumeInfo?.imageLinks?.thumbnail ? (
                      <img
                        src={selectedBook.volumeInfo.imageLinks.thumbnail.replace(
                          "http:",
                          "https:"
                        )}
                        alt={selectedBook.volumeInfo.title}
                        className="max-h-full max-w-full object-contain shadow"
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        No image available
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3 lg:w-3/4">
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedBook.volumeInfo?.title}
                  </h2>

                  {selectedBook.volumeInfo?.subtitle && (
                    <p className="text-xl text-gray-600 mb-4">
                      {selectedBook.volumeInfo.subtitle}
                    </p>
                  )}

                  <div className="mb-6">
                    <p className="text-lg mb-1">
                      {selectedBook.volumeInfo?.authors?.join(", ") ||
                        "Unknown Author"}
                    </p>
                    <p className="text-gray-600">
                      {selectedBook.volumeInfo?.publisher &&
                        `${selectedBook.volumeInfo.publisher}`}
                      {selectedBook.volumeInfo?.publishedDate &&
                        selectedBook.volumeInfo?.publisher &&
                        " • "}
                      {selectedBook.volumeInfo?.publishedDate &&
                        `Published: ${selectedBook.volumeInfo.publishedDate}`}
                    </p>
                  </div>

                  {selectedBook.volumeInfo?.description && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">
                        Description
                      </h3>
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: selectedBook.volumeInfo.description,
                        }}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedBook.volumeInfo?.categories && (
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Categories
                        </h4>
                        <p>{selectedBook.volumeInfo.categories.join(", ")}</p>
                      </div>
                    )}

                    {selectedBook.volumeInfo?.pageCount && (
                      <div>
                        <h4 className="font-semibold text-gray-800">Pages</h4>
                        <p>{selectedBook.volumeInfo.pageCount}</p>
                      </div>
                    )}

                    {selectedBook.volumeInfo?.averageRating && (
                      <div>
                        <h4 className="font-semibold text-gray-800">Rating</h4>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <=
                                  Math.round(
                                    selectedBook.volumeInfo.averageRating
                                  )
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2">
                            {selectedBook.volumeInfo.averageRating}/5
                            {selectedBook.volumeInfo.ratingsCount &&
                              ` (${selectedBook.volumeInfo.ratingsCount} ratings)`}
                          </span>
                        </div>
                      </div>
                    )}

                    {selectedBook.volumeInfo?.language && (
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Language
                        </h4>
                        <p>{selectedBook.volumeInfo.language.toUpperCase()}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {selectedBook.volumeInfo?.previewLink && (
                      <a
                        href={selectedBook.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow transition-colors"
                      >
                        Preview
                      </a>
                    )}

                    {selectedBook.saleInfo?.buyLink && (
                      <a
                        href={selectedBook.saleInfo.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow transition-colors"
                      >
                        Buy
                      </a>
                    )}

                    {selectedBook.volumeInfo?.infoLink && (
                      <a
                        href={selectedBook.volumeInfo.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition-colors"
                      >
                        More Info
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">
                {query
                  ? `Results for "${query}"`
                  : showPopularBooks
                  ? "Most Popular Books"
                  : `Popular ${selectedGenre} Books`}
              </h2>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowPopularBooks(true);
                  fetchPopularBooks();
                }}
                className={`px-4 py-2 rounded-full transition-colors mr-2 ${
                  showPopularBooks
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Most Read Books
              </button>
              <button
                onClick={() => {
                  setShowPopularBooks(false);
                  fetchBooks(selectedGenre, true);
                }}
                className={`px-4 py-2 rounded-full transition-colors ${
                  !showPopularBooks
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Browse by Genre
              </button>
            </div>

            {/* Genre Selection - Only show when not in popular books mode */}
            {!showPopularBooks && (
              <div className="flex flex-wrap gap-2 mb-6">
                {genres.map((genre) => (
                  <button
                    key={genre.value}
                    onClick={() => handleGenreChange(genre.value)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedGenre === genre.value
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            )}

            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Results per page
                    </label>
                    <select
                      name="maxResults"
                      value={filters.maxResults}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Sort by</label>
                    <select
                      name="orderBy"
                      value={filters.orderBy}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={applyFilters}
                      className="w-full p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading && displayBooks.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-xl text-gray-600">Loading books...</div>
              </div>
            ) : displayBooks.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">No books found</h3>
                <p className="text-gray-600">
                  Try different search terms or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayBooks.map((book, index) => (
                  <div
                    key={book.id || index}
                    onClick={() => handleSelectBook(book)}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-2 relative">
                      {book.volumeInfo?.imageLinks?.thumbnail ? (
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail.replace(
                            "http:",
                            "https:"
                          )}
                          alt={book.volumeInfo.title}
                          className="h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-center p-4">
                          No image available
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 line-clamp-2 mb-1">
                        {book.volumeInfo?.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-1 mb-2">
                        {book.volumeInfo?.authors?.join(", ") ||
                          "Unknown Author"}
                      </p>

                      <div className="flex justify-between items-center">
                        {book.volumeInfo?.publishedDate && (
                          <p className="text-gray-500 text-xs">
                            {new Date(
                              book.volumeInfo.publishedDate
                            ).getFullYear()}
                          </p>
                        )}

                        {book.volumeInfo?.averageRating && (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-xs text-gray-600">
                              {book.volumeInfo.averageRating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && displayBooks.length > 0 && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More Books"}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Book Explorer</h2>
              <p className="text-gray-400">Find your next favorite book</p>
            </div>

            <div className="text-center md:text-right">
              <p className="mb-2">Powered by Google Books API</p>
              <a
                href="https://developers.google.com/books"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookExplorer;
