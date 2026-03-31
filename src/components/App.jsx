import { useRef, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import Box from "./Box/Box";
import MovieList from "./MovieList/MovieList";
import WatchedSummary from "./WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList/WatchedMoviesList";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import MovieDetails from "./MovieDetails/MovieDetails";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useKey } from "../hooks/useKey";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedID] = useState(null);
  const inputEl = useRef(null);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

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

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} inputEl={inputEl} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <p>loading......</p>}
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
