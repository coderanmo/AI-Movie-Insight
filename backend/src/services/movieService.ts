import axios from 'axios';
import { config } from '../config/env';

const OMDB_API_URL = 'https://www.omdbapi.com/';

// Rich mock data — fallback when OMDb API key is invalid/missing
const MOCK_MOVIES: Record<string, any> = {
    'tt0133093': {
        Title: 'The Matrix', Year: '1999', imdbRating: '8.7',
        Plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
        Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVlLTM5YTUtZjVmNjhlM2U4ZGY4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0816692': {
        Title: 'Interstellar', Year: '2014', imdbRating: '8.7',
        Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        Actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0111161': {
        Title: 'The Shawshank Redemption', Year: '1994', imdbRating: '9.3',
        Plot: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
        Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NiYyLTg3MzMtYTJmNjg3Nzk5MzMzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0468569': {
        Title: 'The Dark Knight', Year: '2008', imdbRating: '9.0',
        Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt4154796': {
        Title: 'Avengers: Endgame', Year: '2019', imdbRating: '8.4',
        Plot: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        Actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt1375666': {
        Title: 'Inception', Year: '2010', imdbRating: '8.8',
        Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0145487': {
        Title: 'Spider-Man 2', Year: '2004', imdbRating: '7.5',
        Plot: 'Peter Parker is beset with troubles in his failing personal life as he battles a brilliant scientist named Doctor Otto Octavius.',
        Actors: 'Tobey Maguire, Kirsten Dunst, Alfred Molina, James Franco',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmYwNWZmNjMyZjU3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0 BlackBerry': {
        Title: 'Pulp Fiction', Year: '1994', imdbRating: '8.9',
        Plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        Actors: 'John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0108052': {
        Title: "Schindler's List", Year: '1993', imdbRating: '9.0',
        Plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        Actors: 'Liam Neeson, Ralph Fiennes, Ben Kingsley, Caroline Goodall',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNDE4OTEyNzAtNGFkYS00NzE5LTgwMzUtNzFkZTM2YWJlNDYxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0110912': {
        Title: 'Pulp Fiction', Year: '1994', imdbRating: '8.9',
        Plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        Actors: 'John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0137523': {
        Title: 'Fight Club', Year: '1999', imdbRating: '8.8',
        Plot: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
        Actors: 'Brad Pitt, Edward Norton, Meat Loaf, Zach Grenier',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        Response: 'True'
    },
    'tt0076759': {
        Title: 'Star Wars: Episode IV - A New Hope', Year: '1977', imdbRating: '8.6',
        Plot: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire\'s world-destroying battle station.',
        Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
        Poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhivTUtZWIzOC00MjA0LTgwMTgtOTIxNTIwMzE4ZTM2XkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
        Response: 'True'
    },
};

export const fetchMovieData = async (imdbId: string) => {
    // Try OMDb API first if key is provided
    if (config.omdbApiKey) {
        try {
            const response = await axios.get(OMDB_API_URL, {
                params: { i: imdbId, apikey: config.omdbApiKey, plot: 'full' }
            });

            if (response.data.Response === 'True') {
                return response.data;
            }
        } catch (error: any) {
            console.warn(`OMDb API failed (${error.response?.status || error.message}), trying fallback...`);
        }
    }

    // Fallback to mock data
    const mockData = MOCK_MOVIES[imdbId];
    if (mockData) {
        console.log(`Using mock data for ${imdbId}`);
        return mockData;
    }

    throw {
        status: 404,
        message: `Movie not found. Your OMDb key is invalid. Try one of these: tt0133093 (Matrix), tt0816692 (Interstellar), tt0111161 (Shawshank), tt0468569 (Dark Knight), tt4154796 (Endgame), tt1375666 (Inception), tt0145487 (Spider-Man 2)`
    };
};
