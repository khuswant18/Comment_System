import React from "react";

const Comment = ({
  comment,
  user,
  level = 0,
  expandedComments,
  replyingTo,
  replyText,
  replySubmitting,
  onToggleReplies,
  onSetReplyingTo,
  onReplyTextChange,
  onSubmitReply, 
  onLike,
}) => {
  const isExpanded = expandedComments.has(comment.id);
  const isReplying = replyingTo === comment.id;
  const isSubmittingReply = replySubmitting === comment.id;

  return (
    <div
      className={`relative ${level > 0 ? "ml-4 sm:ml-6 md:ml-8 lg:ml-12" : ""}`}
    >
      {level > 0 && (
        <div className="absolute left-0 top-0 w-12 h-12 pointer-events-none">
          {" "}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48" 
            className="absolute -left-12 top-0"
          >
            {" "}
            <path
              d="M 12 0 L 12 24 Q 12 36 24 36 L 48 36"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
            />{" "}
          </svg>{" "}
        </div>
      )}

      <div className="p-2 sm:p-3 md:p-4 rounded-lg mb-2 sm:mb-3">
        <div className="flex gap-2 sm:gap-3 items-start mb-2 sm:mb-3">
          <div className="flex-shrink-0">
            <img
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full ring-2 ring-gray-100"
              src={
                comment.user?.photoURL ||
                "./sample.png"
              }
              alt="User avatar"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <div className="font-semibold text-xs sm:text-sm text-gray-900">
                {comment.user?.name || "Anonymous"}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
              {comment.text}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs text-gray-500 ml-6 sm:ml-8 md:ml-10 lg:ml-11">
          <button
            className="hover:text-red-500 transition-colors cursor-pointer"
            onClick={() => onLike && onLike(comment.id)} 
          > 
            <div className="flex gap-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
              >
                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
              </svg>
              {comment.likes || 0}
            </div>
          </button>

          <button
            onClick={() => onSetReplyingTo(comment.id)}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Reply 
          </button>

          {comment.children && comment.children.length > 0 && !isExpanded && (
            <button
              onClick={() => onToggleReplies(comment.id)}
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              {comment.children.length === 1
                ? "1 more reply"
                : `${comment.children.length} more replies`}
            </button>
          )}

          {comment.children && comment.children.length > 0 && isExpanded && (
            <button
              onClick={() => onToggleReplies(comment.id)}
              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Hide replies
            </button>
          )}
        </div>

        {isReplying && (
          <div className="mt-2 sm:mt-3 ml-6 sm:ml-8 md:ml-10 lg:ml-11 p-2 sm:p-3 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
                placeholder="Write your reply..."
                className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2 sm:gap-0">
                <button 
                  onClick={onSubmitReply}
                  disabled={isSubmittingReply}
                  className="flex-1 sm:flex-none bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 text-xs sm:text-sm cursor-pointer transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                > 
                  {isSubmittingReply ? "Posting..." : "Post"}
                </button>
                <button
                  onClick={() => onSetReplyingTo(null)}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-300 text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {comment.children && comment.children.length > 0 && isExpanded && (
          <div className="mt-2 sm:mt-3 md:mt-4 relative">
            {comment.children.map((childComment, index) => (
              <div key={childComment.id} className="relative">
                {index < comment.children.length - 1 && (
                  <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-8 sm:top-10 md:top-12 w-0.5 h-full -z-10"></div>
                )}
                <Comment
                  comment={childComment}
                  user={user}
                  level={level + 1}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
