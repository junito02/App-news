import React from "react";

const Card = ({ data }) => {
  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {data.map((item, index) => {
        // Verificar si el artículo tiene una imagen
        if (!item.urlToImage) {
          return null; // Si no tiene imagen, no se renderiza nada para ese artículo
        }

        // Si tiene imagen, se renderiza el contenido
        return (
          <article
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative pb-[56.25%]">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={item.urlToImage}
                alt={item.title}
                loading="lazy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 hover:line-clamp-none">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 flex-1">
                  {item.description}
                </p>
              )}
              <div className="mt-auto">
                <button
                  onClick={() => readMore(item.url)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors duration-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Read More
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Card;
