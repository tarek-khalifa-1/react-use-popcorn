import WatchedMovie from "../WatchedMovie/WatchedMovie";

function WatchedMoviesList({ data: watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
