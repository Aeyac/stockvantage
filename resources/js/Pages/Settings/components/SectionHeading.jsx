export default function SectionHeading({ title, desc, C, danger }) {
    return (
        <div style={{ marginBottom: 8 }}>
            <p style={{
                fontSize: 14.5, fontWeight: 600,
                color: danger ? C.danger : C.ink,
                margin: '0 0 2px', letterSpacing: '-0.01em',
            }}>
                {title}
            </p>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>{desc}</p>
        </div>
    );
}