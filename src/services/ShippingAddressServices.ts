import { toast } from "react-toastify";
import axiosInstance from "./AxiosInstances";
import axios from "axios";

interface FormData {
  addressNo: string;
  addressLine1: string;
  addressLine2: string;
  street: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  }

export const getShippingAddresses = async (customerId: string | undefined) => {
    try {
    
        const response = await axiosInstance.get(`/user-service/v1/customers/${customerId}/address`);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message );
          }
          throw new Error("An unexpected error occurred");
    }
}

export const addShippingAddress = async (customerId: string | undefined,formData : FormData ) => {
    try {
        const response = await axiosInstance.post(`/user-service/v1/customers/${customerId}/address`, formData);
        toast.success("Shipping Address added successfully");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message );
          }
          toast.error("An unexpected error occurred");
          throw new Error("An unexpected error occurred");
    }
}

export const editShippingAddress = async (customerId:string | undefined,formData : FormData, id : string) => {
    try {
        const response = await axiosInstance.put(`/users/v1/customers/${customerId}/address${id}`, formData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("An unexpected error occurred");
    }
}