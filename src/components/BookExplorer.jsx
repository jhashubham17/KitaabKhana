const BookExplorer = () => {
  // State and logic remain the same as in your original code

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleHomeClick={handleHomeClick}
      />

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow">
            <p>{error}</p>
          </div>
        )}

        {selectedBook ? (
          <BookDetails
            selectedBook={selectedBook}
            handleClearBook={handleClearBook}
          />
        ) : (
          <>
            {/* Render filters, genre selection, and book list */}
            {showFilters && (
              <Filters
                filters={filters}
                handleFilterChange={handleFilterChange}
                applyFilters={applyFilters}
              />
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
              <BookList
                books={displayBooks}
                handleSelectBook={handleSelectBook}
              />
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
