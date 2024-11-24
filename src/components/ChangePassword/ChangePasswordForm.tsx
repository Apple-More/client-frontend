"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({
    passwordMismatch: false,
    invalidPassword: false,
  });
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate passwords
      const isPasswordValid = passwordRegex.test(formData.password);

      setErrors({
        passwordMismatch: formData.password !== formData.confirmPassword,
        invalidPassword: !isPasswordValid,
      });

      if (isPasswordValid && formData.password === formData.confirmPassword) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Change Password failed:", error);
    }
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleChangePassword}>
        <div className="pass mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="password"
            type="password"
            placeholder="New Password *"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="confirm-pass mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password *"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        {errors.invalidPassword && (
          <p className="text-red mt-2">
            Password must be at least 8 characters long, include one uppercase
            letter, one number, and one special character.
          </p>
        )}
        {errors.passwordMismatch && (
          <p className="text-red mt-2">
            Password and Confirm Password do not match.
          </p>
        )}

        <div className="block-button md:mt-7 mt-4">
          <button className="button-main bg-black" type="submit">
            Change Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
