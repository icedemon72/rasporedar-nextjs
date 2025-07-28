"use client";

import React, { useEffect, useState, JSX } from 'react';
// import Loader from '../Loader/Loader';
import { Slide, toast } from 'react-toastify';

interface ServerValidationError {
  msg: string;
}

interface APIError {
  data?: {
    message?: string;
    errors?: ServerValidationError[];
  };
}

interface MutationStateProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: APIError;
  successMessage?: string;
  errorMessage?: string | JSX.Element;
  timeout?: number;
  theme?: 'light' | 'dark';
}

const MutationState: React.FC<MutationStateProps> = ({
  isLoading,
  isSuccess,
  isError,
  error,
  successMessage = 'Uspešna izmena!',
  errorMessage = 'Došlo je do greške!',
  timeout = 300,
  theme = 'light',
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, timeout);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, timeout]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage, {
        className: 'border-2 border-black rounded-none',
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        style: {
          backgroundColor: theme === 'dark' ? 'rgb(55, 65, 81)' : 'white',
          color: theme === 'dark' ? 'white' : 'black',
        },
        transition: Slide,
      });
    }
  }, [isSuccess, successMessage, theme]);

  useEffect(() => {
    if (isError) {
      let autoClose = 2500;
      let content: string | JSX.Element = errorMessage;

      if (error?.data?.message) {
        content = error.data.message;
      } else if (error?.data?.errors) {
        content = (
          <>
            <p>Došlo je do greške</p>
            <ul className="list-disc ml-2">
              {error.data.errors.map((err, i) => (
                <li key={i}>{err.msg}</li>
              ))}
            </ul>
          </>
        );
        autoClose = error.data.errors.length * 2500;
      }

      toast.error(content, {
        className: 'border-2 border-black rounded-none',
        position: 'bottom-right',
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        style: {
          backgroundColor: theme === 'dark' ? 'rgb(55, 65, 81)' : 'white',
          color: theme === 'dark' ? 'white' : 'black',
        },
        transition: Slide,
      });
    }
  }, [isError, error, errorMessage, theme]);

  return <>{isLoading && showLoader && <p>Loading...</p>}</>;
};

export default MutationState;
