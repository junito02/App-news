import React from "react";

const Card = ({ data }) => {
  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 px-16">
      {data.map((item, index) => {
        // Verificar si el artículo tiene una imagen
        if (!item.urlToImage) {
          return null; // Si no tiene imagen, no se renderiza nada para ese artículo
        }

        // Si tiene imagen, se renderiza el contenido
        return (
          <div className="card bg-white shadow-md rounded-lg" key={index}>
            <img
              className="w-full h-[250px] object-cover rounded-t-lg"
              src={item.urlToImage}
              alt={item.title} // Mejor utilizar el título del artículo como alt
            />
            <div className="card-content p-4">
              <a className="text-xl font-semibold">{item.title}</a>
            </div>
            <div className="card-footer flex justify-center items-center">
              <button
                onClick={readMore.bind(this, item.url)} // Llamada a readMore con la URL del artículo
                className="bg-blue-600 p-2 text-white font-medium rounded-lg hover:bg-blue-500"
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
