import "./Button.css";

export default function Button({
    isLoading,
    children,
    onClick
}) {
    const click = () => {
        if (isLoading) {
            return;
        }

        onClick();
    }

    return (
        <button className={`button ${isLoading ? 'is-loading' : ''}`} onClick={click}>
            {children}
        </button>
    )
}