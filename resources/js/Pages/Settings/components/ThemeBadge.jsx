import Icon from "./Icon";

const THEME_LABELS = {
    light: 'Light mode active',
    dark: 'Dark mode active',
    system: 'Following system preference',
};

export default function ThemeBadge({ themeMode, C }) {
    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 10, background: C.successBg, color: C.successText,
            fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
        }}>
            <Icon name="check" size={13} />
            {THEME_LABELS[themeMode]}
        </div>
    );
}