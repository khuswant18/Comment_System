import { useState, useEffect, useCallback } from "react";

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replySubmitting, setReplySubmitting] = useState(null); // Track which comment is being replied to
  const BASEURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASEURL}/api/comments`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [BASEURL]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const createComment = async (commentData) => {
    try {
      // Set loading state based on comment type
      if (commentData.parentId) {
        setReplySubmitting(commentData.parentId); // Track which comment is being replied to
      } else {
        setSubmitting(true);
      }

      const response = await fetch(`${BASEURL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const commentsResponse = await fetch(`${BASEURL}/api/comments`);
        if (commentsResponse.ok) {
          const data = await commentsResponse.json();
          setComments(data);
        }
        return true;
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to post comment:",
          response.statusText, 
          errorData
        );
        return false;
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      return false;
    } finally {
      // Clear loading states
      if (commentData.parentId) {
        setReplySubmitting(null);
      } else {
        setSubmitting(false);
      }
    }
  };

  const toggleLike = async (commentId, userId) => {
    if (!userId) {
      alert("Please log in to like comments");
      return;
    }

    try {
      const response = await fetch(
        `${BASEURL}/api/comments/${commentId}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: userId,
          }),
        }
      );

      if (response.ok) {
        const commentsResponse = await fetch(`${BASEURL}/api/comments`);
        if (commentsResponse.ok) {
          const data = await commentsResponse.json();
          setComments(data);
        }
        return true;
      } else {
        const errorData = await response.json();
        console.error("Failed to toggle like:", response.statusText, errorData);
        return false;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      return false;
    }
  };

  return {
    comments,
    loading,
    submitting,
    replySubmitting,
    fetchComments,
    createComment,
    toggleLike,
  };
};
