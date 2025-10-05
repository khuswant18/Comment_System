import "./App.css";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import Header from "./components/Layout/Header";
import TabNavigation from "./components/Layout/TabNavigation";
import CommentInput from "./components/Comments/CommentInput";
import TabContent from "./components/Tabs/TabContent";

import { useAuth } from "./hooks/useAuth";
import { useComments } from "./hooks/useComments";

function App() {
  const { user, logout } = useAuth();
  const { comments, submitting, replySubmitting, createComment, toggleLike } = useComments();
  
  const [activeTab, setActiveTab] = useState("Thoughts");
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
     
    const success = await createComment({
      text: replyText,
      parentId: replyingTo,
      uid: user.id,
      author: user.name || "Anonymous",
      email: user.email,
      photoURL: user.photoURL,
    }); 

    if (success) {
      const newExpandedComments = new Set(expandedComments);
      newExpandedComments.add(replyingTo);
      setExpandedComments(newExpandedComments);
      
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleLike = async (commentId) => {
    await toggleLike(commentId, user?.id);
  };

  const handleToggleReplies = (commentId) => {
    const newExpandedComments = new Set(expandedComments);
    if (expandedComments.has(commentId)) {
      newExpandedComments.delete(commentId);
    } else {
      newExpandedComments.add(commentId);
    }
    setExpandedComments(newExpandedComments);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
      <Header user={user} onLogin={handleLogin} onLogout={logout} />
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        commentCount={comments.length}
      /> 
      
      <CommentInput 
        user={user} 
        onSubmit={createComment}
        loading={submitting}
      />
      
      <TabContent
        activeTab={activeTab}
        comments={comments}
        user={user}
        expandedComments={expandedComments}
        replyingTo={replyingTo}
        replyText={replyText}
        replySubmitting={replySubmitting}
        onToggleReplies={handleToggleReplies}
        onSetReplyingTo={setReplyingTo}
        onReplyTextChange={setReplyText}
        onSubmitReply={handleSubmitReply}
        onLike={handleLike}
      /> 
    </div>
  );
}

export default App;
