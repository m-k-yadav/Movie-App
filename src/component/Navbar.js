import React from "react";
import MOvieLogo from "../Assets/MOvieLogo.jpg";
import { Link } from "react-router-dom";


function NavBar(){
    return (
        <div className="flex space-x-8 items-center pl-3 py-3 justify-between">

            {/* <a href="/">
                <h2 className="text-blue-400">Movies</h2>
            </a>

            <a href="/watchlist">
                <h2 className="text-blue-400">Watchlist</h2>
            </a> */}
            {/* <a> Anchor Tag causes in reloading of the page 
                hence use LINK tag
            */}

            <div className="flex space-x-8 items-center">
                <Link to="/"><img src={MOvieLogo} className="w-[60px]" alt="logo"/></Link>

                <div className="text-blue-800 space-x-8 text-3xl font-bold">
                    <Link to="/">Home</Link>
                    <Link to="/watchlist">Watchlist</Link>
                </div>
            </div>
            <div className=" cursor-pointer hover: border-2">
                <input type="search" placeholder="Search Movies" className="w-full p-2 pl"/>
            </div>
        </div>
    );
}
export default NavBar;