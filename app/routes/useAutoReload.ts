import { useEffect, useRef } from "react";
import { redirect } from "react-router";

const useAutoReload = (
  timeoutDuration: number = 6000,
  redirectPath: string = "/"
) => {
  const timeout = useRef<number | undefined>(undefined);

  const redirectToHome = () => {
    redirect("/");
  };

  const resetTimer = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = window.setTimeout(redirectToHome, timeoutDuration);
  };

  useEffect(() => {
    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [timeoutDuration, redirectPath]);

  return null;
};

export default useAutoReload;
