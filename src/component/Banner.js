import React, { useEffect, useState } from "react";
import JW from "../Assets/JW.jpg"

const Banner = ({truncateTitle})=>{
    const [bannerImage, setBannerImage] =useState("");
    const [bannerText, setBannerText] = useState("");

    const [allData, setAllData]=useState({results:[]});
    const [currentIndex, setCurrentIndex] =useState(0);

    useEffect(()=>{
        const fetchBanner = async()=>{
            try{
                const banner = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=854e4529dd7a582d98fafd9f4d1076d0`)
                const data = await banner.json();
                console.log(data.results)

                setAllData(data || {results:[]})
                console.log(allData);

                const firstMovie=data.results[0];
                setBannerImage (firstMovie.backdrop_path || "");
                setBannerText (firstMovie.title || "");

            }catch(error){
                console.log("we have found an error", error);
            }
        }
        fetchBanner();
    },[])

    useEffect(()=>{
        if(allData.results.length >0){
            const intervalId = setInterval(()=>{
                setCurrentIndex((prevIndex)=>{
                    const newIndex = (prevIndex+1) % allData.results.length;
                    const currentMovie = allData.results[newIndex];
                    setBannerImage(currentMovie.backdrop_path || "");
                    setBannerText(currentMovie.title || "");
                    return newIndex;
                });
            },5000);
            return ()=> clearInterval(intervalId); //clean up the interval on component unmount
        }
    },[allData])
    

    return(
        <div className="h-[75vh] bg-cover bg-center flex items-end"
            style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${bannerImage})`}}
        >
            <div className=" text-5xl font-extrabold bg-gray-800 bg-opacity-30 p-4 w-full text-center text-white ">
                {truncateTitle(bannerText,20)}</div>
        </div>
    );
};
export default Banner;
// banner for the movie app