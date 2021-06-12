import './App.css';

import { useEffect, useState } from 'react';

import Header from './components/Header';

import movieService from './services/movieDb';
// import './section1.jpg';

/*
adult: false
backdrop_path: "/ee83WVGFFihsTRd07j9KIgXFbHF.jpg"
genre_ids: (3) [28, 35, 53]
id: 522931
original_language: "en"
original_title: "Hitman's Wife's Bodyguard"
overview: "O casal estranho mais letal do mundo - o guarda-costas Michael Bryce e o assassino de aluguel Darius Kincaid - está de volta em outra missão com risco de vida. Ainda sem licença e sob escrutínio, Bryce é forçado a entrar em ação pela esposa ainda mais volátil de Darius, a infame vigarista internacional Sonia Kincaid. Enquanto Bryce é levado ao limite por seus dois protegidos mais perigosos, o trio se mete em uma trama global e logo descobre que eles são tudo o que se interpõe entre a Europa e um louco vingativo e poderoso."
popularity: 116.511
poster_path: "/oht9CZHNDBEu5KitgxUsb0LhQ8v.jpg"
release_date: "2021-06-10"
title: "Dupla Explosiva 2"
video: false
vote_average: 8
vote_count: 2
__proto__: Object
*/


function App() {
  const imgPath = 'https://image.tmdb.org/t/p/w300/';

  const [movies, setMovies] = useState([]);
  // const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const callApi = async () => {
      const moviesApi = await movieService.getMovies();
      setMovies(moviesApi.results);
    }
    callApi();
  }, []);

  return (
    <div className="App">
      <Header/>
      <div className="background">
        <div className="container">
          {movies.map( (item)=>{
            return(
            <div>
              {console.log(item)}
              <img src={imgPath + item.poster_path} alt="" />
              <div>{item.title}</div>
              <div>{item.genre_ids}</div>
              <div>{item.vote_average}</div>
            </div>
            )
            })}
        </div>
      </div>

    </div>
  );
}

export default App;
