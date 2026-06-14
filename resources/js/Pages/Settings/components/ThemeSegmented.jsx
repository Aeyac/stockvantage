import Icon from "./Icon";

const THEME_OPTS = [
    { id: 'light', icon: 'sun', label: 'Light' },
    { id: 'dark', icon: 'moon', label: 'Dark' },
    { id: 'system', icon: 'device-laptop', label: 'System' },
];

export default function ThemeSegmented({ value, onChange, C }) {
    return (
        <div
            style={{
                display: 'inline-flex', background: C.bg,
                border: `1px solid ${C.border}`, borderRadius: 9, padding: 3, gap: 2,
            }}
            role="group"
            aria-label="Theme selection"
        >
            {THEME_OPTS.map(opt => {
                const active = value === opt.id;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(opt.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '7px 14px', borderRadius: 7, fontSize: 13,
                            fontFamily: 'inherit', fontWeight: active ? 500 : 400,
                            border: active ? `1px solid ${C.border}` : '1px solid transparent',
                            background: active ? C.surface : 'transparent',
                            color: active ? C.ink : C.muted,
                            cursor: 'pointer', transition: 'all .15s',
                            boxShadow: active ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        <Icon name={opt.icon} size={15} />
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}