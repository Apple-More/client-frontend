import axiosInstance from "./AxiosInstances";

export const createOrder = async (order: any) => {
    const response = await axiosInstance.post('/order-service/v1/', order);

    return response.data;
}