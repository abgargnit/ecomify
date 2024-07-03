import {apislice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderapiSlice = apislice.injectEndpoints({
    endpoints : (builder) =>({
        createOrder : builder.mutation({
            query : (order) => ({
                url : ORDERS_URL,
                method : 'POST',
                body: {...order}
            })
        })
    })
});


export const {useCreateOrderMutation} = orderapiSlice ;