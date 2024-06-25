import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import Banner from './Banner';
import heartImage from '../Assets/heart.png';
import unheartImage from '../Assets/heart (1).png'

function Movie({watchlist, removeFromWatchlist, addToWatchlist}) {
    const [movieList, setMovieList]=useState([]);
    const [currentPageNum, setCurrentPageNum]= useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hoveredMovie, setHoveredMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async()=>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=854e4529dd7a582d98fafd9f4d1076d0&page=${currentPageNum}`);
                const data = await response.json();
                setMovieList(data.results || []);
                setTotalPages(data.total_pages);
               
            }catch(error){
                console.log("error fetching data:", error);
            }
        };
        fetchMovie();
    },[currentPageNum])

    

    const handlePageChange= (page)=>{
        if(page >= 1 && page <= totalPages){
            setCurrentPageNum(page);
        }
    }

    const truncateTitle = (title, maxRequiredLength)=>{
        if(title.length > maxRequiredLength){
            title = title.substr(0, maxRequiredLength)+"...";
        }
        return title;
    }
      
    const isMovieInWatchlist = (id)=>{
        return watchlist.some(movie => movie.id === id);
    }

  return (
    <div>
        <Banner truncateTitle={truncateTitle}/>
        <div className='text-2xl m-5 font-bold text-center'>Trending Movies</div>
        <div className="flex flex-wrap justify-evenly gap-8">
            {movieList.length > 0 ? (
                movieList.map((movies)=>(
                    <div key={movies.id} className={`w-[200px] h-[40vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-200 cursor-pointer flex flex-col items-center 
                        transform ${hoveredMovie === movies.id ? 'scale-110 z-10 m-12' : 'scale-100'} ${hoveredMovie && hoveredMovie !== movies.id ? 'blur-sm' : ''}`}
                        onMouseEnter={() => setHoveredMovie(movies.id)}
                        onMouseLeave={() => setHoveredMovie(null)}
                    >
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                            alt={movies.title}
                            className='w-full h-[40vh] rounded-xl'
                        />

                        <div className='absolute top-2 right-2'>
                                {isMovieInWatchlist(movies.id) ? (
                                    <img
                                        src={heartImage}
                                        alt="heart"
                                        className='rounded-xl w-6 h-6 hover:scale-150 duration-200'
                                        onClick={() => removeFromWatchlist(movies.id)}
                                    />
                                ) : (
                                    <img
                                        src={unheartImage}
                                        alt="unheart"
                                        className='rounded-xl w-6 h-6 hover:scale-150 duration-200'
                                        onClick={() => addToWatchlist(movies)}
                                    />
                                )}
                            </div>

                        <div className='text-black font-bold text-center p-2 rounded-b-lg w-full'>
                            {hoveredMovie === movies.id ? movies.title : truncateTitle(movies.title, 20)}
                        </div>

                    </div>
                    
                ))
            ):(
                <div className="text-center font-bold text-8xl">Loading ....</div>
            )}
        </div>
        <div>
            <Pagination currentPageNum={currentPageNum} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
        {/* <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} /> */}
    </div>
  )
}

export default Movie;