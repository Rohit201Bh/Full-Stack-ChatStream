import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadMessages: {}, // Track unread messages per user

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
  
    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages } = get();
  
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        // If currently chatting with the sender, add the message to the chat
        set({ messages: [...messages, newMessage] });
      } else {
        // If not currently chatting, increase unread messages count
        get().addUnreadMessage(newMessage.senderId);
      }
    });
    // ✅ Listen for "markAsRead" event and update unread messages for sender
    socket.on("markAsRead", ({ userId }) => {
      set((state) => ({
        unreadMessages: { ...state.unreadMessages, [userId]: 0 },
      }));
    });
  },
  loadUnreadMessages: async () => {
    try {
      const res = await axiosInstance.get("/messages/unread"); // ✅ API to fetch unread messages
      const unreadCounts = res.data.reduce((acc, msg) => {
        acc[msg.senderId] = msg.count;
        return acc;
      }, {});
  
      set({ unreadMessages: unreadCounts });
    } catch (error) {
      console.error("Failed to load unread messages:", error);
    }
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("markAsRead"); // ✅ Remove listener for "markAsRead"
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
  markMessagesAsRead: (userId) => {
    set((state) => ({
      unreadMessages: { ...state.unreadMessages, [userId]: 0 },
    }));

    // ✅ Emit event so the sender also updates their unread messages
    const socket = useAuthStore.getState().socket;
    socket.emit("markAsRead", { userId });
  },

  addUnreadMessage: (userId) =>
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [userId]: (state.unreadMessages[userId] || 0) + 1,
      },
    })),
}));
