// Configuración de la API key para producción
import React, { useEffect, useState } from "react";
import Card from "../Componentes/Card";

const News = () => {
  const [search, setSearch] = useState("estados unidos");
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getData = async () => {
    if (!search.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      console.log("Using API Key:", apiKey); // Para verificar la API key

      // Usando el endpoint básico de búsqueda
      const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        search
      )}&lang=es&apikey=${apiKey}`;
      console.log("Request URL:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Full API Response:", data);

      if (response.status === 401 || response.status === 403) {
        const errorMessage = data.errors
          ? Object.values(data.errors)[0]
          : "Error de autenticación con la API";
        console.error("Authentication Error:", errorMessage);
        setError(`Error de API: ${errorMessage}`);
        return;
      }

      if (!response.ok) {
        const errorMessage = data.errors
          ? Object.values(data.errors)[0]
          : "Error desconocido";
        throw new Error(errorMessage);
      }

      if (data.articles && data.articles.length > 0) {
        const transformedArticles = data.articles.map((article) => ({
          title: article.title,
          urlToImage: article.image || "https://via.placeholder.com/300x200",
          url: article.url,
          description: article.description,
        }));
        setNews(transformedArticles);
      } else {
        setError("No se encontraron noticias para esta búsqueda");
        setNews([]);
      }
    } catch (error) {
      console.error("Detailed error:", error);
      setError(`Error: ${error.message}`);
      setNews([]);
    } finally {
      setLoading(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="news min-h-screen bg-gray-100">
      <nav className="nav bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo y título */}
            <div className="flex items-center">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
                Trendy News
              </h1>
            </div>

            {/* Menú hamburguesa para móvil */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Barra de búsqueda y enlaces para desktop */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={search}
                  placeholder="Search News"
                  className="px-3 py-1 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleInput}
                />
                <button
                  onClick={getData}
                  className="bg-blue-700 px-4 py-1 rounded-r-lg text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:hidden bg-blue-800 pb-4 px-4`}
        >
          <div className="flex flex-col space-y-3">
            <div className="flex">
              <input
                type="text"
                value={search}
                placeholder="Search News"
                className="flex-1 px-3 py-1 rounded-l-lg focus:outline-none"
                onChange={handleInput}
              />
              <button
                onClick={getData}
                className="bg-blue-700 px-4 py-1 rounded-r-lg text-white hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8">
          Keep up with the latest trends.
        </h2>

        {/* Categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-8">
          {["deportes", "política", "entretenimiento", "salud", "fitness"].map(
            (category, index) => (
              <button
                key={index}
                onClick={userInput}
                value={category}
                className="bg-blue-700 py-2 px-4 rounded-lg text-white text-sm sm:text-base font-medium hover:bg-blue-600 active:bg-blue-800 transition-colors"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Contenido principal */}
        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">
              <p>{error}</p>
              <p className="text-sm mt-2">
                API Key utilizada: {import.meta.env.VITE_API_KEY}
              </p>
            </div>
          )}
          {!loading && !error && news.length > 0 ? (
            <Card data={news} />
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-600 py-4">
                No hay noticias disponibles
              </p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default News;
