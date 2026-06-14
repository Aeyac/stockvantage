import { useState } from "react";

export default function NumberInput({ id, value, onChange, min, prefix, C }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {prefix && (
                <span style={{
                    position: 'absolute', left: 12, fontSize: 14, color: C.muted,
                    pointerEvents: 'none', userSelect: 'none',
                }}>
                    {prefix}
                </span>
            )}
            <input
                id={id}
                type="number"
                value={value}
                min={min}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%', padding: `9px 12px 9px ${prefix ? 26 : 12}px`,
                    fontSize: 14, fontFamily: 'inherit', background: C.bg, color: C.ink,
                    border: `1px solid ${focused ? C.signal : C.border}`,
                    borderRadius: 8, outline: 'none',
                    boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                    transition: 'border-color .12s, box-shadow .12s',
                    boxSizing: 'border-box',
                }}
            />
        </div>
    );
}