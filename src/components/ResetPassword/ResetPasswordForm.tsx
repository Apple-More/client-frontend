"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/PasswordChangeServices";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
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
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate passwords
      const isPasswordValid = passwordRegex.test(formData.password);

      setErrors({
        passwordMismatch: formData.password !== formData.confirmPassword,
        invalidPassword: !isPasswordValid,
      });

      if (isPasswordValid && formData.password === formData.confirmPassword) {
        const userEmail = localStorage.getItem("userEmail");
        const response = await resetPassword(formData.password, userEmail);
        if (response.status === 1) {
          localStorage.removeItem("userEmail");
          toast.success("Password Changed Successfully");
          router.push("/login");
        } else {
          toast.error("Reset Password failed");
        }
      }
    } catch (error) {
      console.error("Reset Password failed:", error);
    }
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleResetPassword}>
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
          <p className="text-red-500 mt-2">
            Password must be at least 8 characters long, include one uppercase
            letter, one number, and one special character.
          </p>
        )}
        {errors.passwordMismatch && (
          <p className="text-red-500 mt-2">
            Password and Confirm Password do not match.
          </p>
        )}

        <div className="block-button md:mt-7 mt-4">
          <button className="button-main bg-black" type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
