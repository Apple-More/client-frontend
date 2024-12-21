"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { registerService } from "@/services/RegisterServices";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterForm = () => {
  // State to manage form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState({
    emailInvalid: false,
    passwordMismatch: false,
    invalidPassword: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === "email" ? value.toLowerCase() : value, // Lowercase email
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);

    setErrors({
      emailInvalid: !isEmailValid,
      passwordMismatch: formData.password !== formData.confirmPassword,
      invalidPassword: !isPasswordValid,
    });

    if (
      isEmailValid &&
      isPasswordValid &&
      formData.password === formData.confirmPassword
    ) {
      // Construct customer data
      const customerData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      };

      try {
        // Make API call to create customer
        console.log("Customer data:", customerData);
        const data = await registerService(customerData);
        toast.success("Registration successful! Please login to continue.");
        console.log("Registration response:", data);

        // Redirect to login or dashboard
        router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleRegister}>
        <div className="email ">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="firstName"
            type="text"
            placeholder="First Name *"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="email mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="lastName"
            type="text"
            placeholder="Last Name *"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="email mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="email"
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        {errors.emailInvalid && (
          <p className="text-red mt-2">Please enter a valid email address.</p>
        )}
        <div className="email mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="phoneNumber"
            type="text"
            placeholder="Phone Number *"
            required
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="pass mt-5">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="password"
            type="password"
            placeholder="Password *"
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
            placeholder="Confirm Password *"
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
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
