import { PRODUCT_URL } from "../constants";
import { apiSLice } from "./apiSlice";

export const productsApiSlice = apiSLice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
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
        })

    }),
});

export const { useGetProductsQuery , useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice ;

