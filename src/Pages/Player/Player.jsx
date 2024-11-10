import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDEzNzA5NWE3MmQ5NjcyOWYxMTBjNjk0ZmFhMDMwNyIsIm5iZiI6MTczMTIyMTM0MC4zMDMxNjczLCJzdWIiOiI2NzMwNTY2NTNjMTA0ZDg4YmRjNWIzOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XI7vyfkTZ58ehE5FkpCracS9BL-3bZW9o0QSUfMj8CM",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-2)} />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="90%"
        height="60vh"
        frameBorder="0"
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
