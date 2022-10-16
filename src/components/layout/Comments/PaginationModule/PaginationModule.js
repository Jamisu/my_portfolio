import Pagination from './Pagination';

const PaginationModule = ({page, setPage, pageSize, dataLength}) => {
    console.log('init Pagination', dataLength);
    return <Pagination
        className="pagination-bar"
        currentPage={page}
        totalCount={dataLength}
        pageSize={pageSize}
        onPageChange={page => setPage(page)}
    />
}

export default PaginationModule