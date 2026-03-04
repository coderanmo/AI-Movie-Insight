import { useState } from 'react';
import { useRouter } from 'next/navigation';

const IMDB_REGEX = /^tt\d{7,8}$/;

export function useMovieSearch() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const validate = (id: string): boolean => {
        if (!id.trim()) {
            setError('Please enter an IMDb ID.');
            return false;
        }
        if (!IMDB_REGEX.test(id.trim())) {
            setError('Invalid format. Must be like tt0133093 (tt + 7-8 digits).');
            return false;
        }
        setError('');
        return true;
    };

    const search = () => {
        if (validate(query)) {
            router.push(`/movie/${query.trim()}`);
        }
    };

    return { query, setQuery, error, setError, search };
}
