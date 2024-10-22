import React from 'react';
import { createTheme, Pagination, ThemeProvider } from '@mui/material';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#00ADB5',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', 
        },
      },
    },
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={Theme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;