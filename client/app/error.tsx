'use client';

import { FC, useEffect } from 'react';

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => {
          // Attempt to recover by trying to re-render the segment
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorComponent;
