import {useMemo, useState} from "react";
import MovieService from "../services/MovieService";
import {PAGE_SIZE} from "../constants";

export default function useMovies() {
    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const hasMoreData = useMemo(() => data.length < totalResults, [data, totalResults]);

    const getMovies = async (search, page = 1) => {
        if (page === 1) {
            setLoading(true);
        }
        setError(false);
        try {
            const { results, totalResults } = await MovieService.aggregateMovieDetails(search, page);

            setData(page === 1 ? results : [...data, ...results]);
            setTotalResults(totalResults);
        } catch (e) {
            console.error(`Error fetching movies by search [${search}]`, e);
            setError(e?.message ?? true);
        }
        setLoading(false);
    }

    const loadMoreMovies = async search => {
        const nextPage = Math.floor(data.length / PAGE_SIZE) + 1;
        return getMovies(search, nextPage);
    }

    return {
        data,
        totalResults,
        hasMoreData,
        error,
        loading,
        getMovies,
        loadMoreMovies
    }
}