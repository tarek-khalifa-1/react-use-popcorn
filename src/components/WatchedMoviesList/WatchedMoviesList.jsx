import WatchedMovie from "../WatchedMovie/WatchedMovie";

function WatchedMoviesList({ data: watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
