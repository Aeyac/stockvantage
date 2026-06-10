import { useEffect, useState } from 'react'

const C = {
    primary: '#4edea3',
    onSurface: '#e3e2e6',
    error: '#ffb4ab',
}

export default function FlashMessage({ flash }) {
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowToast(true)

            const timer = setTimeout(() => {
                setShowToast(false)
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [flash])


    {/* TOAST NOTIFICATION */ }
    return (
        <>
            <style>{`
                .ci-toast-container {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 9999;
                }

                .ci-toast {
                    min-width: 320px;
                    max-width: 420px;
                    padding: 16px 18px;
                    border-radius: 16px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    backdrop-filter: blur(12px);
                    box-shadow:
                        0 10px 30px rgba(0,0,0,0.45),
                        0 0 0 1px rgba(255,255,255,0.04);
                    animation: ci-toast-in 0.25s ease;
                }

                .ci-toast-success {
                    background: rgba(15, 30, 23, 0.96);
                    border: 1px solid ${C.primary}35;
                    color: ${C.primary};
                }

                .ci-toast-error {
                    background: rgba(35, 16, 16, 0.96);
                    border: 1px solid ${C.error}35;
                    color: ${C.error};
                }

                .ci-toast-content {
                    flex: 1;
                }

                .ci-toast-title {
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 2px;
                }

                .ci-toast-message {
                    font-size: 13px;
                    line-height: 1.45;
                    color: ${C.onSurface};
                }

                .ci-toast-close {
                    background: transparent;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    opacity: 0.7;
                    padding: 0;
                    display: flex;
                    align-items: center;
                }

                .ci-toast-close:hover {
                    opacity: 1;
                }

                @keyframes ci-toast-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px) translateX(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) translateX(0);
                    }
                }
            `}</style>

            {
                showToast && (
                    <div className="ci-toast-container">

                        {flash?.success && (
                            <div className="ci-toast ci-toast-success">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>

                                <div className="ci-toast-content">
                                    <div className="ci-toast-title">
                                        Success
                                    </div>

                                    <div className="ci-toast-message">
                                        {flash.success}
                                    </div>
                                </div>

                                <button
                                    className="ci-toast-close"
                                    onClick={() => setShowToast(false)}
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {flash?.error && (
                            <div className="ci-toast ci-toast-error">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>

                                <div className="ci-toast-content">
                                    <div className="ci-toast-title">
                                        Error
                                    </div>

                                    <div className="ci-toast-message">
                                        {flash.error}
                                    </div>
                                </div>

                                <button
                                    className="ci-toast-close"
                                    onClick={() => setShowToast(false)}
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                    </div>
                )
            }
        </>
    )
}




// light mode version:
// import { useEffect, useState } from 'react'

// const C = {
//     primary: '#007a55',     // Accessible dark green for light backgrounds
//     onSurface: '#5A6E67',   // Slate gray for the body message
//     error: '#ac1d1d',       // Accessible dark red for light backgrounds
// }

// export default function FlashMessage({ flash }) {
//     const [showToast, setShowToast] = useState(false)

//     useEffect(() => {
//         if (flash?.success || flash?.error) {
//             setShowToast(true)

//             const timer = setTimeout(() => {
//                 setShowToast(false)
//             }, 4000)

//             return () => clearTimeout(timer)
//         }
//     }, [flash])

//     return (
//         <>
//             <style>{`
//                 .ci-toast-container {
//                     position: fixed;
//                     bottom: 24px;
//                     right: 24px;
//                     z-index: 9999;
//                 }

//                 .ci-toast {
//                     min-width: 320px;
//                     max-width: 420px;
//                     padding: 16px 18px;
//                     border-radius: 16px;
//                     display: flex;
//                     align-items: flex-start;
//                     gap: 12px;
//                     backdrop-filter: blur(12px);
//                     /* Light mode soft shadow mix */
//                     box-shadow:
//                         0 10px 25px rgba(0, 0, 0, 0.06),
//                         0 4px 12px rgba(0, 0, 0, 0.03),
//                         0 0 0 1px rgba(0, 0, 0, 0.04);
//                     animation: ci-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
//                 }

//                 /* FORCE LIGHT MODE BACKGROUNDS */
//                 .ci-toast-success {
//                     background: rgba(255, 255, 255, 0.95) !important;
//                     border: 1px solid #00C48840 !important;
//                     color: ${C.primary} !important;
//                 }

//                 .ci-toast-error {
//                     background: rgba(255, 255, 255, 0.95) !important;
//                     border: 1px solid #FFB4AB60 !important;
//                     color: ${C.error} !important;
//                 }

//                 .ci-toast-content {
//                     flex: 1;
//                 }

//                 .ci-toast-title {
//                     font-size: 14px;
//                     font-weight: 700;
//                     margin-bottom: 2px;
//                     color: #0A0C0B !important; /* Absolute dark ink text for header */
//                 }

//                 .ci-toast-message {
//                     font-size: 13px;
//                     line-height: 1.45;
//                     color: ${C.onSurface} !important;
//                 }

//                 .ci-toast-close {
//                     background: transparent;
//                     border: none;
//                     color: #5A6E67 !important;
//                     cursor: pointer;
//                     opacity: 0.6;
//                     padding: 0;
//                     display: flex;
//                     align-items: center;
//                     font-size: 11px;
//                     margin-top: 2px;
//                 }

//                 .ci-toast-close:hover {
//                     opacity: 1;
//                     color: #0A0C0B !important;
//                 }

//                 @keyframes ci-toast-in {
//                     from {
//                         opacity: 0;
//                         transform: translateY(12px) scale(0.98);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0) scale(1);
//                     }
//                 }
//             `}</style>

//             {
//                 showToast && (
//                     <div className="ci-toast-container">

//                         {flash?.success && (
//                             <div className="ci-toast ci-toast-success">
//                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginTop: '1px' }}>
//                                     <polyline points="20 6 9 17 4 12" />
//                                 </svg>

//                                 <div className="ci-toast-content">
//                                     <div className="ci-toast-title">
//                                         Success
//                                     </div>
//                                     <div className="ci-toast-message">
//                                         {flash.success}
//                                     </div>
//                                 </div>

//                                 <button className="ci-toast-close" onClick={() => setShowToast(false)}>
//                                     ✕
//                                 </button>
//                             </div>
//                         )}

//                         {flash?.error && (
//                             <div className="ci-toast ci-toast-error">
//                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginTop: '1px' }}>
//                                     <circle cx="12" cy="12" r="10" />
//                                     <line x1="12" y1="8" x2="12" y2="12" />
//                                     <line x1="12" y1="16" x2="12.01" y2="16" />
//                                 </svg>

//                                 <div className="ci-toast-content">
//                                     <div className="ci-toast-title">
//                                         Error
//                                     </div>
//                                     <div className="ci-toast-message">
//                                         {flash.error}
//                                     </div>
//                                 </div>

//                                 <button className="ci-toast-close" onClick={() => setShowToast(false)}>
//                                     ✕
//                                 </button>
//                             </div>
//                         )}

//                     </div>
//                 )
//             }
//         </>
//     )
// }