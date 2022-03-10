# Movie Search

Copy `.env.template` to `.env`

Replace `REACT_APP_API_KEY` with a valid `omdbapi` key

Run `npm start` from the root of the project and open [http://localhost:3000](http://localhost:3000)

### Decisions Made / Future Features
* API does not support sorting (would implement if I owned the API)
    * Decided it would be strange to add sorting without knowing the full extent of the results and "Load more" would not append the results to the bottom if sorted
* Consider minimum characters for searching
  * Entering a single letter or two will always bring back "Too many results"
* Implement sorting at a per column level (if the API supported it)
* Add filtering for Rated, Runtime, Rating
* Replace "Load more" with infinite scroll or pagination
    * Use a virtual scroll to clean up elements not necessary in the DOM based on scroll position
* Handle mobile with cards or something more user-friendly
* Add unit/integration tests