import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import { URL_API, API } from "../utils/constants";

import SliderMovies from "../components/SliderMovies";

import { Row, Col } from "antd";

import MovieList from "../components/MovieList";

import Footer from "../components/Footer";

const Home = () => {
  const [peliculas, guardarPeliculas] = useState([]);

  // le pasamos parámetros
  const movies = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=2e0330200e928cadbc15cf3a8a2328dc&language=en-ES&page=1"
  );

  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1`
  );

  // Popular
  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=1`
  );

  // Top Rated
  const topRatedMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${API}&language=es-ES&page=1`
  );

  console.log(newMovies);

  return (
    <div>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MovieList title="Películas Populares" movies={popularMovies} />
        </Col>
        <Col span={12}>
          <MovieList
            title="Mejores Películas Puntuadas"
            movies={topRatedMovies}
          />
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default Home;
