function Movie({ data: movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {movie.Poster === "N/A" ? (
        <img
          src={
            "https://png.pngtree.com/element_pic/16/11/18/4f829e85866bd52d062ca58b4e1ecef5.png"
          }
          alt={`${movie.Title} poster`}
        />
      ) : (
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
      )}
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
