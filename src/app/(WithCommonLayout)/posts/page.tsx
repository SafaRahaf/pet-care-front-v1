"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downvotePost,
  fetchPosts,
  upvotePost,
  followUser,
  unfollowUser,
} from "../../../redux/slices/postSlice";
import CommentModal from "../../../components/UI/CommentModel";

const Page = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, followedUsers } = useSelector(
    //@ts-ignore
    (state) => state.posts
  );
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleFollow = (userId) => {
    if (userId) {
      if (followedUsers.includes(userId)) {
        //@ts-ignore
        dispatch(unfollowUser(userId));
      } else {
        //@ts-ignore
        dispatch(followUser(userId));
      }
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleShowComments = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
    }
  };

  const handleUpvote = (postId) => {
    if (!userVotes[postId]?.upvoted) {
      //@ts-ignore
      dispatch(upvotePost(postId));
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [postId]: { upvoted: true, downvoted: false },
      }));
    }
  };

  const handleDownvote = (postId) => {
    if (!userVotes[postId]?.downvoted) {
      //@ts-ignore
      dispatch(downvotePost(postId));
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [postId]: { upvoted: false, downvoted: true },
      }));
    }
  };

  const getFilteredPosts = () => {
    const filteredPosts = posts?.data?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case "latest":
        return filteredPosts?.sort(
          //@ts-ignore
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      case "oldest":
        return filteredPosts?.sort(
          //@ts-ignore
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
      case "popular":
        return filteredPosts?.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        );
      default:
        return filteredPosts;
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Recent Posts</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded mt-2 w-full"
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="popular">Sort by Popularity</option>
        </select>
      </div>

      {loading && <div className="text-center">Loading posts...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      <div className="recent-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading &&
          !error &&
          filteredPosts?.map((post) => {
            return (
              <div
                key={post._id}
                className="relative border p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div
                  className="h-40 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      post.imageUrl || "/placeholder.jpg"
                    })`,
                  }}
                ></div>
                <h3 className="text-xl font-bold mt-4 text-gray-400">
                  {post.title}
                </h3>
                <p className="mt-2">{post.content.substring(0, 100)}...</p>

                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Posted by: {post?.author?.name}
                  </span>
                  <button
                    className={`px-4 ${
                      followedUsers.includes(post?.author)
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    } text-white rounded`}
                    onClick={() => handleFollow(post?.author || null)}
                    disabled={followedUsers.includes(post?.author)}
                  >
                    {followedUsers.includes(post?.author)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded"
                    onClick={() => handleShowComments(post._id)}
                  >
                    Comments
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpvote(post._id)}
                      className="text-xl"
                      disabled={userVotes[post._id]?.upvoted}
                    >
                      👍 {post.upvotes}
                    </button>
                    <button
                      onClick={() => handleDownvote(post._id)}
                      className="text-xl"
                      disabled={userVotes[post._id]?.downvoted}
                    >
                      👎 {post.downvotes}
                    </button>
                  </div>
                  {post.isPremium && (
                    <div className="bg-yellow-500 text-white px-2 rounded-md">
                      Premium
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {selectedPostId && (
        <CommentModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

export default Page;
