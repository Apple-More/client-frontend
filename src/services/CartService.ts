import axiosInstance from "./AxiosInstances";

export const addCartItem = async (cartItem: any) => {
    const response = await axiosInstance.post('/cart-service/v1/cart-items', cartItem);

    return response.data;
}
