import { useRef, useState, useEffect } from "react";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  //autosubmit when user has filled all input fields
  useEffect(() => {
    if (code.every((code) => code.length === 1))
      handleSubmit(new Event("submit"));
  }, code);

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
  };

  const handleChange = (index, value) => {
    const newCode = [...code];
    //handling pasted code

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }

      setCode(newCode);
      // focus on next empty field or last non-empty one
      const lastFilledIndex = newCode.findLastIndex((code) => code !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex].focus();
    } else {
      newCode[index] = value;

      setCode(newCode);
      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div
      className="bg-zinc-800 rounded-xl mt-10 mb-14
      p-8 min-w-1/3 text-center text-white shadow-xl"
    >
      <h1 className="text-3xl font-bold">Veify your Email</h1>
      <p className="my-4">Enter the 6 digit code sent to your email address</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4">
          {/* creates an empty array of 5 elements */}
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(node) => (inputRef.current[index] = node)}
              id={index}
              value={code[index]}
              maxLength={6}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border-2 w-14 h-14 rounded-lg focus:outline-blue-800 transition-outline duration-300 text-center text-2xl font-semibold"
            />
          ))}
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Verify Your Email"
            className="bg-zinc-900 text-white p-4 w-full rounded-2xl text-base cursor-pointer hover:bg-zinc-950 transition-colors
              duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
