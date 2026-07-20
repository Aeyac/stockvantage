import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";

const MoreVerticalIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);



export default function RowActionsMenu({
    viewRoute,
    onDelete,
    canDelete = true,
    onApprove,
    onReject,
    isPending = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Actions menu"
            >
                <MoreVerticalIcon />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-1 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    {/* Primary Actions (Approve / Reject for pending items) */}
                    {isPending && (
                        <div className="py-1">
                            {onApprove && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onApprove();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 font-medium"
                                >
                                    <CheckIcon />
                                    Approve
                                </button>
                            )}
                            {onReject && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onReject();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                                >
                                    <XIcon />
                                    Reject
                                </button>
                            )}
                        </div>
                    )}

                    {/* Standard Actions (View / Delete) */}
                    <div className="py-1">
                        {viewRoute && (
                            <Link
                                href={viewRoute}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                <EyeIcon />
                                View Details
                            </Link>
                        )}
                        {canDelete && onDelete && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    onDelete();
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <TrashIcon />
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}