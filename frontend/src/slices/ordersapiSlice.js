import { apiSLice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderapiSlice = apiSLice.injectEndpoints({
    endpoints : (builder) =>({
        createOrder : builder.mutation({
            query : (order) => ({
                url : ORDERS_URL,
                method : 'POST',
                body: order,
            })
        }),
        getOrderDetails : builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId,details})=>({
                url:`${ORDERS_URL}/${orderId}/pay`,
                method:'PUT',
                body: details,
            })
        }),
        getPayPalClientId: builder.query({
            query: ()=>({
                url: `${PAYPAL_URL}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: ()=>({
                url:`${ORDERS_URL}/mine` // makesure to match this route with the one made at backend!!
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query:()=>({
                url:`${ORDERS_URL}`,
            }),
            keepUnusedDataFor:5,
        }),
        updateOrder: builder.mutation({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}/deliver`,
                method:'PUT',
            }),
        })
    }),
});


export const {useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    useGetPayPalClientIdQuery,
    usePayOrderMutation, 
    useGetMyOrdersQuery,
     useGetOrdersQuery
    ,useUpdateOrderMutation,
} = orderapiSlice ;