import Icon from "../components/Icon";

export default function SideNav({ NAV_ITEMS, activeSection, onSwitch, C }) {
    return (
        <nav aria-label="Settings navigation" style={{ width: 180, flexShrink: 0 }}>
            <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: C.faint,
                padding: '0 8px', marginBottom: 6,
            }}>
                Settings
            </p>
            {NAV_ITEMS.map(item => {
                const active = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSwitch(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            width: '100%', textAlign: 'left', padding: '7px 10px',
                            borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit',
                            fontWeight: active ? 500 : 400,
                            background: active ? C.bg : 'transparent',
                            color: active ? C.ink : C.muted,
                            border: 'none', cursor: 'pointer',
                            transition: 'background .12s, color .12s',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.bg; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                        aria-current={active ? 'page' : undefined}
                    >
                        <Icon name={item.icon} size={16} />
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );
}