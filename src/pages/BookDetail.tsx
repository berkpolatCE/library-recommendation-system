import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { getBook } from '@/services/api';
import { Book } from '@/types';
import { formatRating } from '@/utils/formatters';
import { handleApiError } from '@/utils/errorHandling';

/**
 * BookDetail page component
 */
export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBook(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadBook = async (bookId: string) => {
    setIsLoading(true);
    try {
      const data = await getBook(bookId);
      if (!data) {
        navigate('/404');
        return;
      }
      setBook(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Implement add to reading list functionality
  const handleAddToList = () => {
    alert('Add to reading list functionality coming soon!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-ink-light hover:text-burgundy mb-8 transition-colors group glass-effect px-4 py-2 rounded-xl border border-parchment-dark w-fit"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Back</span>
        </button>

        <div className="glass-effect rounded-3xl shadow-warm-2xl border border-parchment-dark overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
            <div className="md:col-span-1">
              <div className="relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full rounded-2xl shadow-warm-2xl group-hover:shadow-glow-gold transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-ink mb-3 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-ink-light mb-6 font-medium">by {book.author}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center bg-gradient-to-r from-gold-pale to-parchment px-4 py-2 rounded-xl border border-gold/30 shadow-sm">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg font-bold text-amber-700">
                    {formatRating(book.rating)}
                  </span>
                </div>

                <span className="badge-gradient px-4 py-2 text-sm">{book.genre}</span>

                <div className="flex items-center text-ink-light bg-parchment-light px-4 py-2 rounded-xl border border-parchment-dark">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold">{book.publishedYear}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-ink mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-burgundy to-burgundy-dark rounded-full mr-3"></span>
                  Description
                </h2>
                <p className="text-ink-light leading-relaxed text-lg">{book.description}</p>
              </div>

              <div className="mb-8 glass-effect p-4 rounded-xl border border-parchment-dark">
                <p className="text-sm text-ink-light">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" onClick={handleAddToList}>
                  <svg
                    className="w-5 h-5 mr-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to Reading List
                </Button>
                <Button variant="outline" size="lg">
                  <svg
                    className="w-5 h-5 mr-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Implement reviews section */}
        <div className="mt-8 glass-effect rounded-3xl shadow-warm-xl border border-parchment-dark p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-ink mb-6 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-burgundy to-burgundy-dark rounded-full mr-3"></span>
            Reviews
          </h2>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-parchment to-parchment-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-burgundy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <p className="text-ink-light text-lg">Reviews section coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
