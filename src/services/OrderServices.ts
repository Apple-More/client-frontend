import axiosInstance from "./AxiosInstances";
import axios from "axios";

export const getRecentOrders = async (userId:string) => {
    try {
        const response = await axiosInstance.get(`/order-service/v1/user/${userId}`);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");

    }
}