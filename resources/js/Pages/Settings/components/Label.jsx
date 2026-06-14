export default function Label({ children, htmlFor, C }) {
    return (
        <label
            htmlFor={htmlFor}
            style={{ display: 'block', fontSize: 13.5, fontWeight: 500, color: C.ink, marginBottom: 2 }}
        >
            {children}
        </label>
    );
}