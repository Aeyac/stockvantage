import React, { useEffect, useState } from 'react';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [activeRole, setActiveRole] = useState('procurement');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
        :root {
          --ink: #0A0C0B;
          --ink-2: #151918;
          --ink-3: #1D2421;
          --ink-4: #252E2A;
          --wire: #2C3833;
          --wire-2: #364340;
          --mute: #5A6E67;
          --mute-2: #7A9189;
          --ghost: #B8CEC8;
          --snow: #EEF3F1;
          --white: #F7FAF9;
          --signal: #00E5A0;
          --signal-dim: #00C488;
          --signal-dark: #007A55;
          --warn: #F59B00;
          --warn-dim: #FAEEDA;
          --danger: #E84040;
          --danger-dim: #FEE;
          --safe: #22C55E;
          --safe-dim: #DCFCE7;
          --blue: #3B82F6;
          --blue-dim: #EFF6FF;

          --radius-sm: 4px;
          --radius: 8px;
          --radius-lg: 14px;
          --radius-xl: 20px;
          --radius-pill: 100px;

          /* Font Changes Applied Below */
          --font-head: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --font-mono: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-body);
          background: var(--ink);
          color: var(--white);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--ink-2); }
        ::-webkit-scrollbar-thumb { background: var(--wire-2); border-radius: 4px; }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px;
          height: 60px;
          background: rgba(10,12,11,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }
        nav.scrolled { border-bottom-color: var(--wire); }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-head); font-weight: 700; font-size: 17px;
          color: var(--white); text-decoration: none; letter-spacing: -0.02em;
        }
        .logo-mark {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--signal);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .logo-mark svg { width: 14px; height: 14px; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-links a {
          font-size: 13px; font-weight: 500; color: var(--mute-2);
          text-decoration: none; letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: var(--white); }
        .nav-links a.active { color: var(--signal); }
        .nav-cta {
          padding: 7px 18px; border-radius: var(--radius-pill);
          border: 1px solid var(--signal); color: var(--signal);
          font-size: 13px; font-weight: 500; font-family: var(--font-body);
          background: transparent; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .nav-cta:hover { background: var(--signal); color: var(--ink); }

        /* ── SECTION BASE ── */
        section { padding: 100px 0; }
        .container { max-width: 1160px; margin: 0 auto; padding: 0 48px; }
        .section-label {
          font-family: var(--font-mono); font-size: 11px; font-weight: 400;
          color: var(--signal); letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .section-heading {
          font-family: var(--font-head); font-size: 42px; font-weight: 700;
          line-height: 1.12; letter-spacing: -0.03em; color: var(--white);
          margin-bottom: 16px;
        }
        .section-heading.dark { color: var(--ink); }
        .section-sub {
          font-size: 16px; line-height: 1.65; color: var(--mute-2); max-width: 560px;
        }
        .section-sub.dark { color: var(--mute); }

        .reveal { opacity: 1; transform: none; }

        /* ══════════════════════════════════════════
           S1 — HERO
        ══════════════════════════════════════════ */
        #hero {
          min-height: 100vh; display: flex; align-items: center;
          padding-top: 60px;
          background: var(--ink);
          position: relative; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--wire) 1px, transparent 1px),
            linear-gradient(90deg, var(--wire) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.18;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%);
        }
        .hero-inner { position: relative; z-index: 2; max-width: 820px; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: var(--radius-pill);
          border: 1px solid var(--wire-2);
          font-family: var(--font-mono); font-size: 11px; color: var(--mute-2);
          margin-bottom: 32px; letter-spacing: 0.04em;
        }
        .hero-pill .dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--signal);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,229,160,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 5px rgba(0,229,160,0); }
        }
        
        /* Adjusted font-size for specific target text part as requested */
        .hero-h1 {
          font-family: var(--font-head); font-size: clamp(32px, 5vw, 48px);
          font-weight: 800; line-height: 1.15; letter-spacing: -0.03em;
          color: var(--white); margin-bottom: 24px;
        }
        .hero-h1 em { color: var(--signal); font-style: normal; }
        .hero-p {
          font-size: 18px; line-height: 1.65; color: var(--mute-2);
          max-width: 600px; margin-bottom: 40px;
        }
        .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: var(--radius-pill);
          background: var(--signal); color: var(--ink);
          font-size: 14px; font-weight: 600; font-family: var(--font-body);
          border: none; cursor: pointer; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: var(--signal-dim); transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: var(--radius-pill);
          background: transparent; color: var(--ghost);
          font-size: 14px; font-weight: 500; font-family: var(--font-body);
          border: 1px solid var(--wire-2); cursor: pointer; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--ghost); color: var(--white); }
        .hero-stats {
          display: flex; align-items: center; gap: 0;
          margin-top: 56px; border-top: 1px solid var(--wire);
          padding-top: 32px;
        }
        .hero-stat {
          flex: 1; padding-right: 32px;
          border-right: 1px solid var(--wire);
        }
        .hero-stat:last-child { border-right: none; padding-right: 0; padding-left: 32px; }
        .hero-stat:nth-child(2) { padding: 0 32px; }
        .hero-stat-val {
          font-family: var(--font-mono); font-size: 22px; font-weight: 500;
          color: var(--signal); display: block; margin-bottom: 4px;
        }
        .hero-stat-lbl {
          font-size: 12px; color: var(--mute); letter-spacing: 0.02em;
        }

        /* ══════════════════════════════════════════
           S2 — DASHBOARD PREVIEW
        ══════════════════════════════════════════ */
        #dashboard { background: var(--ink-2); padding: 100px 0; }
        .dashboard-header { text-align: center; margin-bottom: 56px; }
        .dashboard-header .section-sub { margin: 0 auto; text-align: center; }

        .browser-frame {
          border-radius: var(--radius-lg); overflow: hidden;
          border: 1px solid var(--wire-2);
          box-shadow: 0 48px 120px rgba(0,0,0,0.5);
        }
        .browser-chrome {
          background: var(--ink-3); padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid var(--wire);
        }
        .chrome-dots { display: flex; gap: 6px; }
        .chrome-dot { width: 11px; height: 11px; border-radius: 50%; }
        .chrome-dot.r { background: #FF5F57; }
        .chrome-dot.y { background: #FEBC2E; }
        .chrome-dot.g { background: #28C840; }
        .chrome-url {
          flex: 1; background: var(--ink-4); border-radius: var(--radius-sm);
          padding: 5px 12px; font-family: var(--font-mono); font-size: 12px;
          color: var(--mute-2); display: flex; align-items: center; gap: 8px;
        }
        .chrome-url .live-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--signal);
          animation: pulse 2s infinite; flex-shrink: 0;
        }

        .dash-ui {
          background: #F2F5F4; display: grid;
          grid-template-rows: 52px 1fr;
          min-height: 540px;
        }
        .dash-sidebar {
          background: #FFFFFF; width: 200px; flex-shrink: 0;
          border-right: 1px solid #E2E8E6;
          padding: 16px 0;
        }
        .dash-sidebar-logo {
          display: flex; align-items: center; gap: 8px;
          padding: 0 16px 16px; margin-bottom: 8px;
          border-bottom: 1px solid #E2E8E6; font-family: var(--font-head);
          font-weight: 700; font-size: 14px; color: #0A0C0B;
        }
        .dash-sidebar-logo .sm { width: 20px; height: 20px; border-radius: 4px; background: #00C488; display: flex; align-items: center; justify-content: center; }
        .dash-nav-item {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 16px; font-size: 13px; color: #5A6E67;
          cursor: pointer; transition: background 0.15s, color 0.15s;
          border-radius: 0;
        }
        .dash-nav-item:hover { background: #F2F5F4; color: #0A0C0B; }
        .dash-nav-item.active { background: #E8F7F2; color: #007A55; font-weight: 500; }
        .dash-nav-item svg { width: 15px; height: 15px; flex-shrink: 0; }

        .dash-topbar {
          background: #FFFFFF; border-bottom: 1px solid #E2E8E6;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; font-size: 13px;
        }
        .dash-topbar-left { display: flex; align-items: center; gap: 8px; color: #5A6E67; }
        .dash-topbar-right { display: flex; align-items: center; gap: 12px; }
        .topbar-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: #00C488; color: #0A0C0B;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; font-family: var(--font-mono);
        }
        .dash-body { display: flex; flex: 1; overflow: hidden; }
        .dash-main { flex: 1; padding: 20px; overflow: auto; }
        .dash-section-title { font-size: 11px; font-weight: 600; color: #5A6E67; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; font-family: var(--font-mono); }

        .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
        .metric-tile {
          background: #FFFFFF; border: 1px solid #E2E8E6; border-radius: 10px;
          padding: 14px; cursor: default;
          transition: border-color 0.2s;
        }
        .metric-tile:hover { border-color: #00C488; }
        .metric-label { font-size: 11px; color: #7A9189; margin-bottom: 6px; font-family: var(--font-mono); }
        .metric-value { font-size: 20px; font-weight: 700; color: #0A0C0B; font-family: var(--font-head); margin-bottom: 3px; }
        .metric-sub { font-size: 11px; color: #7A9189; }
        .metric-sub.up { color: #22C55E; }
        .metric-sub.warn { color: #F59B00; }
        .metric-sub.danger { color: #E84040; }

        .chart-wrap { background: #FFFFFF; border: 1px solid #E2E8E6; border-radius: 10px; padding: 16px; margin-bottom: 16px; }
        .chart-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .chart-title { font-size: 13px; font-weight: 600; color: #0A0C0B; }
        .chart-period { font-size: 11px; color: #7A9189; font-family: var(--font-mono); }
        #spendChart { display: block; width: 100%; }

        .dash-bottom { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
        .panel { background: #FFFFFF; border: 1px solid #E2E8E6; border-radius: 10px; padding: 14px; }
        .panel-title { font-size: 12px; font-weight: 600; color: #0A0C0B; margin-bottom: 12px; font-family: var(--font-mono); letter-spacing: 0.04em; }
        .po-table { width: 100%; border-collapse: collapse; }
        .po-table th { font-size: 10px; font-weight: 500; color: #7A9189; text-align: left; padding: 0 0 8px; border-bottom: 1px solid #E2E8E6; text-transform: uppercase; letter-spacing: 0.06em; }
        .po-table td { font-size: 11px; color: #2C3833; padding: 7px 0; border-bottom: 1px solid #F2F5F4; }
        .po-table tr:last-child td { border-bottom: none; }
        .po-num { font-family: var(--font-mono); color: #007A55; font-weight: 500; }
        
        .badge {
          display: inline-block; padding: 2px 8px; border-radius: 100px;
          font-size: 10px; font-weight: 500; font-family: var(--font-mono);
          white-space: nowrap;
        }
        .badge-green { background: #DCFCE7; color: #15803D; }
        .badge-amber { background: #FEF3C7; color: #92400E; }
        .badge-red   { background: #FEE2E2; color: #991B1B; }

        .alert-item { display: flex; align-items: center; gap: 9px; padding: 6px 0; border-bottom: 1px solid #F2F5F4; }
        .alert-item:last-child { border-bottom: none; }
        .alert-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .alert-dot.critical { background: #E84040; }
        .alert-dot.warning  { background: #F59B00; }
        .alert-text { font-size: 11px; color: #2C3833; flex: 1; line-height: 1.4; }
        .alert-text strong { font-weight: 600; display: block; }
        .alert-units { font-family: var(--font-mono); font-size: 10px; color: #7A9189; flex-shrink: 0; }

        /* ══════════════════════════════════════════
           S3 — PIPELINE FLOW
        ══════════════════════════════════════════ */
        #pipeline { background: var(--snow); padding: 100px 0; }
        .pipeline-header { margin-bottom: 64px; }
        
        .flow-steps {
          display: grid; grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center; gap: 0; margin-bottom: 0;
        }
        .flow-step {
          background: var(--white); border: 1px solid #D4DCD9;
          border-radius: var(--radius-lg); padding: 24px 20px;
          text-align: center; position: relative;
        }
        .flow-step.branch-node {
          background: var(--ink); border-color: var(--ink-3); color: var(--white);
          padding: 20px;
        }
        .flow-arrow {
          display: flex; align-items: center; justify-content: center;
          width: 40px; flex-shrink: 0;
        }
        .flow-arrow svg { color: #B8CEC8; }
        .step-num {
          font-family: var(--font-mono); font-size: 10px; color: var(--mute-2);
          text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;
        }
        .step-icon { display: flex; justify-content: center; align-items: center; height: 32px; margin-bottom: 8px; }
        .step-title {
          font-family: var(--font-head); font-size: 14px; font-weight: 700;
          color: var(--ink); margin-bottom: 6px; line-height: 1.2;
        }
        .flow-step.branch-node .step-title { color: var(--white); }
        .step-desc { font-size: 12px; color: var(--mute); line-height: 1.5; }
        .flow-step.branch-node .step-desc { color: var(--mute-2); }

        .flow-branch-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-top: 16px;
        }
        .branch-path {
          border-radius: var(--radius-lg); padding: 16px 20px; text-align: center;
          border: 1.5px dashed #D4DCD9;
        }
        .branch-path.auto { border-color: #86EFAC; background: #F0FDF4; }
        .branch-path.await { border-color: #FCD34D; background: #FFFBEB; }
        .branch-label {
          font-family: var(--font-mono); font-size: 19px; font-weight: 500; margin-bottom: 4px;
        }
        .branch-path.auto .branch-label { color: #15803D; }
        .branch-path.await .branch-label { color: #92400E; }
        .branch-status { font-size: 12px; color: var(--mute); }
        .branch-connector {
          width: 1px; height: 24px; background: #D4DCD9; margin: 0 auto;
        }

        /* PO Preview card - Font adjustments applied here */
        .po-preview {
          background: var(--white); border: 1px solid #D4DCD9;
          border-radius: var(--radius-lg); padding: 28px 32px;
          margin-top: 48px; max-width: 680px; margin-left: auto; margin-right: auto;
        }
        .po-preview-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 24px; padding-bottom: 16px;
          border-bottom: 2px solid var(--ink);
        }
        .po-co-name {
          font-family: var(--font-mono); font-size: 18px; font-weight: 700;
          color: var(--ink); letter-spacing: -0.02em;
        }
        .po-co-sub { font-size: 12px; color: var(--mute); margin-top: 2px; font-family: var(--font-mono); }
        .po-meta { text-align: right; }
        .po-meta-title {
          font-family: var(--font-mono); font-size: 10px; color: var(--mute);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .po-meta-num {
          font-family: var(--font-mono); font-size: 20px; font-weight: 700;
          color: var(--signal-dark); letter-spacing: -0.02em;
        }
        .po-details-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
        .po-detail-label { font-size: 10px; color: var(--mute); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-mono); margin-bottom: 3px; }
        .po-detail-val { font-size: 13px; color: var(--ink); font-weight: 500; }
        .po-line-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        .po-line-table th { font-size: 10px; color: var(--mute); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-mono); text-align: left; padding: 0 0 8px; border-bottom: 1px solid #E2E8E6; }
        .po-line-table th:not(:first-child) { text-align: right; }
        .po-line-table td { font-size: 13px; color: var(--ink-3); padding: 9px 0; border-bottom: 1px solid #F2F5F4; }
        .po-line-table td:not(:first-child) { text-align: right; font-family: var(--font-mono); }
        .po-line-table tr:last-child td { border-bottom: none; }
        .po-total-row {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 14px; border-top: 1px solid var(--ink);
        }
        .po-total-label { font-size: 13px; font-weight: 600; color: var(--ink); }
        .po-total-val { font-family: var(--font-mono); font-size: 20px; font-weight: 700; color: var(--ink); }
        .po-auto-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: var(--radius-pill);
          background: #DCFCE7; color: #15803D; font-size: 11px; font-weight: 600; font-family: var(--font-mono);
        }

        /* ══════════════════════════════════════════
           S4 — THREE MODULES
        ══════════════════════════════════════════ */
        #modules { background: var(--white); padding: 100px 0; }
        .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
        .module-card {
          border: 1px solid #D4DCD9; border-radius: var(--radius-lg); padding: 32px;
          position: relative; overflow: hidden; transition: border-color 0.25s, transform 0.2s;
          background: var(--white);
        }
        .module-card:hover { border-color: #00C488; transform: translateY(-3px); }
        .module-card.featured { border: 2px solid var(--signal-dark); }
        .module-featured-tag {
          position: absolute; top: 0; right: 24px;
          background: var(--signal); color: var(--ink);
          font-size: 10px; font-weight: 600; font-family: var(--font-mono);
          padding: 4px 10px; border-radius: 0 0 8px 8px; letter-spacing: 0.06em;
        }
        .module-icon {
          width: 44px; height: 44px; border-radius: var(--radius);
          background: var(--snow); display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .module-card.featured .module-icon { background: #E8F7F2; }
        .module-icon svg { width: 22px; height: 22px; }
        .module-title { font-family: var(--font-head); font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em; line-height: 1.2; }
        .module-desc { font-size: 14px; color: var(--mute); line-height: 1.65; margin-bottom: 20px; }
        .module-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .module-tag {
          font-family: var(--font-mono); font-size: 10px; color: var(--mute-2);
          padding: 3px 9px; border-radius: var(--radius-pill);
          border: 1px solid #D4DCD9; background: var(--snow);
        }
        .module-card.featured .module-tag { border-color: #86EFAC; background: #F0FDF4; color: #15803D; }

        /* ══════════════════════════════════════════
           S5 — RBAC
        ══════════════════════════════════════════ */
        #rbac { background: var(--ink-2); padding: 100px 0; }
        .rbac-header { margin-bottom: 48px; }

        .role-switcher { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
        .role-tab {
          padding: 8px 18px; border-radius: var(--radius-pill);
          border: 1px solid var(--wire-2); color: var(--mute-2);
          font-size: 13px; font-weight: 500; cursor: pointer;
          background: transparent; font-family: var(--font-body);
          transition: all 0.2s;
        }
        .role-tab:hover { border-color: var(--mute-2); color: var(--white); }
        .role-tab.active { border-color: var(--signal); color: var(--signal); background: rgba(0,229,160,0.08); }

        .rbac-layout { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: start; }

        .role-nav-mock {
          background: var(--ink-3); border: 1px solid var(--wire);
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .role-nav-header {
          padding: 14px 16px; border-bottom: 1px solid var(--wire);
          font-family: var(--font-mono); font-size: 11px; color: var(--mute-2);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .role-nav-user {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-bottom: 1px solid var(--wire);
        }
        .role-nav-avatar {
          width: 30px; height: 30px; border-radius: 50%; background: var(--signal-dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; font-family: var(--font-mono); color: var(--signal);
        }
        .role-nav-name { font-size: 12px; color: var(--white); font-weight: 500; }
        .role-nav-role { font-size: 10px; color: var(--mute-2); font-family: var(--font-mono); }
        .role-nav-items { padding: 8px 0; }
        .role-nav-item {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 16px; font-size: 12px; color: var(--mute-2);
          transition: background 0.15s, color 0.15s;
        }
        .role-nav-item.highlight { color: var(--signal); background: rgba(0,229,160,0.06); }
        .role-nav-item svg { width: 13px; height: 13px; flex-shrink: 0; }

        .rbac-table-wrap { overflow-x: auto; }
        .rbac-table {
          width: 100%; border-collapse: collapse;
          background: var(--ink-3); border-radius: var(--radius-lg);
          overflow: hidden; border: 1px solid var(--wire);
        }
        .rbac-table th {
          font-family: var(--font-mono); font-size: 10px; font-weight: 500;
          color: var(--mute-2); text-transform: uppercase; letter-spacing: 0.1em;
          padding: 14px 20px; text-align: left; background: var(--ink-4);
          border-bottom: 1px solid var(--wire);
        }
        .rbac-table td {
          font-size: 13px; color: var(--ghost); padding: 14px 20px;
          border-bottom: 1px solid var(--wire);
          vertical-align: top; line-height: 1.5;
        }
        .rbac-table tr:last-child td { border-bottom: none; }
        .rbac-table tr.active-row td { background: rgba(0,229,160,0.04); }
        .rbac-table tr.active-row td:first-child { border-left: 2px solid var(--signal); }
        .role-name { font-weight: 600; color: var(--white); font-family: var(--font-head); font-size: 14px; }
        .views-list { font-size: 11px; color: var(--mute-2); font-family: var(--font-mono); line-height: 1.6; }

        /* ══════════════════════════════════════════
           S6 — TECH PILLARS
        ══════════════════════════════════════════ */
        #pillars { background: var(--snow); padding: 100px 0; }
        .pillars-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 56px; }
        .pillar-card {
          background: var(--white); border: 1px solid #D4DCD9;
          border-radius: var(--radius-lg); padding: 32px;
          transition: border-color 0.2s;
        }
        .pillar-card:hover { border-color: var(--signal-dark); }
        .pillar-number {
          font-family: var(--font-mono); font-size: 11px; color: var(--mute-2);
          margin-bottom: 16px; letter-spacing: 0.08em;
        }
        .pillar-title { font-family: var(--font-head); font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em; }
        .pillar-desc { font-size: 14px; color: var(--mute); line-height: 1.65; margin-bottom: 20px; }
        .pillar-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .pillar-tag {
          font-family: var(--font-mono); font-size: 10px; color: var(--signal-dark);
          padding: 3px 9px; border-radius: var(--radius-pill);
          border: 1px solid #86EFAC; background: #F0FDF4;
        }

        /* ══════════════════════════════════════════
           S7 — CTA
        ══════════════════════════════════════════ */
        #cta { background: var(--ink); padding: 120px 0; text-align: center; border-top: 1px solid var(--wire); }
        
        /* Font Change Applied here for requested CTA string line wrapper */
        .cta-h2 { font-family: var(--font-mono); font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--white); margin-bottom: 16px; line-height: 1.15; }
        .cta-h2 em { color: var(--signal); font-style: normal; }
        .cta-p { font-size: 17px; color: var(--mute-2); margin-bottom: 40px; }
        .cta-actions { display: flex; align-items: center; justify-content: center; gap: 16px; }

        /* FOOTER */
        footer {
          background: var(--ink); border-top: 1px solid var(--wire);
          padding: 24px 48px; display: flex; align-items: center; justify-content: space-between;
        }
        .footer-copy { font-family: var(--font-mono); font-size: 11px; color: var(--mute); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 12px; color: var(--mute); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--white); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          nav { padding: 0 24px; }
          .nav-links { display: none; }
          .container { padding: 0 24px; }
          .hero-h1 { font-size: 32px; }
          .hero-stats { flex-direction: column; gap: 16px; }
          .hero-stat, .hero-stat:last-child, .hero-stat:nth-child(2) { padding: 0; border: none; }
          .metric-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-bottom { grid-template-columns: 1fr; }
          .flow-steps { grid-template-columns: 1fr; }
          .flow-arrow { transform: rotate(90deg); }
          .modules-grid, .pillars-grid { grid-template-columns: 1fr; }
          .rbac-layout { grid-template-columns: 1fr; }
          footer { flex-direction: column; gap: 12px; text-align: center; }
          .dash-sidebar { display: none; }
          .dash-body { grid-template-columns: 1fr; }
        }
      `}</style>

            {/* ── NAV ── */}
            <nav id="nav" className={scrolled ? 'scrolled' : ''}>
                <a href="#hero" className="nav-logo">
                    <div class="logo-mark">
                        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10L7 4L12 10" stroke="#0A0C0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="7" cy="4" r="1.5" fill="#0A0C0B" />
                        </svg>
                    </div>
                    StockVantage
                </a>
                <div className="nav-links">
                    <a href="#dashboard" className="nav-link">Dashboard</a>
                    <a href="#pipeline" className="nav-link">Procurement</a>
                    <a href="#modules" className="nav-link">Inventory</a>
                    <a href="#rbac" className="nav-link">Access Control</a>
                    <a href="#pillars" className="nav-link">Architecture</a>
                </div>
                <button className="nav-cta">Request Demo</button>
            </nav>

            {/* ══ S1: HERO ══ */}
            <section id="hero">
                <div className="hero-grid"></div>
                <div className="container">
                    <div className="hero-inner">
                        <div className="hero-pill reveal">
                            <span className="dot"></span>
                            Multi-Tenant SaaS &nbsp;·&nbsp; Laravel 11 + React 18 + Inertia.js
                        </div>
                        {/* Font size adjustment class rule variant applied here */}
                        <h1 className="hero-h1 reveal">
                            Replace Spreadsheets<br />and Email Approvals<br />with <em>One Unified</em><br />Procurement Platform
                        </h1>
                        <p className="hero-p reveal">
                            StockVantage gives distributed enterprise teams a shared procurement pipeline, automated approval routing, and real-time inventory visibility — all in one digitally isolated tenant environment.
                        </p>
                        <div className="hero-actions reveal">
                            <a href="#dashboard" className="btn-primary">
                                See the Dashboard
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                            <a href="#pillars" className="btn-ghost">View Architecture</a>
                        </div>
                        <div className="hero-stats reveal">
                            <div className="hero-stat">
                                {/* Changed text descriptor statement logic indicator */}
                                <span className="hero-stat-val">&lt; $500*</span>
                                <span className="hero-stat-lbl">Adjustable auto-approved threshold</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-val">PO-2026-0001</span>
                                <span className="hero-stat-lbl">Immutable sequential format</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-val">decimal(15,2)</span>
                                <span className="hero-stat-lbl">Banking-grade precision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S2: DASHBOARD ══ */}
            <section id="dashboard">
                <div className="container">
                    <div className="dashboard-header reveal">
                        <div className="section-label">Executive Dashboard</div>
                        <h2 className="section-heading">The command center your<br />finance team actually needs</h2>
                        <p className="section-sub">Every metric your operations team needs, surfaced the moment they authenticate.</p>
                    </div>

                    <div className="browser-frame reveal">
                        <div className="browser-chrome">
                            <div className="chrome-dots">
                                <div className="chrome-dot r"></div>
                                <div className="chrome-dot y"></div>
                                <div className="chrome-dot g"></div>
                            </div>
                            <div className="chrome-url">
                                <span className="live-dot"></span>
                                acme-corp.stockvantage.app/dashboard
                            </div>
                        </div>

                        {/* Dashboard UI Frame Content View Wrapper */}
                        <div className="dash-ui">
                            <div className="dash-topbar">
                                <div className="dash-topbar-left">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <rect x="1" y="1" width="5" height="5" rx="1" stroke="#5A6E67" stroke-width="1.2" />
                                        <rect x="8" y="1" width="5" height="5" rx="1" stroke="#5A6E67" stroke-width="1.2" />
                                        <rect x="1" y="8" width="5" height="5" rx="1" stroke="#5A6E67" stroke-width="1.2" />
                                        <rect x="8" y="8" width="5" height="5" rx="1" stroke="#5A6E67" stroke-width="1.2" />
                                    </svg>
                                    <span style={{ color: '#0A0C0B', fontWeight: 600, fontSize: '13px' }}>Overview</span>
                                    <span style={{ color: '#D4DCD9' }}>/</span>
                                    <span>June 2026</span>
                                </div>
                                <div className="dash-topbar-right">
                                    <span style={{ fontSize: '12px', color: '#7A9189', fontFamily: 'var(--font-mono)' }}>acme-corp</span>
                                    <div className="topbar-avatar">JD</div>
                                </div>
                            </div>

                            <div className="dash-body">
                                {/* Changes applied to Nav List ordering order per specification request rules */}
                                <aside className="dash-sidebar">
                                    <div className="dash-sidebar-logo">
                                        <div className="sm"></div>
                                        StockVantage
                                    </div>
                                    <div className="dash-nav-item active">
                                        <svg viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Dashboard
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Suppliers
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><path d="M2 3h11v9H2z" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Catalog
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><path d="M1 4h13M4 1v3M11 1v3" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Purchase Requests
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><path d="M3 1v13l4-3 4 3V1z" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Purchase Orders
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Inventory
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><path d="M1 4l6.5-3L14 4v7l-6.5 3L14 4" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Warehouses
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><path d="M2 2h11v7M2 13h11" stroke="currentColor" stroke-width="1.2" /></svg>
                                        GRN
                                    </div>
                                    <div className="dash-nav-item">
                                        <svg viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="3" stroke="currentColor" stroke-width="1.2" /><path d="M2 13a6 6 0 0111 0" stroke="currentColor" stroke-width="1.2" /></svg>
                                        Users
                                    </div>
                                </aside>

                                {/* Dashboard Metrics Content View Components Grid */}
                                <main className="dash-main">
                                    <div className="dash-section-title">Overview Metrics</div>
                                    <div className="metric-grid">
                                        <div className="metric-tile">
                                            <div className="metric-label">TOTAL SPEND (MTD)</div>
                                            <div className="metric-value">$142,384.50</div>
                                            <div className="metric-sub up">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '4px' }}><path d="M2 7l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                12% vs last month
                                            </div>
                                        </div>
                                        <div className="metric-tile">
                                            <div className="metric-label">ACTIVE PO COUNT</div>
                                            <div className="metric-value">18 Active</div>
                                            <div className="metric-sub">6 awaiting signature</div>
                                        </div>
                                        <div className="metric-tile">
                                            <div className="metric-label">AUTO-APPROVED</div>
                                            {/* Adjustable threshold text applied here */}
                                            <div className="metric-value">64.2%</div>
                                            <div className="metric-sub active-lbl">Adjustable configuration setting</div>
                                        </div>
                                        <div className="metric-tile">
                                            <div className="metric-label">SUPPLIER SLA COMPLIANCE</div>
                                            <div className="metric-value">98.4%</div>
                                            <div className="metric-sub up">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '4px' }}><path d="M2 7l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                0.5% this week
                                            </div>
                                        </div>
                                    </div>

                                    <div className="chart-wrap">
                                        <div className="chart-head">
                                            <div className="chart-title">Spend Analytics Over Time</div>
                                            <div className="chart-period">Jan — Jun 2026</div>
                                        </div>
                                        <svg id="spendChart" viewBox="0 0 600 120" fill="none">
                                            <path d="M0 100 Q 100 80, 200 85 T 400 40 T 600 20" stroke="#00C488" strokeWidth="2" fill="none" />
                                            <path d="M0 100 Q 100 80, 200 85 T 400 40 T 600 20 L 600 120 L 0 120 Z" fill="rgba(0,196,136,0.05)" />
                                        </svg>
                                    </div>

                                    <div className="dash-bottom">
                                        <div className="panel">
                                            <div className="panel-title">Recent Purchase Orders</div>
                                            <table className="po-table">
                                                <thead>
                                                    <tr>
                                                        <th>PO Number</th>
                                                        <th>Supplier</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="po-num">PO-2026-0012</td>
                                                        <td>Global Logistics Inc.</td>
                                                        <td>$14,250.00</td>
                                                        <td><span className="badge badge-amber">Awaiting Approval</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="po-num">PO-2026-0011</td>
                                                        <td>Nexus Tech Supply</td>
                                                        <td>$2,405.00</td>
                                                        <td><span className="badge badge-green">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="po-num">PO-2026-0010</td>
                                                        <td>Vertex Industrial Ltd.</td>
                                                        <td>$450.00</td>
                                                        <td><span className="badge badge-green">Approved (Auto)</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="panel">
                                            <div className="panel-title">System Alerts</div>
                                            <div className="alert-item">
                                                <span className="alert-dot critical"></span>
                                                <div className="alert-text">
                                                    <strong>Stockout Risk Detected</strong>
                                                    Item SKU-4022 (Ethernet Cables) is below safe stock minimum limit parameters.
                                                </div>
                                                <span className="alert-units">12 units left</span>
                                            </div>
                                            <div className="alert-item">
                                                <span className="alert-dot warning"></span>
                                                <div className="alert-text">
                                                    <strong>Pending Invoice Match Overdue</strong>
                                                    PO-2026-0008 shows variance deviation check values against incoming GRN files.
                                                </div>
                                                <span className="alert-units">2d active</span>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S3: PIPELINE FLOW ══ */}
            <section id="pipeline">
                <div className="container">
                    <div className="pipeline-header text-center">
                        <div className="section-label" style={{ color: 'var(--signal-dark)' }}>Procurement Pipeline Logic</div>
                        <h2 className="section-heading dark">How automated approval paths guard capital balance pools</h2>
                        <p className="section-sub dark">Route spending automatically based on organization hierarchies, department codes, or transaction size variables safely.</p>
                    </div>

                    <div className="flow-wrap">
                        <div className="flow-steps">
                            <div className="flow-step">
                                <div className="step-num">Step 01</div>
                                <div className="step-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
                                </div>
                                <div className="step-title">Purchase Request Raised</div>
                                <div className="step-desc">Department employees submit list requests with specified vendor allocations.</div>
                            </div>

                            <div className="flow-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>

                            <div className="flow-step branch-node">
                                <div className="step-num" style={{ color: 'var(--signal)' }}>Conditional Routing Engine</div>
                                <div className="step-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2"><path d="M12 22l10-10L12 2 2 12z" /></svg>
                                </div>
                                <div className="step-title">Threshold Evaluation Rule</div>
                                {/* Fixed copy value adjusted statement block marker */}
                                <div className="step-desc">System analyzes overall order value limits dynamically (e.g., set to an adjustable $500 default value parameter).</div>

                                <div className="flow-branch-row">
                                    <div className="branch-path auto">
                                        <div className="branch-label"> Under Threshold</div>
                                        <div className="branch-status">Instant System Signature Bypass Auto Routing</div>
                                    </div>
                                    <div className="branch-path await">
                                        <div className="branch-label"> Over Threshold</div>
                                        <div className="branch-status">Hierarchical Senior Management Chain Escrow Holds</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flow-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>

                            <div className="flow-step">
                                <div className="step-num">Step 03</div>
                                <div className="step-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                </div>
                                <div className="step-title">Immutable Purchase Order Sent</div>
                                <div className="step-desc">Vendor receives cryptographic verification hashes containing tracking payloads safely via programmatic delivery engines.</div>
                            </div>
                        </div>
                    </div>

                    {/* PO Card Preview component with target font style updates */}
                    <div className="po-preview">
                        <div className="po-preview-header">
                            <div>
                                {/* Custom style mapping applied below */}
                                <div className="po-co-name">ACME CORPORATION AP ENVELOPE STRUCT</div>
                                <div className="po-co-sub">TENANT CONTEXT SHARED IDENTIFIER STRING CODE</div>
                            </div>
                            <div className="po-meta">
                                <div className="po-meta-title">PURCHASE ORDER</div>
                                {/* Custom style mapping applied below */}
                                <div className="po-meta-num">PO-2026-0010</div>
                            </div>
                        </div>

                        <div className="po-details-row">
                            <div>
                                <div className="po-detail-label">VENDOR</div>
                                <div className="po-detail-val">Nexus Tech Supply Partners Ltd</div>
                            </div>
                            <div>
                                <div className="po-detail-label">DATE STAMP VALID</div>
                                <div className="po-detail-val">June 14, 2026</div>
                            </div>
                            <div>
                                <div className="po-detail-label">TERMS</div>
                                <div className="po-detail-val">Net 30 Account Balances</div>
                            </div>
                        </div>

                        <table className="po-line-table">
                            <thead>
                                <tr>
                                    <th>Line Item Description Spec Payload</th>
                                    <th>Qty</th>
                                    <th>Unit Value</th>
                                    <th>Net Ext</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Enterprise Node Router Switchboards Hub Unit v4</td>
                                    <td>1</td>
                                    <td>$320.00</td>
                                    <td>$320.00</td>
                                </tr>
                                <tr>
                                    <td>Shielded Cat6 Ground Cable Spool Bundles (100m)</td>
                                    <td>2</td>
                                    <td>$65.00</td>
                                    <td>$130.00</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="po-total-row">
                            {/* Adjustable indicator label addition updates applied inside preview sub-text loops */}
                            <div className="po-auto-tag">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                System Auto-Approved (Adjustable Threshold Active)
                            </div>
                            {/* Custom style mapping applied below */}
                            <div className="po-total-val">$450.00</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S4: THREE MODULES ══ */}
            <section id="modules">
                <div className="container">
                    <div className="reveal">
                        <div className="section-label" style={{ color: 'var(--signal-dark)' }}>Unified Core Modules</div>
                        <h2 className="section-heading dark">Engineered architecture components for isolated resource ledger structures</h2>
                        <p className="section-sub dark">Three interconnected software layout sections mapping data securely inside application schemas.</p>
                    </div>

                    <div className="modules-grid">
                        <div className="module-card">
                            <div className="module-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l-7 4a2 2 0 002 0l-7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>
                            </div>
                            <h3 className="module-title">Multi-Warehouse Inventory Ledger</h3>
                            <p className="module-desc">Track unit movements across physically discrete distribution nodes. Maintain double-entry records matching physical stock adjustments with verification histories.</p>
                            <div className="module-tags">
                                <span className="module-tag">FIFO Engine</span>
                                <span className="module-tag">SKU Variant Maps</span>
                                <span className="module-tag">Safe Allocation Buffers</span>
                            </div>
                        </div>

                        <div className="module-card featured">
                            <div className="module-featured-tag">CORE FLOW ENGINE</div>
                            <div className="module-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
                            </div>
                            <h3 className="module-title">Smart Procurement Lifecycle Management</h3>
                            <p className="module-desc">Convert approved requisition payloads into binding business orders instantly. Prevent item duplicate risks using system configuration sequence trackers.</p>
                            <div className="module-tags">
                                <span className="module-tag">Adjustable Conditional Engine</span>
                                <span className="module-tag">PDF Rendering Pipelines</span>
                                <span className="module-tag">Vendor Portal Link Sync</span>
                            </div>
                        </div>

                        <div className="module-card">
                            <div className="module-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                            </div>
                            <h3 className="module-title">Three-Way Invoice Reconciliation Engine</h3>
                            <p className="module-desc">Cross-analyze purchase authorization records alongside active warehouse confirmation files and billing sheets automatically to ensure value precision compliance scores.</p>
                            <div className="module-tags">
                                <span className="module-tag">Variance Flag Alerts</span>
                                <span className="module-tag">AP Voucher Generation</span>
                                <span className="module-tag">Audit Trail Logs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S5: RBAC ══ */}
            <section id="rbac">
                <div className="container">
                    <div className="rbac-header reveal">
                        <div className="section-label">Enterprise Access Security Matrix</div>
                        <h2 className="section-heading">Role-Based Access Control that satisfies rigid audit validation requirements</h2>
                        <p className="section-sub">Granular token authentication boundaries guarding sensitive financial asset structures from internal or external perimeter breach vectors.</p>
                    </div>

                    <div className="role-switcher">
                        <button className={`role-tab ${activeRole === 'procurement' ? 'active' : ''}`} onClick={() => setActiveRole('procurement')}>Procurement Clerk Interface</button>
                        <button className={`role-tab ${activeRole === 'finance' ? 'active' : ''}`} onClick={() => setActiveRole('finance')}>Finance Director Viewport</button>
                        <button className={`role-tab ${activeRole === 'warehouse' ? 'active' : ''}`} onClick={() => setActiveRole('warehouse')}>Warehouse Operator Console</button>
                    </div>

                    <div className="rbac-layout">
                        <div className="role-nav-mock">
                            <div className="role-nav-header">Dynamic Context Tree Menu View</div>
                            <div className="role-nav-user">
                                <div className="role-nav-avatar">
                                    {activeRole === 'procurement' && 'SC'}
                                    {activeRole === 'finance' && 'FD'}
                                    {activeRole === 'warehouse' && 'WO'}
                                </div>
                                <div>
                                    <div className="role-nav-name">
                                        {activeRole === 'procurement' && 'Sarah Connor'}
                                        {activeRole === 'finance' && 'Felix Dennis'}
                                        {activeRole === 'warehouse' && 'Walter Owen'}
                                    </div>
                                    <div className="role-nav-role">
                                        {activeRole === 'procurement' && 'Clerk Account Access'}
                                        {activeRole === 'finance' && 'Director Executive token'}
                                        {activeRole === 'warehouse' && 'Logistics Admin Scope'}
                                    </div>
                                </div>
                            </div>

                            <div className="role-nav-items">
                                <div className={`role-nav-item ${activeRole === 'procurement' ? 'highlight' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg>
                                    Purchase Requests Panel
                                </div>
                                <div className={`role-nav-item ${activeRole === 'finance' ? 'highlight' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
                                    Approval Queues Pipeline
                                </div>
                                <div className={`role-nav-item ${activeRole === 'warehouse' ? 'highlight' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l-7 4a2 2 0 002 0l-7-4A2 2 0 0021 16z" /></svg>
                                    Goods Receipt (GRN) Desk
                                </div>
                            </div>
                        </div>

                        <div className="rbac-table-wrap">
                            <table className="rbac-table">
                                <thead>
                                    <tr>
                                        <th>Security Context Role Group</th>
                                        <th>Permitted API Resource Action Handlers</th>
                                        <th>Data Visibility Scope Bound Parameters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={activeRole === 'procurement' ? 'active-row' : ''}>
                                        <td><span className="role-name">Procurement Personnel Group</span></td>
                                        <td><code>pr.create</code>, <code>pr.update</code>, <code>po.view-assigned</code></td>
                                        <td className="views-list">Can generate draft requests; can modify unsubmitted items inside local department branch scope parameters.</td>
                                    </tr>
                                    <tr className={activeRole === 'finance' ? 'active-row' : ''}>
                                        <td><span className="role-name">Finance Management Pool</span></td>
                                        <td><code>po.approve</code>, <code>po.sign_cryptographic</code>, <code>invoice.override</code></td>
                                        <td className="views-list">Full financial scope control access over global cross-tenant accounts up to explicit limit margins.</td>
                                    </tr>
                                    <tr className={activeRole === 'warehouse' ? 'active-row' : ''}>
                                        <td><span className="role-name">Logistics Operational Staff</span></td>
                                        <td><code>grn.create</code>, <code>inventory.count_adjust</code>, <code>sku.view</code></td>
                                        <td className="views-list">Restricted strictly to incoming shipment logging desks and stock level variance tally sheets.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S6: TECH PILLARS ══ */}
            <section id="pillars">
                <div className="container">
                    <div className="reveal">
                        <div className="section-label" style={{ color: 'var(--signal-dark)' }}>Architectural Integrity Foundations</div>
                        <h2 className="section-heading dark">Built for scaling enterprise ledger infrastructure demands safely</h2>
                        <p className="section-sub dark">Our technology design decisions prioritize data precision, transaction record persistence, and system performance efficiency metrics.</p>
                    </div>

                    <div className="pillars-grid">
                        <div className="pillar-card">
                            <div className="pillar-number">PILLAR 01 / SCHEMATIC PRECISION RULE</div>
                            <h3 className="pillar-title">Decimal Precision Storage Layering</h3>
                            <p className="pillar-desc">Financial transaction values are kept safe using floating-point format bypass tracking configurations. Every numeric balance ledger column uses strict base storage structures directly to ensure zero calculation divergence risks during audits.</p>
                            <div className="pillar-tags">
                                <span className="pillar-tag">No Float Drift Error</span>
                                <span className="pillar-tag">ISO Currency Bounds</span>
                                <span className="pillar-tag">Exact Math Assertions</span>
                            </div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-number">PILLAR 02 / NETWORK MULTI-TENANCY</div>
                            <h3 className="pillar-title">Logically Disconnected Foreign Key Isolation Rings</h3>
                            <p className="pillar-desc">Customer transactional pools are filtered dynamically via active context intercept rules. Database engines prevent scope cross-contamination leaks by enforcing strict global context conditions on every query handler.</p>
                            <div className="pillar-tags">
                                <span className="pillar-tag">Tenant Isolation Key Guards</span>
                                <span className="pillar-tag">Leaked Request Preventions</span>
                                <span className="pillar-tag">Row-Level Safety Enforcements</span>
                            </div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-number">PILLAR 03 / RECORD PERSISTENCE TRACKING</div>
                            <h3 className="pillar-title">Sequential Document Ledger Integrity Chains</h3>
                            <p className="pillar-desc">System records are generated sequentially using strict, un-skippable incremental indexing routines. Database layers keep reference numbers locked against gaps to withstand continuous validation reviews flawlessly.</p>
                            <div className="pillar-tags">
                                <span className="pillar-tag">Gapless Serial Engines</span>
                                <span className="pillar-tag">Concurrency Safety Mechanisms</span>
                                <span className="pillar-tag">Chronological Audit Proofs</span>
                            </div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-number">PILLAR 04 / INTERACTIVE INTERNET VISIBILITY</div>
                            <h3 className="pillar-title">Hydrated Component Hydration Intertia Engines</h3>
                            <p className="pillar-desc">Enjoy instantaneous layout transition speeds with integrated full-stack server state mapping tools. Application data is securely channeled down to runtime contexts without requiring manual client-side API state synchronization blocks.</p>
                            <div className="pillar-tags">
                                <span className="pillar-tag">Zero Hydration Latencies</span>
                                <span className="pillar-tag">Secure Prop Channels</span>
                                <span className="pillar-tag">Fast Navigation Processing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ S7: CTA ══ */}
            <section id="cta">
                <div className="container">
                    {/* Style rule modifications applied here to reflect target monospace font layout requests */}
                    <h2 className="cta-h2">
                        Ready to replace your procurement spreadsheets?
                    </h2>
                    <p className="cta-p">Deploy an isolated tenant ecosystem console window tailored specifically for your operations group requirements today.</p>
                    <div className="cta-actions">
                        <button className="btn-primary">Schedule Technical Architecture Consultation Call</button>
                        <button className="btn-ghost">Read Developer Documentation Library Guides</button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="footer-copy">
                    &copy; 2026 StockVantage Software Technologies Inc. All core technical operations rights reserved.
                </div>
                <div className="footer-links">
                    <a href="#hero">Terms of API Platform Usage agreement Contracts</a>
                    <a href="#hero">Data Privacy Guard Protocols Documentation</a>
                    <a href="#hero">SLA Performance Infrastructure Metrics</a>
                </div>
            </footer>
        </>
    );
}