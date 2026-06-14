export default function Card({ children, C, style: extra }) {
    return (
        <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden', ...extra,
        }}>
            {children}
        </div>
    );
}