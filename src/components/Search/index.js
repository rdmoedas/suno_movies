import './search.css';
import movieDb from '../../services/movieDb';
import { useState } from 'react';

function Search(props){
    
    const imgPath200 = 'https://image.tmdb.org/t/p/w200/';
    const [search, setSearch] = useState("");
    const [busca, setBusca] = useState([]);

    async function filter() {
        const temp = await movieDb.getSearch(search)
        setBusca(temp.results)
        console.log(busca)
    }

    return (
        <div className="search-container">
                <div className="search-box">
                    <input 
                        type="search" 
                        input={search} 
                        onChange={(event) => {
                          setSearch(event.target.value)
                        }}
                        onKeyPress={(event)=>{
                            if(event.key === "Enter"){return filter()}
                        }}
                    />   
                </div>
                { busca.slice(0,1).map( (item) => {
                    return (
                        <div className="search-card">
                            <img src={imgPath200 + item.poster_path} alt="" />
                            <div className="minicard-description">
                                <div className="movie-title">{item.title}</div>
                                <div className="movie-genre">{item.genre_ids}</div>
                                <div className="movie-vote"><i className="fas fa-star purple-star"></i>{item.vote_average}</div>
                            </div>
                        </div>
                    )
                })}

        </div>
    )
}

export default Search;