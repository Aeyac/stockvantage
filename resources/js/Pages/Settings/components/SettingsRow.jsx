import Label from "./Label";
import Hint from "./Hint";


export default function SettingsRow({ label, hint, htmlFor, children, C, last }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 24,
            padding: '20px 24px',
            borderBottom: last ? 'none' : `1px solid ${C.border}`,
        }}>
            <div style={{ width: 196, flexShrink: 0, paddingTop: 2 }}>
                <Label htmlFor={htmlFor} C={C}>{label}</Label>
                {hint && <Hint C={C}>{hint}</Hint>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </div>
    );
}