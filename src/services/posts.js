import { api } from "state/api";

export const apiPost = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "/api/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    addPost: build.mutation({
      query: (body) => ({
        url: `/api/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPost: build.query({
      query: (id) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    updatePost: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: build.mutation({
      query(id) {
        return {
          url: `/api/posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiPost;
