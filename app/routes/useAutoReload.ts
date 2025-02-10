import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const InactivityTimer = ({ timeout = 5000 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const [timer, setTimer] = useState(timeout);

  useEffect(() => {
    let inactivityTimer;

    // Fungsi untuk mereset timer saat ada aktivitas
    const resetTimer = () => {
      setTimer(timeout); // Reset timer ke nilai yang sudah ditentukan
    };

    // Set event listener untuk mendeteksi aktivitas pengguna
    const activityEvents = ["mousemove", "keydown", "scroll", "click"];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Timer untuk menghitung waktu inaktivitas
    inactivityTimer = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          // Jika timer mencapai 0, redirect ke home
          if (location.pathname === "/") {
            // window.location.reload();
            // console.log("masuk");
            navigate(0);
          }
          navigate("/", { replace: true });
        }
        return prev - 1000; // Kurangi timer setiap detik
      });
    }, 1000);

    // Membersihkan timer dan event listener saat komponen di-unmount
    return () => {
      clearInterval(inactivityTimer);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout, navigate]);

  return null;
};

export default InactivityTimer;
