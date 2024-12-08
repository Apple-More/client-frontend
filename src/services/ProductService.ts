import axiosInstance from "./AxiosInstances";

export const getCategories = async () => {
    const response = await axiosInstance.get('/product-service/v1/admin/categories');

    return response.data;
}

export const searchProduct = async (query: string, category: string) => {
    if (query !== '') {
        const response = await axiosInstance.get(`/product-service/v1/public/product?query=${query}`);

        return response.data;
    } else if (category !== '') {
        const response = await axiosInstance.get(`/product-service/v1/public/product?category=${category}`);

        return response.data;
    } else{
        const response = await axiosInstance.get('/product-service/v1/public/product');

        return response.data;
    }
}

export const getProducts = async () => {
    const response = await axiosInstance.get('/products/v1/admin/product');

    return response.data;
}

export const getProductById = async (productId: any) => {
    const response = await axiosInstance.get(`/product-service/v1/public/product/${productId}`);

    return response.data;
}