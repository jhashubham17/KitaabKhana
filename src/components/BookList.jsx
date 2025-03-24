const BookList = ({ books, handleSelectBook }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book, index) => (
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
              {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
            </p>

            <div className="flex justify-between items-center">
              {book.volumeInfo?.publishedDate && (
                <p className="text-gray-500 text-xs">
                  {new Date(book.volumeInfo.publishedDate).getFullYear()}
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
  );
};
