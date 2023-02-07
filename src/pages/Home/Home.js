import React from "react"
import { useState, useEffect } from "react"
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MovieList from "../../components/movieList/movieList";
import { Link } from "react-router-dom"


const Home = () =>{

    const [ popularMovies, setPopularMovies] = useState([])

    useEffect( ()=>{
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    } , [])

    return (
        <>
            
            <div className="poster">
                <Carousel showThumbs={false} autoPlay={true} transitionTime={3} infiniteLoop={true} showStatus={false}>

                    {
                        
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none", color:"white"}} to={`/movie/${movie.id}`} >
                                <div>
                                    <div className="posterImage">
                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                                    </div>
                                    
                                    <div className="posterImageOverlay">
                                        <div className="posterImageTitle">
                                            { movie ? movie.original_title: ""}
                                        </div>
                                        <div className="posterImageRuntime">
                                            {movie ? movie.release_date : ""}
                                            <span className="posterImage_rating">
                                                {movie ? movie.vote_average : ""}
                                                <i className="fas fa-star " /> {" "}
                                            </span>
                                        </div>
                                        <div className="posterImage_description">
                                            {movie ? movie.overview : ""}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }

                </Carousel>

                {
                    <MovieList />
                }

               
            </div>

        </>
    )
}

export default Home