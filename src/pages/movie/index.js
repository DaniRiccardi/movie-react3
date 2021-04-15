import React, { useState } from "react";
import { Row, Col, Button } from "antd";
// para obtener los parametros de la url
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
// Credenciales
import { URL_API, API } from "../../utils/constants";
import Loading from "../../components/Loading";

import ModalVideo from "../../components/ModalVideo";

import "./movie.scss";

const Movie = () => {
  // Obtenemos el id de la peli
  // const params = useParams();
  // console.log(params);

  // const id = params.id

  const { id } = useParams();

  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  );

  console.log("movieInfo: ", movieInfo);

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movieInfo={movieInfo.result} />;
};

export default Movie;

function RenderMovie(props) {
  const {
    movieInfo: { title, backdrop_path, poster_path },
  } = props;

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>

        <Col span={10} className="movie__info">
          <MovieInfo movieInfo={props.movieInfo} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }}></div>;
}

// Otro componente
function MovieInfo(props) {
  // le pasamos toda la pelicula
  const {
    movieInfo: { id, title, release_date, overview, genres },
  } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`
  );

  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  // función para renderizar el botón abrir modal
  // si no tiene video no debe mostrarse el botón

  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            {/*} <button>Ver trailer</button>
            <ModalVideo />*/}
            <Button icon="play-circle" onClick={openModal}>
              Ver Trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}
          <span> {moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>

      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview}</p>

        <h3>Géneros</h3>
        <ul>
          {genres.map((gender) => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
