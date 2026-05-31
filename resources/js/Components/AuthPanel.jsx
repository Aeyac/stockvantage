import { useState, useEffect } from 'react';

// ─── Icon helper ──────────────────────────────────────────────────────────────
function Icon({ name, size = 16, style: s }) {
    return <i className={`ti ti-${name}`} style={{ fontSize: size, lineHeight: 1, ...s }} aria-hidden />;
}

// ─── Animated grid background for the left panel ─────────────────────────────
// Pure CSS — no canvas, no JS animation loop.
const GRID_STYLE = `
    @keyframes sv-pulse-a { 0%,100%{opacity:.07} 50%{opacity:.18} }
    @keyframes sv-pulse-b { 0%,100%{opacity:.04} 50%{opacity:.13} }
    @keyframes sv-float-up { from{transform:translateY(0)} to{transform:translateY(-6px)} }

    .sv-grid-bg {
        position: absolute; inset: 0;
        background-image:
            linear-gradient(rgba(0,196,136,.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,196,136,.10) 1px, transparent 1px);
        background-size: 40px 40px;
        animation: sv-pulse-a 6s ease-in-out infinite;
    }
    .sv-grid-dot {
        position: absolute;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #00C488;
    }
    .sv-grid-dot:nth-child(1)  { top:18%; left:22%; opacity:.55; animation: sv-pulse-b 4.2s 0.0s ease-in-out infinite; }
    .sv-grid-dot:nth-child(2)  { top:34%; left:68%; opacity:.45; animation: sv-pulse-b 5.1s 0.8s ease-in-out infinite; }
    .sv-grid-dot:nth-child(3)  { top:55%; left:40%; opacity:.60; animation: sv-pulse-b 3.8s 1.5s ease-in-out infinite; }
    .sv-grid-dot:nth-child(4)  { top:72%; left:80%; opacity:.35; animation: sv-pulse-b 6.3s 0.3s ease-in-out infinite; }
    .sv-grid-dot:nth-child(5)  { top:82%; left:15%; opacity:.50; animation: sv-pulse-b 4.7s 2.1s ease-in-out infinite; }
    .sv-grid-dot:nth-child(6)  { top:10%; left:55%; opacity:.40; animation: sv-pulse-b 5.5s 1.0s ease-in-out infinite; }

    .sv-panel-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(0,196,136,0.15);
        border-radius: 12px;
        padding: 18px 20px;
        backdrop-filter: blur(4px);
        animation: sv-float-up 4s ease-in-out infinite alternate;
    }
    .sv-panel-card:nth-child(2) {
        animation-delay: -2s;
        animation-duration: 5s;
    }

    @keyframes sv-fade-in-up {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    .sv-form-animate {
        animation: sv-fade-in-up 0.45s cubic-bezier(0.22,1,0.36,1) both;
    }
    .sv-form-animate:nth-child(1) { animation-delay: 0.05s; }
    .sv-form-animate:nth-child(2) { animation-delay: 0.10s; }
    .sv-form-animate:nth-child(3) { animation-delay: 0.15s; }
    .sv-form-animate:nth-child(4) { animation-delay: 0.20s; }
    .sv-form-animate:nth-child(5) { animation-delay: 0.25s; }
    .sv-form-animate:nth-child(6) { animation-delay: 0.30s; }
    .sv-form-animate:nth-child(7) { animation-delay: 0.35s; }
`;

