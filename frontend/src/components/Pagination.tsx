interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
    }: PaginationProps) => {
        return (
            <div className="flex items-center justify-content mt-4">
                {/* Display current page and total pages */}
                    {/* previous, pages, and next page buttons */}
                    <div className="d-flex justify-content-center my-4">
                    <button 
                        className="btn btn-primary me-2" 
                        onClick={() => onPageChange(currentPage - 1)} 
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button 
                            className={`btn btn-outline-primary me-2 ${page + 1 === currentPage ? 'active' : ''}`} 
                            key={page} 
                            onClick={() => onPageChange(page + 1)}>
                            {page + 1}
                        </button>
                    ))}
                    <button 
                        className="btn btn-primary ms-2" 
                        onClick={() => onPageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>

                {/* Pagination dropdown */}
                <div className="d-flex justify-content-center">
                    <label className="form-label me-2">
                        Results per page:
                        <select 
                            className="form-select" 
                            value={pageSize} 
                            onChange={(e) => {
                                onPageSizeChange(Number(e.target.value));
                                onPageChange(1);
                            }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    };

export default Pagination;