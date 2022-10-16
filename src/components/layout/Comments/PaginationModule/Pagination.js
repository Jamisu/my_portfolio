import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';
const Pagination = props => {
  const {onPageChange, totalCount, siblingCount = 0, currentPage, pageSize, className} = props;

  const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize});
  console.log('paginationRange', paginationRange);
  
  if ( paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={'pagination-container ' + className}> 

      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={pageNumber} className={classnames('pagination-item', { selected: pageNumber === currentPage })}
            onClick={() => onPageChange(pageNumber)} >
            {pageNumber}
          </li>
        );
      })}

    </ul>
  );
};

export default Pagination;
