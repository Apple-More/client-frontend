import axiosInstance from "./AxiosInstances";

export const addCartItem = async (cartItem: any) => {
    const response = await axiosInstance.post('/cart-service/v1/cart-items', cartItem);

    return response.data;
}

export const getCartItems = async (customer: any) => {
    const response = await axiosInstance.get(`/cart-service/v1/customer/${customer}/cart-items`);

    return response.data;
}
