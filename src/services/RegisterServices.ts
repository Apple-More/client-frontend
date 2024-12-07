import axiosInstance from "./AxiosInstances"; // Adjust the path as needed
import axios from "axios";

/**
 * Service to register a new customer.
 * 
 * @param {Object} customerData - The customer data to send in the request body.
 * @returns {Promise<any>} - The response data from the API.
 * @throws {Error} - If the registration fails.
 */
export const registerService = async (customerData: {
  customerName: string;
  email: string;
  password: string;
  phoneNumber:string;
}) => {
  try {
    const response = await axiosInstance.post("user-service/v1/public/customers/register", customerData);
    console.log("Customer created successfully:", response.data);
    return response.data; // Return the API response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register customer.");
    }
    throw new Error("An unexpected error occurred.");
  }
};
