import React from 'react';

const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage }) => {
  const numOfPages = Math.ceil(rowCount / rowsPerPage);

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
      <div>
        <button
          style={{
            backgroundColor: currentPage === 1 ? '#888' : '#6777EF', 
            color: 'white', 
            padding: '5px 10px', 
            border: 'none', 
            borderRadius: '5px',
            marginRight: '10px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          style={{
            backgroundColor: currentPage === numOfPages ? '#888' : '#6777EF', 
            color: 'white', 
            padding: '5px 10px', 
            border: 'none', 
            borderRadius: '5px',
            cursor: currentPage === numOfPages ? 'not-allowed' : 'pointer'
          }}
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === numOfPages}
        >
          Next
        </button>
      </div>
      <div>
        <label for="rowsPerPage" style={{marginRight: '10px'}}>Rows per page:</label>
        <select 
          id="rowsPerPage"
          value={rowsPerPage} 
          onChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default CustomPagination;