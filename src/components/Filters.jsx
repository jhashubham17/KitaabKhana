const Filters = ({ filters, handleFilterChange, applyFilters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Results per page</label>
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
  );
};
