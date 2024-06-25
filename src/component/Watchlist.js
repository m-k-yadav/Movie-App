import React from "react";

const Watchlist=({watchlist, removeFromWatchlist})=>{

    return (
        <div>
            <h1 className="text-2xl m-5 font-bold text-center mb-8">My WatchList</h1>
            <div className="flex flex-wrap justify-evenly gap-8">
                {watchlist.length > 0 ? (
                    watchlist.map((movie)=>(
                        <div key={movie.id} className="w-[200px] h-[40vh] rounded-xl flex flex-col items-center m-8">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-[200px] h-[40vh] rounded-xl"
                            />
                            <button
                                onClick={()=>removeFromWatchlist(movie.id)}
                                className="top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:scale-110 duration-200 mt-1"
                            > Remove 
                            </button>
                            <div className="text-black font-bold text-center p-2 rounded-b-lg w-full">
                                {movie.title}
                            </div>
                        </div>
                    ))
                ):(
                    <div className="text-center font-bold text-xl">
                        No Movie in the WatchList ... 
                    </div>
                )}
            </div>

        </div>
    );
}
export default Watchlist;