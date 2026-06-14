export default function Hint({ children, C }) {
    return (
        <p style={{ fontSize: 12, color: C.faint, lineHeight: 1.5, margin: '3px 0 0' }}>
            {children}
        </p>
    );
}