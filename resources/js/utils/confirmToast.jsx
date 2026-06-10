import toast from 'react-hot-toast';

/**
 * Upgraded Reusable Confirmation Toast with "Don't show again"
 * @param {string} message - The warning message to display.
 * @param {string} key - A unique storage key (e.g., 'skip-delete-request-warning')
 * @returns {Promise<boolean>} - Resolves to true if confirmed/skipped, false otherwise.
 */
export default function confirmToast(message = "Are you sure you want to proceed?", key = null) {
    return new Promise((resolve) => {
        if (key && localStorage.getItem(key) === 'true') {
            return resolve(true); // Automatically confirm without showing the toast
        }

        toast.dismiss();

        let dontShowAgainChecked = false;

        const toastId = toast(
            (t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '250px' }}>
                    {/* Message */}
                    <div style={{ fontSize: '13px', color: '#0A0C0B', fontWeight: '500', lineHeight: '1.4' }}>
                        {message}
                    </div>

                    {/* "Don't show again" Checkbox Line */}
                    {key && (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                            <input
                                type="checkbox"
                                onChange={(e) => { dontShowAgainChecked = e.target.checked; }}
                                style={{
                                    accentColor: '#00C488',
                                    cursor: 'pointer',
                                    width: '14px',
                                    height: '14px'
                                }}
                            />
                            <span style={{ fontSize: '11px', color: '#5A6E67' }}>
                                Don't show this warning again
                            </span>
                        </label>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #F2F5F4', paddingTop: '10px' }}>
                        <button
                            onClick={() => {
                                toast.dismiss(toastId);
                                resolve(false); // Cancelled
                            }}
                            style={{
                                background: '#F2F5F4',
                                color: '#5A6E67',
                                border: '1px solid #E2E8E6',
                                padding: '5px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // 2. If checked upon confirmation, save the preference permanently
                                if (key && dontShowAgainChecked) {
                                    localStorage.setItem(key, 'true');
                                }
                                toast.dismiss(toastId);
                                resolve(true); // Confirmed
                            }}
                            style={{
                                background: '#E8F7F2',
                                color: '#007A55',
                                border: '1px solid #00C488',
                                padding: '5px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                position: 'top-center',
                style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8E6',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }
            }
        );
    });
};