import "./MovieList.css"
import Movie from "../Movie/Movie";
import Button from "../Button/Button";
import {useState} from "react";

export default function MovieList({
    movies,
    hasMoreData,
    onLoadMore
}) {
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        setLoading(true);
        try {
            await onLoadMore();
        } catch (e) {
            // Display to user in the future
            console.error("Error loading more data", e);
        }
        setLoading(false);
    }

    return (
        <div className="movie-list">
            <div className="heading">
                <div className="title">Title</div>
                <div className="poster">Poster</div>
                <div className="rated">Rated</div>
                <div className="run-time">Runtime</div>
                <div className="rating">Rating</div>
            </div>
            {movies.map(movie =>
                <Movie movie={movie} key={movie.id} />
            )}
            {hasMoreData && <Button isLoading={loading} onClick={loadMore}>Load more...</Button>}
        </div>
    )
}