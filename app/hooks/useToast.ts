import { useState } from "react";

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showToastMessage = (message: string, isErrorState = false) => {
    setToastMessage(message);
    setIsError(isErrorState);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return {
    showToast,
    toastMessage,
    isError,
    showToastMessage,
    closeToast
  };
}; 