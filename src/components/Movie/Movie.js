import "./Movie.css"

export default function Movie({
   movie
}) {
    // rate, runTime and rating are nullable
    const { id, title, image, rated, runTime, rating } = movie;

    const getRatingClass = () => {
        if (!rating) {
            return "";
        }

        try {
            const ratingNumber = Number(rating.replaceAll("%", ""));
            return ratingNumber <= 60 ? "below-average" : ratingNumber < 75 ? "average" : "great";
        } catch (e) {
            console.error(`Error parsing rating [${rating}] for id [${id}]`, e);
        }

        return "";
    }

    return (
      <div className="movie">
          <div className="title">{ title }</div>
          <div className="poster">
              {image && <img src={image} alt={title} />}
          </div>
          <div className="rated">{rated}</div>
          <div className="run-time">{ runTime }</div>
          <div className="rating">
              {rating &&
                  <div>
                      <div className={`icon ${getRatingClass()}`}></div>
                      <div>{ rating }</div>
                  </div>
              }
          </div>
      </div>
    );
}