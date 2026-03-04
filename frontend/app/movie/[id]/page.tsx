import { getMovieDetails } from '@/services/movieService';
import { MovieDetails } from '@/components/MovieDetails';
import { LoaderSkeleton } from '@/components/LoaderSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

// In Next.js 15+, params is now a Promise
interface Props {
    params: Promise<{ id: string }>;
}

// Server Component fetching data
async function MovieDataWrapper({ id }: { id: string }) {
    try {
        const movieData = await getMovieDetails(id);
        return <MovieDetails movie={movieData} />;
    } catch (error: any) {
        return <ErrorMessage message={error.message || 'Error occurred while loading movie data.'} />;
    }
}

// In Next.js 15+, the page component must be async to await params
export default async function MoviePage({ params }: Props) {
    // Await the params Promise to get the actual values
    const { id } = await params;

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/movie/${id}`;

    return (
        <div className="pt-4">
            {/* Back + Share row */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Search
                </Link>

                {/* Copy share link button (handled client-side via script) */}
                <button
                    id="share-btn"
                    onClick={undefined}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-card hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors border shadow-sm font-medium"
                    title="Copy link to clipboard"
                    data-url={shareUrl}
                >
                    <Share2 className="text-purple-500 w-4 h-4" />
                    Share
                </button>
            </div>

            <Suspense fallback={<LoaderSkeleton />}>
                <MovieDataWrapper id={id} />
            </Suspense>

            {/* Inline script to wire up share button on client */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        document.addEventListener('DOMContentLoaded', function() {
                            var btn = document.getElementById('share-btn');
                            if (btn) {
                                btn.addEventListener('click', function() {
                                    var url = btn.getAttribute('data-url');
                                    navigator.clipboard.writeText(url).then(function() {
                                        btn.textContent = '✓ Link Copied!';
                                        setTimeout(function() { btn.innerHTML = '<svg>...</svg> Share'; }, 2000);
                                    });
                                });
                            }
                        });
                    `
                }}
            />
        </div>
    );
}
