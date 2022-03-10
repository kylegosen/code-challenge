import api from "../api";
import {ROTTEN_TOMATOES_SOURCE} from "../constants";

const getMovies = async (search, page = 1) => {
    const { data: { Search, Response, totalResults, Error } } = await api.get("", { params: { type: "movie", s: search, page }});
    return {
        results: Search,
        totalResults: totalResults ? Number(totalResults) : 0,
        error: Error,
        isValidResponse: Response === "True"
    }
}

const getMovieDetail = async id => api.get("", {params: { i: id }})

const getNullableValue = value => value && value !== "N/A" ? value : null;

const aggregateMovieDetails = async (search, page) => {
    const { results, totalResults, error, isValidResponse } = await getMovies(search, page);

    if (error || !isValidResponse) {
        throw new Error(error);
    }

    const additionalDetailsPromises = results.map(movie => getMovieDetail(movie.imdbID));
    const additionalDetails = await Promise.all(additionalDetailsPromises);
    const aggregatedResults = results.map(movie => {
        const detailRequest = additionalDetails.find(({data: { imdbID }}) => imdbID === movie.imdbID);
        const detail = detailRequest?.data;

        return {
            id: movie.imdbID,
            title: movie.Title,
            image: getNullableValue(movie.Poster),
            rated: getNullableValue(detail?.Rated),
            runTime: getNullableValue(detail?.Runtime),
            rating: detail?.Ratings.find(r => r.Source === ROTTEN_TOMATOES_SOURCE)?.Value ?? null
        }
    });

    return {
        results: aggregatedResults,
        totalResults
    }
}

export default {
    aggregateMovieDetails
}