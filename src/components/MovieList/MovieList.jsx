import Movie from "../Movie/Movie";

function MovieList({ data: movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} data={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
