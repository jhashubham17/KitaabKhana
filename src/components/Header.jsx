const Header = ({ query, setQuery, handleSearch, handleHomeClick }) => {
  return (
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
  );
};