// ─── Left branded panel ───────────────────────────────────────────────────────
function BrandPanel({ C }) {
    const testimonials = [
        {
            quote: "StockVantage cut our approval cycle from 3 days to 2 hours. Our procurement team actually enjoys using it.",
            name:  'Maria Santos',
            role:  'Operations Manager, PhilBuild Corp.',
        },
        {
            quote: "The auto-PO feature alone saves us 4 hours every week. Setup took less than a day.",
            name:  'David Reyes',
            role:  'CFO, TradeFlux Philippines',
        },
    ];

    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActiveTestimonial(t => (t + 1) % testimonials.length), 5000);
        return () => clearInterval(id);
    }, []);

    const t = testimonials[activeTestimonial];

    return (
        <div style={{
            position: 'relative',
            width: '42%', flexShrink: 0,
            background: C.panelBg,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '36px 40px',
        }}>
            {/* Animated grid */}
            <div className="sv-grid-bg" aria-hidden />
            <div className="sv-grid-dot" aria-hidden /><div className="sv-grid-dot" aria-hidden />
            <div className="sv-grid-dot" aria-hidden /><div className="sv-grid-dot" aria-hidden />
            <div className="sv-grid-dot" aria-hidden /><div className="sv-grid-dot" aria-hidden />

            {/* Gradient vignette so content reads over the grid */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 60%, rgba(0,196,136,0.06) 0%, transparent 65%)',
                pointerEvents: 'none',
            }} aria-hidden />

            {/* Logo mark */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 48 }}>
                    <div style={{
                        width: 28, height: 28,
                        background: C.panelAccent,
                        borderRadius: 7,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <Icon name="trending-up" size={16} style={{ color: '#fff' }} />
                    </div>
                    <span style={{
                        fontSize: 15, fontWeight: 700,
                        color: C.panelInk,
                        letterSpacing: '-0.02em',
                    }}>
                        StockVantage
                    </span>
                </div>

                {/* Hero headline */}
                <p style={{
                    fontSize: 26, fontWeight: 700,
                    color: C.panelInk,
                    lineHeight: 1.25,
                    letterSpacing: '-0.025em',
                    margin: '0 0 12px',
                    maxWidth: 260,
                }}>
                    Smarter procurement starts here.
                </p>
                <p style={{
                    fontSize: 13.5, color: C.panelMuted,
                    lineHeight: 1.6, margin: '0 0 40px',
                    maxWidth: 240,
                }}>
                    Multi-tenant supply chain management built for Philippine businesses.
                </p>

                {/* Feature pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { icon: 'bolt',         text: 'Auto-approval workflows' },
                        { icon: 'building',     text: 'Multi-tenant organization support' },
                        { icon: 'report-analytics', text: 'Real-time procurement insights' },
                    ].map(f => (
                        <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: 7,
                                background: 'rgba(0,196,136,0.12)',
                                border: '1px solid rgba(0,196,136,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <Icon name={f.icon} size={14} style={{ color: C.panelAccent }} />
                            </div>
                            <span style={{ fontSize: 13, color: C.panelMuted }}>{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rotating testimonial */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                    key={activeTestimonial}
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 10,
                        padding: '16px 18px',
                        animation: 'sv-fade-in-up 0.4s ease both',
                    }}
                >
                    <p style={{
                        fontSize: 13, color: '#C8D6D0',
                        lineHeight: 1.6, margin: '0 0 12px',
                        fontStyle: 'italic',
                    }}>
                        "{t.quote}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Avatar initial */}
                        <div style={{
                            width: 30, height: 30, borderRadius: '50%',
                            background: 'rgba(0,196,136,0.2)',
                            border: '1px solid rgba(0,196,136,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, color: C.panelAccent,
                        }}>
                            {t.name[0]}
                        </div>
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 600, color: C.panelInk, margin: 0 }}>{t.name}</p>
                            <p style={{ fontSize: 11, color: C.panelMuted, margin: 0 }}>{t.role}</p>
                        </div>
                    </div>
                </div>

                {/* Dot indicators */}
                <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'center' }}>
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveTestimonial(i)}
                            style={{
                                width: i === activeTestimonial ? 18 : 6,
                                height: 6, borderRadius: 99,
                                background: i === activeTestimonial ? C.panelAccent : 'rgba(255,255,255,0.2)',
                                border: 'none', cursor: 'pointer',
                                transition: 'width .3s, background .3s',
                                padding: 0,
                            }}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── AuthPanel wrapper ────────────────────────────────────────────────────────
export default function AuthPanel({ children, tagline, C }) {
    return (
        <>
            {/* Inject keyframes + utility classes */}
            <style>{GRID_STYLE}</style>

            {/* Tabler icons (remove if loaded globally) */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.30.0/dist/tabler-icons.min.css"
            />

            <div style={{
                display: 'flex',
                minHeight: '100vh',
                fontFamily: '"Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                background: C.bg,
                color: C.ink,
            }}>
                {/* Left panel — hidden on small screens */}
                <div style={{ display: 'flex', flex: 1 }} className="sv-auth-split">
                    <BrandPanel C={C} />

                    {/* Right form panel */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '48px 32px',
                        overflowY: 'auto',
                    }}>
                        <div style={{ width: '100%', maxWidth: 380 }}>

                            {/* Page heading */}
                            <div className="sv-form-animate" style={{ marginBottom: 28 }}>
                                <p style={{
                                    fontSize: 22, fontWeight: 700,
                                    color: C.ink,
                                    letterSpacing: '-0.02em',
                                    margin: '0 0 4px',
                                }}>
                                    {tagline}
                                </p>
                                <p style={{ fontSize: 13.5, color: C.muted, margin: 0 }}>
                                    StockVantage — procurement management
                                </p>
                            </div>

                            {/* Staggered children */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {Array.isArray(children)
                                    ? children.map((child, i) => (
                                        <div key={i} className="sv-form-animate">{child}</div>
                                    ))
                                    : <div className="sv-form-animate">{children}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive: hide left panel on narrow viewports */}
            <style>{`
                @media (max-width: 720px) {
                    .sv-auth-split > div:first-child { display: none; }
                }
            `}</style>
        </>
    );
}