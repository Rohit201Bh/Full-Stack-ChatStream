import { useChatStore } from "../store/useChatStore";
import { useState, useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Download, X } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // State for Image Preview

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to download image
  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((res) => res.blob()) // Convert image to Blob
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create object URL
        const a = document.createElement("a");
        a.href = url;
        a.download = "chat_image.jpg"; // Default file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar self-auto">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-bubble flex flex-col relative">
                {message.image && (
                  <div className="relative">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[180px] rounded-md mb-2"
                      onClick={() => setPreviewImage(message.image)}
                    />
                    <button
                      onClick={() => downloadImage(message.image)}
                      className="absolute bottom-3 right-1 p-1 bg-green-700 text-white rounded-md flex items-center gap-0"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                )}

                {/* ✅ Message text and timestamp inside the chat bubble */}
                {message.text && (
                  <div className="flex items-end gap-3">
                    <p className="flex-grow">{message.text}</p>
                    <span
                      className={`text-[11px] text-gray-500 ${
                        isSender ? "justify-self-end" : "self-end"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />

      {/* ✅ Fullscreen Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            onClick={() => setPreviewImage(null)}
          >
            <X size={24} />
          </button>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
