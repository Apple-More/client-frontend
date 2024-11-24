import axiosInstance from "./AxiosInstances";
import axios from "axios";

interface FormData {
    id: string; // Assuming each address has a unique ID
    firstName: string;
    lastName: string;
    addressNo: string;
    street: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone: string;
    email: string;
  }

export const getShippingAddresses = async (customerId: string | undefined) => {
    try {
        const response = await axios.get("/api/shipping-addresses");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("An unexpected error occurred");
    }
}

export const addShippingAddress = async (formData : FormData ) => {
    try {
        const response = await axios.post("/api/shipping-addresses", formData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("An unexpected error occurred");
    }
}

export const editShippingAddress = async (formData : FormData, id : string) => {
    try {
        const response = await axios.put(`/api/shipping-addresses/${id}`, formData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("An unexpected error occurred");
    }
}