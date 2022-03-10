import "./Error.css";

export default function Error({ message }) {
    return (
        <div className="error">
            <h1>{ message || "Oops, something went wrong!" }</h1>
            <h3>Please try searching again.</h3>
        </div>
    )
}