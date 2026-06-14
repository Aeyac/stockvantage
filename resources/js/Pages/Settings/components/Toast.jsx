import Icon from "./Icon";

export default function Toast({ visible, C }) {

    
    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: 13, color: C.successText,
                opacity: visible ? 1 : 0,
                transition: 'opacity .2s',
                pointerEvents: 'none',
            }}
        >
            <Icon name="circle-check" size={16} />
            Changes saved
        </div>
    );
}