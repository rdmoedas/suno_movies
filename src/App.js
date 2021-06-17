import './App.css';
import { useEffect, useState } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import Focus from './components/Focus';
import SectionHeader from './components/SectionHeader';
import Footer from './components/Footer';

import movieService from './services/movieDb';

function App() {
  const imgPath = 'https://image.tmdb.org/t/p/w300/';
  const [searchTab, setSearchTab] = useState(false);
  const [searchMovie, setSearchMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  const [bestMovies, setBestMovies] = useState([]);
  // const [genreList, setGenreList] = useState([]);
  const [arrStart, setArrStart] = useState(0);
  const [arrEnd, setArrEnd] = useState(4);
  const [arrEndBestM, setArrEndBestM] = useState(7);
  const [toogleList, setToogleList] = useState('grid')
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const [focusMovie, setFocusMovie] = useState(null);

  // const moviesGenreList = async () => { 
  //   const list = await movieService.getGenreList();
  //   setGenreList(list)
  //   return genreList
  // }

  useEffect(() => {
    const callApi = async () => {
      try {
        setFetching(true);
        const moviesApi = await movieService.getMovies();
        setMovies(moviesApi.results);
        setFetching(false);  
      } catch (error) {
        setError('Não foi possivel carregar os dados, por favor tente novamente.')
        setFetching(false);  
      }
    }
    const callApiBestMovies = async () => {
      try {
        setFetching(true);
        const bestMoviesApi = await movieService.getBestMovies();
        setBestMovies(bestMoviesApi.results);
        setFetching(false);  
      } catch (error) {
        setError('Não foi possivel carregar os dados, por favor tente novamente.')
        setFetching(false);  
      }
    }
    callApi();
    callApiBestMovies();
  }, []);

  function nextMovie() {
    if(arrEnd === movies.length) {
      setArrEnd(4);
      setArrStart(0);
    } else {
      setArrEnd(arrEnd + 1);
      setArrStart(arrStart + 1);
    }
  }

  function previousMovie() {
    if(arrStart === 0) {
      setArrStart(movies.length - 4);
      setArrEnd(movies.length);
    } else {
      setArrStart(arrStart - 1);
      setArrEnd(arrEnd - 1);
    }
  }

  function loadMoreMovies() {
    if(arrEndBestM < 19) {
      setArrEndBestM(arrEndBestM + 6);
    }
  }

  function toogleCatalog() {
    if(toogleList === 'grid') {
      setToogleList('list');
  } else {
      setToogleList('grid');
  }
  }

  return (
    <div className="App">
      <Header searchTab={searchTab} setSearchTab={setSearchTab}/>
      {searchTab !== false && <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>}
      {focusMovie !== null ? <Focus focusMovie={focusMovie}/> : 
      <>
      <div className="background">



        <div className="carousel container">
        <i className="fas fa-chevron-left arrow" onClick={previousMovie}></i>
          {fetching === true && 'Loading...'}
          {error !== null && error}
          {error === null && fetching === false && movies.slice(arrStart, arrEnd).map( (item)=>{
            return(
            <div className="carousel-card" key={item.id}>
              <img src={imgPath + item.poster_path} alt="" onClick={ () => {setFocusMovie(item.id)} }/>
              <div className="movie-title">{
                (item.title.length < 20) ? item.title : item.title.slice(0, 16) + '...'
              }</div>
              <div className="movie-genre">{item.genre_ids}
              </div>
              <div className="movie-vote"><i className="fas fa-star purple-star"></i>{item.vote_average}</div>
            </div>
            )
            })}
        <i className="fas fa-chevron-right arrow" onClick={nextMovie}></i>
        </div>
      </div>
      <SectionHeader/>
      <div className="catalog-section">
        <div className="container flex">
            <div className="tabs">
              <div>
                <button className="button-list"><i className="fas fa-chevron-down arrow-d"></i>por gênero</button>
                <button className="button-filter active-button">mais populares</button>
              </div>
              <button className="button-list" onClick={toogleCatalog}><i className="fas fa-chevron-down arrow-d" ></i>em lista</button>
            </div>
            <div className="movie-catalog"> 
              {fetching === true && 'Loading...'}
              {error !== null && error}
              {error === null && fetching === false && bestMovies.slice(1, arrEndBestM).map( (item)=>{
                return(
                <div  key={item.id} className={toogleList === "grid" ? "movie-card movie-card-width" : "movie-card"}>
                  <img src={imgPath + item.poster_path} onClick={ () => {setFocusMovie(item.id)} }  alt="" />
                  <div className="card-content">
                    <div className="movie-title">{item.title}</div>
                    <div className="movie-genre">{item.genre_ids}</div>
                    <div className="movie-vote"><i className="fas fa-star purple-star"></i>{item.vote_average}</div>
                    <div className="movie-description">{item.overview}</div>
                  </div>
                </div>
                )
                })
              }
              <button className="button-more" onClick={loadMoreMovies}>carregar mais</button>
            </div>
        </div>
      </div>
      </>
      }
        <Footer/>
    </div>
  );
}

export default App;
