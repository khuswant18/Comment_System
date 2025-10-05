import React from 'react';
import Comment from './Comment';

const CommentList = ({ 
  comments, 
  user, 
  expandedComments,
  replyingTo,
  replyText,
  replySubmitting,
  onToggleReplies,
  onSetReplyingTo,
  onReplyTextChange, 
  onSubmitReply,
  onLike 
}) => {
  if (!comments.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No comments yet. Be the first to comment!
      </div> 
    );  
  }

  return (  
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
          level={0}
          expandedComments={expandedComments}
          replyingTo={replyingTo}
          replyText={replyText}
          replySubmitting={replySubmitting}
          onToggleReplies={onToggleReplies}
          onSetReplyingTo={onSetReplyingTo}
          onReplyTextChange={onReplyTextChange}
          onSubmitReply={onSubmitReply} 
          onLike={onLike}
        />
      ))} 
    </div>
  );
};

export default CommentList;