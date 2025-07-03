import { useState, useRef, useEffect } from "react";

export default function Otp({ otpLength = 6 }) {
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);
  const handleInput = (e, index) => {
    //console.log(e);
    const key = e.key;
    if (key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (key === "ArrowRight") {
      if (index + 1 < otp.length) {
        ref.current[index + 1].focus();
      }
      return;
    }
    if (key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (isNaN(e.key)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = e.key;
    setOtp(newOtp);
    if (index + 1 < otp.length) {
      ref.current[index + 1].focus();
    }
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);
  return (
    <div>
      {otp.map((digit, index) => {
        return (
          <input
            key={index}
            value={digit}
            ref={(currentInput) => (ref.current[index] = currentInput)}
            type="text"
            onKeyDown={(e) => handleInput(e, index)}
          />
        );
      })}
    </div>
  );
}
