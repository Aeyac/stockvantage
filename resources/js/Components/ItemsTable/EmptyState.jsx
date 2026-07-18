export default function EmptyState({
    title,
    description,
}) {

    return (
        <div className="table-empty">
            <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                />
                <path d="M8 21h8M12 17v4" />
            </svg>

            <h3 className="table-empty-title">
                {title}

            </h3>

            <p className="table-empty-description">
                {description}

            </p>
        </div>
    );

}