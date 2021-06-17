const API_URL = 'https://api.themoviedb.org/3';

const movieSelection = '/movie/upcoming';

const genreList = '/genre/movie/list';

const API_KEY = 'ed04dd3b1fc99a01c3ca062587eb0047';

const languageSelection = 'pt-BR'

// 'https://api.themoviedb.org/3/movie/upcoming?api_key=ed04dd3b1fc99a01c3ca062587eb0047&language=pt-BR&page=1'

export default {
    getMovies: async function getMovies() {
        const response = await fetch(`${API_URL}${movieSelection}?api_key=${API_KEY}&language=${languageSelection}&page=1`);
        const responseJson = response.json();
        return responseJson;
    },
    getGenreList: async function getGenreList() {
        const response = await fetch(`${API_URL}${genreList}?api_key=${API_KEY}&language=${languageSelection}`);
        const responseJson = response.json();
        return responseJson;
    },
    getSearch: async function getSearch(search) {
        const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=${languageSelection}&query=${search}&page=1&include_adult=false`);
        const responseJson = response.json();
        return responseJson;
    },
    getMovieById: async function getMovieById(id) {
        const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=${languageSelection}`);
        const responseJson = response.json();
        return responseJson;
    },
    getBestMovies: async function getBestMovies() {
        const response = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=${languageSelection}&page=1`);
        const responseJson = response.json();
        return responseJson;
    }
}