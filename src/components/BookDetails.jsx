const BookDetails = ({ selectedBook, handleClearBook }) => {
  return (
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
                <h3 className="text-xl font-semibold mb-2">Description</h3>
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
                  <h4 className="font-semibold text-gray-800">Categories</h4>
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
                            Math.round(selectedBook.volumeInfo.averageRating)
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
                  <h4 className="font-semibold text-gray-800">Language</h4>
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
  );
};
