import ProfileSection from "./ProfileSection";
import PostsList from "../../posts/components/list/PostsList";
import { PostsListContextProvider } from "../../posts/context/PostsListContext";
import { useAllPosts } from "../../posts/hooks";
import PostsSkeleton from "../../posts/components/PostsSkeleton";
const PostsCreated = ({ user }) => {
  const { data: posts, status, error } = useAllPosts();
  return (
    <ProfileSection className="h-[30]">
      <h3 className="text-3xl">Posts created</h3>
      <div className="w-full bg-slate-50/50 rounded flex flex-col gap-3 p-3 overflow-y-scroll h-[10em] border-slate-500 border">
        <PostsListContextProvider>
          <PostsList
            posts={
              posts && posts.filter((post) => post?.userId === user?.userId)
            }
            status={status}
            loader={<PostsSkeleton counts={2} />}
          />
        </PostsListContextProvider>
      </div>
    </ProfileSection>
  );
};

export default PostsCreated;
