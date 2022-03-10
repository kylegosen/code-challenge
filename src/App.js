import {useState} from "react";
import './App.css';
import Button from './components/Button/Button';
import TextInput from "./components/TextInput/TextInput";
import Header from "./components/Header/Header";
import useMovies from "./hooks/useMovies";
import MovieList from "./components/MovieList/MovieList";
import NoResults from "./components/NoResults/NoResults";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";

function App() {
    const [hasSearched, setHasSearched] = useState(false);
    const [search, setSearch] = useState("");
    const { data, totalResults, hasMoreData, loading, error, getMovies, loadMoreMovies } = useMovies();
    const count = data?.length ?? 0;

    const onSearchChanged = event => setSearch(event.target.value);
    const onSearch = () => {
        getMovies(search);
        setHasSearched(true);
    }
    const onLoadMore = () => loadMoreMovies(search);

  return (
    <div className="app">
        <Header />
        <div className="scroll">
            <div className="container">
                <div className="top">
                    <div className="search">
                        <label htmlFor="movie-search">Find a movie</label>
                        <div className="actions">
                            <TextInput id="movie-search" value={search} placeholder="Enter a movie title" onChange={onSearchChanged} onEnter={onSearch} />
                            <Button isLoading={loading} onClick={onSearch}>Search</Button>
                        </div>
                    </div>
                    {count > 0 &&
                    <div className="result-count">
                        { `Showing ${count} of ${totalResults} results` }
                    </div>
                    }
                </div>
                <div className="content">
                    {error ? <Error message={error} />
                        : loading ? <Loading />
                            : (!hasSearched) ?
                                <div className="text-align-center">
                                    <h1>Get Started</h1>
                                    <h3>Enter a movie title and click search.</h3>
                                </div>
                            : count > 0 ? <MovieList movies={data} hasMoreData={hasMoreData} onLoadMore={onLoadMore} />
                                : <NoResults />
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
