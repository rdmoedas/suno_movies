import './focus.css';
import { useEffect, useState } from 'react';
import movieService from '../../services/movieDb';


function Focus (props) {
    const imgPath = 'https://image.tmdb.org/t/p/w400/';
    const [selectedMovie, setSelectedMovie] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const Api = async () => {
            try {
                setFetching(true);
                const movie = await movieService.getMovieById(props.focusMovie);
                setSelectedMovie(movie);
                setFetching(false);  
                } catch (error) {
                setError('Não foi possivel carregar os dados, por favor tente novamente.')
                setFetching(false);  
                }
        }
        Api();
    },[])

    return (
        <div className="background">
            <div className="container">
            {fetching === true && 'Loading...'}
            {error !== null && error}
            {error === null && fetching === false && selectedMovie !== undefined && 
                <div className="focus-container">
                    <div>
                    <img src={imgPath + selectedMovie.poster_path} alt="" />
                    </div>
                    <div className="focus-data">
                        <h1>{selectedMovie.title}</h1>
                        <div className="focus-container">
                        {selectedMovie.genres.map((item)=>
                            <div className="genre">
                            {item.name}
                            </div>
                        )}
                        <div className="vote"><i className="fas fa-star purple-star"></i>{selectedMovie.vote_average}</div>
                        </div>
                        <div className="sinopse">Sinopse</div>
                        <div className="overview">{selectedMovie.overview}</div>
                        
                    </div>
                </div>
            
            }
            <div className="trailer-section">
                <a href="/"><button className="button-filter active-button">voltar</button></a>
            </div>
            </div>
        </div>
    )
}

export default Focus;