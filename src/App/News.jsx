import React, { useEffect, useState } from "react";
import Card from "../Componentes/Card";

const News = () => {
  const [search, setSearch] = useState("estados unidos");
  const [news, setNews] = useState([]);

  const getData = async () => {
    if (!search.trim()) {
      // Si el input está vacío, no hacer la solicitud
      return;
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&language=es&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();

    // Solo actualizar el estado si se recibe una respuesta válida
    if (data.articles) {
      setNews(data.articles);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="news">
      <nav className="nav flex justify-around items-center w-full h-20 bg-blue-900 text-semibold gap-2 ">
        <div>
          <h1 className="font-semibold text-white text-3xl ">Trendy News</h1>
        </div>
        <ul className="flex gap-4 text-white">
          <a>All News</a>
          <a>Trending</a>
        </ul>
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search News"
            className="text-center"
            onChange={handleInput}
          />
          <button
            onClick={getData}
            className="p-1 rounded-lg bg-blue-700 ml-2 px-3 hover:bg-blue-600 text-white"
          >
            Search
          </button>
        </div>
      </nav>
      <div className="flex justify-center item-center mt-4 mb-8 font-semibold text-3xl">
        Keep up with the latest trends.
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 ">
        <button
          onClick={userInput}
          value="sports"
          className="bg-blue-700 p-1 rounded-lg px-8 text-white font-medium hover:bg-blue-600 active:bg-blue-800"
        >
          Sports
        </button>
        <button
          onClick={userInput}
          value="politics"
          className="bg-blue-700 p-1 rounded-lg px-8 text-white font-medium hover:bg-blue-600 active:bg-blue-800"
        >
          Politics
        </button>
        <button
          onClick={userInput}
          value="entertainment"
          className="bg-blue-700 p-1 rounded-lg px-8 text-white font-medium hover:bg-blue-600 active:bg-blue-800"
        >
          Entertainment
        </button>
        <button
          onClick={userInput}
          value="health"
          className="bg-blue-700 p-1 rounded-lg px-8 text-white font-medium hover:bg-blue-600 active:bg-blue-800"
        >
          Health
        </button>
        <button
          onClick={userInput}
          value="fitness"
          className="bg-blue-700 p-1 rounded-lg px-8 text-white font-medium hover:bg-blue-600 active:bg-blue-800"
        >
          Fitness
        </button>
      </div>
      <div>
        {/* Renderiza las noticias solo si hay artículos */}
        {news.length > 0 ? <Card data={news} /> : <p>No news available</p>}
      </div>
    </div>
  );
};

export default News;
