import './App.css';
import NavBar from './component/Navbar';
import Banner from './component/Banner';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Watchlist from './component/Watchlist';
import { Fragment, useState, useEffect } from 'react';
import Movie from './component/Movie';
//import Routing from './component/Routing'



function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist =(movie)=>{
    const updateWatchList =[...watchlist, movie];
    setWatchlist(updateWatchList);
    localStorage.setItem('movie', JSON.stringify(updateWatchList))
}

const removeFromWatchlist =(id)=>{
  let filteredWatchList = watchlist.filter(movie => movie.id !== id)
    setWatchlist(filteredWatchList);
    localStorage.setItem('movie', JSON.stringify(filteredWatchList));
}

useEffect(()=>{
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movie'))
  if(moviesFromLocalStorage){
      setWatchlist(moviesFromLocalStorage)
  }
},[]);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Fragment>
              <NavBar/>
              <Movie
                watchlist={watchlist}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            </Fragment>
          }
        ></Route>
        <Route 
          path="/watchlist"
          element={
            <Fragment>
              <NavBar/>
              <Watchlist
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            </Fragment>
          }
          ></Route> 
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routing/>
    // </BrowserRouter>
    
  );
}

export default App;
