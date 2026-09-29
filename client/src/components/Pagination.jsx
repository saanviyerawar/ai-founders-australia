function pageItems(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages = new Set([1, totalPages])
    for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
        if (page > 1 && page < totalPages) pages.add(page)
    }

    const sorted = [...pages].sort((a, b) => a - b)
    const items = []
    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) {
            items.push(`ellipsis-${page}`)
        }
        items.push(page)
    })
    return items
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const items = pageItems(currentPage, totalPages)

    return (
        <nav aria-label="Founder results pages" className="pagination-shell">
            <div className="pagination-summary">
                Page {currentPage} of {totalPages}
            </div>
            <ul className="pagination pagination-compact mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link pagination-direction"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        <i className="bi bi-chevron-left" aria-hidden="true" />
                        <span className="pagination-direction-label">Previous</span>
                    </button>
                </li>

                {items.map((item) =>
                    typeof item === 'string' ? (
                        <li key={item} className="page-item disabled" aria-hidden="true">
                            <span className="page-link pagination-ellipsis">…</span>
                        </li>
                    ) : (
                        <li
                            key={item}
                            className={`page-item ${currentPage === item ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(item)}
                                aria-label={`Page ${item}`}
                                aria-current={currentPage === item ? 'page' : undefined}
                            >
                                {item}
                            </button>
                        </li>
                    )
                )}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link pagination-direction"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        <span className="pagination-direction-label">Next</span>
                        <i className="bi bi-chevron-right" aria-hidden="true" />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
