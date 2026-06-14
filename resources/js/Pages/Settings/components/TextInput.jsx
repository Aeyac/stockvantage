import { useState } from "react";

export default function TextInput({ id, value, onChange, placeholder, C, style: extra }) {
    const [focused, setFocused] = useState(false);
    return (
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
                width: '100%', padding: '9px 12px', fontSize: 14,
                fontFamily: 'inherit', background: C.bg, color: C.ink,
                border: `1px solid ${focused ? C.signal : C.border}`,
                borderRadius: 8, outline: 'none',
                boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                transition: 'border-color .12s, box-shadow .12s',
                boxSizing: 'border-box', ...extra,
            }}
        />
    );
}