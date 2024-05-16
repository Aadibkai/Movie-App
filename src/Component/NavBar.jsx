import React, { useEffect, useState } from "react";
import "./style.css";
import Card from "./Card";

let API_key = "&api_key=59b8536ca46df4b8a5c6741faaf684bb";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];
export const NavBar = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();
  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [url_set]);
  let getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType == "Theatre") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_key;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_key;
    }
    if (movieType == "Comedie") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_key;
    }
    setUrl(url);
  };
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      searchMovie();
    }
  }
  const searchMovie = (e) => {
    e.preventDefault();
    url =
      base_url +
      "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
      search;
    setUrl(url);
    setSearch(" ");
  };
  return (
    <div style={{ position: "sticky" }}>
      <div
        className="Header"
        style={{
          backdropFilter: "blur(20.5px)",
        }}
      >
        <nav>
          <ul>
            {arr.map((value) => {
              return (
                <li style={{ paddingRight: "10px" }}>
                  <a
                    style={{ fontSize: "24px" }}
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search_bar">
            {/* <input
              className="search_bar_input"
              placeholder="Search here"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setSearch(e.target.value);
              }}
               
              onkeypress={(e)=>{
                console.log(777)
                // if (e.key === 'Enter') {
                //   console.log(777)
                //   searchMovie();
                // }
              }}

            /> */}

            <input
              className="search_bar_input"
              placeholder="Search here"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => {

                if (e.key === "Enter") {
                 
                  searchMovie(e);
                  console.log(11)
                }
              }}
            />

            <img
              value={search}
              onClick={searchMovie}
              src="./img/Icon-Wrapper.svg"
              alt=""
              className="search_bar_Icon_Wrapper"
            />
          </div>
        </form>
      </div>
      <div className="Container">
        {movieData.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => <Card info={res} key={pos} />)
        )}
      </div>
    </div>
  );
};
