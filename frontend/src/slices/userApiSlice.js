import { USERS_URL } from "../constants";
import { apiSLice } from "./apiSlice";

export const userApiSlice = apiSLice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation  } = userApiSlice;

