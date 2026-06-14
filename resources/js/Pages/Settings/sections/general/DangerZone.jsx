import Icon from "../../components/Icon";


export default function DangerZone({ C }) {
    return (
        <div style={{
            background: C.dangerBg, border: `1px solid ${C.dangerBorder}`,
            borderRadius: 12, overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderBottom: `1px solid ${C.dangerBorder}`,
            }}>
                <Icon name="alert-triangle" size={15} style={{ color: C.danger }} />
                <span style={{ fontSize: 13.5, fontWeight: 500, color: C.danger }}>
                    These actions cannot be undone
                </span>
            </div>
            {[
                {
                    title: 'Delete all procurement data',
                    desc: 'Permanently removes purchase orders, requests, and vendor records.',
                    label: 'Delete data',
                },
                {
                    title: 'Reset organization',
                    desc: 'Removes all members, settings, and configuration. The account itself is kept.',
                    label: 'Reset org',
                },
            ].map((item, i, arr) => (
                <div
                    key={item.title}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 16, padding: '18px 24px',
                        borderBottom: i < arr.length - 1 ? `1px solid ${C.dangerBorder}` : 'none',
                    }}
                >
                    <div>
                        <p style={{ fontSize: 13.5, fontWeight: 500, color: C.ink, margin: '0 0 2px' }}>{item.title}</p>
                        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{item.desc}</p>
                    </div>
                    <button
                        type="button"
                        style={{
                            flexShrink: 0, fontSize: 13, fontWeight: 500,
                            background: C.dangerBg, color: C.danger,
                            border: `1px solid ${C.dangerBorder}`,
                            borderRadius: 7, padding: '7px 14px',
                            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                        }}
                    >
                        {item.label}
                    </button>
                </div>
            ))}
        </div>
    );
}