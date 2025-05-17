import { Check, X } from "lucide-react";
const PasswordCriteria = ({ password }) => {
  return (
    <ul className="text-gray-400 mt-2 flex flex-col gap-2">
      {
        //password strength criteria

        [
          {
            met: /.{6,}/.test(password),
            text: "Atleast 6 characters",
          },
          {
            met: /[a-z]/.test(password),
            text: "Contains lower letter",
          },
          {
            met: /[A-Z]/.test(password),
            text: "Contains uppercase letter",
          },
          { met: /[0-9]/.test(password), text: "Contains a number" },
          {
            met: /[^A-Za-z0-9]/.test(password),
            text: "Contains special character",
          },
        ].map((con, index) => {
          return (
            <li
              key={index}
              className={`flex items-end gap-2 ${con.met && "text-blue-500"}`}
            >
              {con.met ? <Check className="text-blue-500" /> : <X />} {con.text}
            </li>
          );
        })
      }
    </ul>
  );
};
const PasswordStrengthMeter = ({ password }) => {
  const getBarColor = () => {
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-red-400";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getPasswordScore = (pwd) => {
    let score = 0;
    if (/[a-z]/.test(pwd)) score++; // lowercase
    if (/[A-Z]/.test(pwd)) score++; // uppercase
    if (/\d/.test(pwd)) score++; // digit
    if (/[^A-Za-z0-9]/.test(pwd)) score++; // special char
    if (pwd.length >= 6) score++; // min length
    return score;
  };
  const getPasswordLabel = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
      case 4:
        return "Moderate";
      default:
        return "Strong";
    }
  };
  const passwordStrength = getPasswordScore(password);

  return (
    <div>
      {/* Password strength bar */}
      <div>
        <div className="flex text-white justify-between">
          <p>Password Strength</p>
          <p>{getPasswordLabel()}</p>
        </div>
      </div>
      <div className="flex gap-1 justify-between mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-1/4 rounded-md ${
              passwordStrength > i ? getBarColor() : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
