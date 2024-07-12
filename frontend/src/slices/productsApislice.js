import { PRODUCT_URL } from "../constants";
import { apiSLice } from "./apiSlice";

export const productsApiSlice = apiSLice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            providesTags:['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails : builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                keepUnusedDataFor: 5,
            }),
        }),
        createProduct: builder.mutation({
            query:()=>({
                url: PRODUCT_URL,
                method:'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        UpdateProduct: builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery , useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation } = productsApiSlice ;

