import { useState } from "react";
import Icon from "./Icon";

export default function SelectInput({ id, value, onChange, options, C }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: 'relative' }}>
            <select
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%', padding: '9px 36px 9px 12px', fontSize: 14,
                    fontFamily: 'inherit', background: C.bg, color: C.ink,
                    border: `1px solid ${focused ? C.signal : C.border}`,
                    borderRadius: 8, outline: 'none',
                    boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                    transition: 'border-color .12s, box-shadow .12s',
                    appearance: 'none', cursor: 'pointer', boxSizing: 'border-box',
                }}
            >
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Icon
                name="chevron-down"
                size={14}
                style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)', color: C.faint, pointerEvents: 'none',
                }}
            />
        </div>
    );
}
