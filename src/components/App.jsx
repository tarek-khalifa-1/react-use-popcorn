import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./main/Main";
import Logo from "./logo/logo";
import Search from "./search/Search";
import NumResults from "./numResults/numResults";
import Box from "./Box/Box";
import MovieList from "./MovieList/MovieList";
import WatchedSummary from "./WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList/WatchedMoviesList";
import Loader from "./Loader/loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import MovieDetails from "./MovieDetails/MovieDetails";
import { API_URL } from "../Config";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored) || [];
  });
  const [query, setQuery] = useState("interstellar");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedID] = useState(null);

  function handleSelectMovie(id) {
    setSelectedID((curSelected) => (id === curSelected ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatchedMovie(watchedMovie) {
    setWatched((watched) => [...watched, watchedMovie]);
  }

  function handleRemoveWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${API_URL}s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults data={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList data={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatchedMovie}
                watchedMovies={watched}
              />
            ) : (
              <>
                <WatchedSummary data={watched} />
                <WatchedMoviesList
                  data={watched}
                  onRemove={handleRemoveWatchedMovie}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}

export default App;
