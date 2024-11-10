import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
// import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";


const TitleCards = ({title,category}) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDEzNzA5NWE3MmQ5NjcyOWYxMTBjNjk0ZmFhMDMwNyIsIm5iZiI6MTczMTIyMTM0MC4zMDMxNjczLCJzdWIiOiI2NzMwNTY2NTNjMTA0ZDg4YmRjNWIzOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XI7vyfkTZ58ehE5FkpCracS9BL-3bZW9o0QSUfMj8CM",
    },
  };



  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    //data fetching
      fetch(
        `https://api.themoviedb.org/3/movie/${
          category ? category : 'now_playing'
        }?language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((res) => setApiData(res.results))
        .catch((err) => console.error(err));
    
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);


  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
