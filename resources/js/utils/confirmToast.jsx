import toast from 'react-hot-toast';

/**
 * Reusable Confirmation Toast
 * @param {string} message - The warning message to display.
 * @returns {Promise<boolean>} - Resolves to true if confirmed, false otherwise.
 */
export default function confirmToast(message = "Are you sure you want to proceed?") {
    return new Promise((resolve) => {
        // Dismiss any existing toasts to prevent clutter
        toast.dismiss();

        const toastId = toast(
            (t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
                    {/* Message */}
                    <div style={{ fontSize: '13px', color: '#0A0C0B', fontWeight: '500' }}>
                        {message}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                            onClick={() => {
                                toast.dismiss(toastId);
                                resolve(false); // User canceled
                            }}
                            style={{
                                background: '#F2F5F4',
                                color: '#5A6E67',
                                border: '1px solid #E2E8E6',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                toast.dismiss(toastId);
                                resolve(true); // User confirmed
                            }}
                            style={{
                                background: '#E8F7F2',
                                color: '#007A55',
                                border: '1px solid #00C488',
                                padding: '4px 10px',
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
                duration: Infinity, // Don't auto-close; wait for user action
                position: 'top-center', // Centered focus
                style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8E6',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }
            }
        );
    });
};