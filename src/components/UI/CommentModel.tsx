import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments } from "../../redux/slices/commentsSlice";

const CommentModal = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (postId) {
      //@ts-ignore
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      //@ts-ignore
      dispatch(addComment({ postId, content: commentText })).then(() => {
        //@ts-ignore
        dispatch(fetchComments(postId));
      });
      setCommentText("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="rounded-lg border p-6 max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <div className="mb-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="border rounded p-2 w-full"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
        <div>
          {loading && <div>Loading comments...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}
          {comments.map((comment) => (
            <div key={comment._id} className="border-b py-2 text-white">
              <span className="font-bold">{comment.author.name}:</span>{" "}
              {comment.content}
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default CommentModal;
