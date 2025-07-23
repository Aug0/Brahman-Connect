
import React, { createContext, useContext, useState } from 'react';
import CustomDialog from '../components/CustomDialog';

const ErrorContext = createContext({
  error: { isOpen: false, title: '', message: '', isError: false },
  handleError: () => {},
  closeError: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState({ isOpen: false, title: '', message: '', isError: false });

  const handleError = (title, message, isError = false) => {
    setError({ isOpen: true, title, message, isError });
  };

  const closeError = () => {
    setError({ isOpen: false, title: '', message: '', isError: false });
  };

  return (
    <ErrorContext.Provider value={{ error, handleError, closeError }}>
      {children}
      <CustomDialog
        open={error.isOpen}
        handleClose={closeError}
        title={error.title}
        content={error.message}
        isError={error.isError}
      />
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
