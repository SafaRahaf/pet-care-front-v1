"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  upvotePost,
  downvotePost,
} from "../../../../redux/slices/postSlice";
import CommentModal from "../../../../components/UI/CommentModel";

const RecentPosts = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchPosts());
  }, [dispatch]);

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

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Recent Posts</h2>
      {loading && <div className="text-center">Loading posts...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      <div className="recent-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading &&
          !error &&
          posts?.data?.slice(0, 6).map((post) => (
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
          ))}
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

export default RecentPosts;
