import React, { useState, useEffect , useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const CommentInput = ({ user, onSubmit, loading }) => {
  const [comment, setComment] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(()=>{
    function handleClickOutside(event) {
        if (buttonRef.current && !buttonRef.current.contains(event.target) && 
            emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setShowEmoji(false)
        }
    }
   
    if (showEmoji) {
        document.addEventListener("mousedown",handleClickOutside)
    }

    return ()=>document.removeEventListener("mousedown",handleClickOutside) 
  },[showEmoji])

  const handleInput = (e) => {
    const target = e.target;
    target.style.height = "auto"; 
    target.style.height = target.scrollHeight + "px";
    setComment(target.value);
  };

  const addEmoji = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    if (!user) {
      return alert("Please login to continue");
    }

    const success = await onSubmit({
      text: comment,
      author: user.name || "Anonymous",
      uid: user.id,
      email: user.email,
      photoURL: user.photoURL,
      parentId: null, 
    });

    if (success) {
      setComment("");
      textareaRef.current.style.height = "auto";
    }
  }; 

  return (
    <div className="mb-6 sm:mb-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-gray-100">
        <img
          src={user?.photoURL || "./sample.png"}
          alt="Your avatar"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="text-xs sm:text-sm font-medium text-gray-900">
            {user ? user.name : "Guest User"}
          </div>
          <div className="text-xs text-gray-500">
            {user ? "Share your thoughts..." : "Please login to comment"}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <textarea
          ref={textareaRef}
          value={comment}
          onInput={handleInput}
          placeholder={
            user
              ? "What's on your mind? Share your thoughts with the community..."
              : "Please login to add a comment..."
          }
          disabled={!user}
          className="w-full min-h-[60px] sm:min-h-[80px] max-h-[150px] sm:max-h-[200px] overflow-y-auto resize-none outline-none border-0 p-0 bg-transparent placeholder-gray-400 text-gray-900 text-sm sm:text-base leading-relaxed disabled:cursor-not-allowed disabled:text-gray-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-3 sm:p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <div className="flex items-center gap-2 relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setShowEmoji((prev)=>!prev)}
            disabled={!user} 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title="Add emoji" 
          >
            😁
          </button>

          {showEmoji && (
            <div ref={emojiPickerRef} className="absolute top-full left-0 z-50 mt-2">
              <EmojiPicker onEmojiClick={addEmoji} />
            </div>
          )} 
        </div>

        <div className="flex items-center gap-3">
          <button
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
            onClick={handleSubmit}
            disabled={!user || !comment.trim()}
          >
            {!user
              ? "Login to Post"
              : loading
              ? "Posting Comment...."
              : "Post Comment"}
          </button>
        </div>
      </div> 
    </div>
  );
};

export default CommentInput;