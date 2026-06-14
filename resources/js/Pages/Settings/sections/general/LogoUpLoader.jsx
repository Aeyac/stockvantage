import { useRef } from "react";
import Icon from "../../components/Icon";

export default function LogoUploader({ logoPreview, onLogoChange, C }) {
    const fileRef = useRef(null);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
                width: 56, height: 56, borderRadius: 8,
                border: `1px dashed ${C.borderHover}`, background: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
            }}>
                {logoPreview
                    ? <img src={logoPreview} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    : <span style={{ fontSize: 10, fontFamily: 'monospace', color: C.faint }}>NONE</span>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 500, background: 'transparent',
                        color: C.ink2, border: `1px solid ${C.border}`,
                        borderRadius: 7, padding: '7px 14px',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background .12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <Icon name="upload" size={15} />
                    Upload logo
                </button>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onLogoChange}
                />
                <span style={{ fontSize: 11.5, color: C.faint }}>Recommended: 256 × 256 px, max 2 MB</span>
            </div>
        </div>
    );
}