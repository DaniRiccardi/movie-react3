import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { URL_API, API } from "../utils/constants";

import useFetch from "../hooks/useFetch";

import Footer from "../components/Footer";

const NewMovies = () => {
  // Lista de películas
  const [movieList, setMovieList] = useState([]);
  // estado paginación
  const [page, setPage] = useState(1);

  // ${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1

  console.log(URL_API);
  console.log(API);

  const response1 = useFetch(
    `${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1`
  );

  //  console.log("response1: ", response1.result.results);

  useEffect(() => {
    // función asíncrona
    (async () => {
      const response = await fetch(
        `${URL_API}/movie/now_playing?api_key=${API}$language=es-ES&page=${page}`
      );

      const movies = await response.json();

      console.log(movies);
      //setMovieList(response1);
      //console.log("response1 a ver: ", response1.result.results);
    })();
  }, [page]);

  //setMovieList(response1);

  /*
  const consultar = async () => {
    const response = await fetch(
      `${URL_API}/movie/now_playing?api_key=${API}$language=es-ES&page=${page}`
    );

    const res = response.json();

    console.log("response: ", response);
  };
  */

  //

  return (
    <Row>
      <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
          últimos lanzamientos
        </h1>
      </Col>
      Cuantas:
      <Col span="24">
        <Row>Todas las películas</Row>
      </Col>
      <Col span="24">
        <Footer />
      </Col>
    </Row>
  );
};

export default NewMovies;
