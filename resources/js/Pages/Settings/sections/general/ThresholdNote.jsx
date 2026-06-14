import Icon from "../../components/Icon";

export default function ThresholdNote({ threshold, symbol, C }) {
    const isHigh = threshold > 100000;
    const formatted = `${symbol}${Number(threshold).toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })}`;
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginTop: 8, fontSize: 12,
            color: isHigh ? C.warn : C.muted,
        }}>
            <Icon name={isHigh ? 'alert-triangle' : 'info-circle'} size={14} />
            Purchase requests under <strong style={{ margin: '0 2px' }}>{formatted}</strong> will auto-approve.
        </div>
    );
}