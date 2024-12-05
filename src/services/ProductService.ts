import axiosInstance from "./AxiosInstances";

export const getCategories = async () => {
    const response = await axiosInstance.get('/products/v1/admin/categories');

    return response.data;
}

export const getProducts = async () => {
    const response = await axiosInstance.get('/products/v1/admin/product');

    return response.data;
}

export const getProductById = async (productId: any) => {
    const response = await axiosInstance.get(`/products/v1/admin/product/${productId}`);

    return response.data;
}