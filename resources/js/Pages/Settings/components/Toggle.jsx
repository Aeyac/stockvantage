

export default function Toggle({ id, checked, onChange, C }) {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            style={{
                position: 'relative',
                width: 40, height: 22,
                borderRadius: 20, border: 'none',
                background: checked ? C.signal : C.border,
                cursor: 'pointer', flexShrink: 0,
                transition: 'background 0.2s', padding: 0,
            }}
        >
            <span style={{
                position: 'absolute',
                top: 3, left: checked ? 21 : 3,
                width: 16, height: 16,
                borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
        </button>
    )
}