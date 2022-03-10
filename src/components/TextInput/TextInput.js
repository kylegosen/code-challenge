import "./TextInput.css";

export default function TextInput({
    id,
    value,
    placeholder,
    onChange,
    onEnter
}) {
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            onEnter();
        }
    }

    return (
        <input
            id={id}
            type="type"
            className="text-input"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}