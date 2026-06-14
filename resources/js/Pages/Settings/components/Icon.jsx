

export default function Icon({ name, size = 16, style: extraStyle, 'aria-hidden': ariaHidden = true }) {
    return (
        <i
            className={`ti ti-${name}`}
            style={{ fontSize: size, lineHeight: 1, ...extraStyle }}
            aria-hidden={ariaHidden}
        />
    );
}