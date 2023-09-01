import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePost, createPost } from "../../posts/services";
import setWith from "lodash/setWith";
import transform from "lodash/transform";
import isPlainObject from "lodash/isPlainObject";
import getPathDetails from "../utils/getReplyPath";

export default function useReplyMutation(toEditId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post) => {
      const transformed = transform(post, (res, val, key) => {
        res[key] = isPlainObject(val) ? JSON.stringify(val) : val;
      });
      return (await toEditId)
        ? updatePost(transformed, toEditId)
        : createPost(transformed);
    },
    onSuccess: (data) => {
      //test against regex since React Query is unreliably switching between returning strings and booleans
      let { originalPostId, replyPath } = getPathDetails(data);
      queryClient.setQueryData(["post", originalPostId], (oldData) => {
        let newData = setWith(
          { ...oldData },
          replyPath,
          data.posted || data.updated,
          Object
        );
        return { ...newData };
      });
      return data;
    },
    retry: 0,
  });
}
