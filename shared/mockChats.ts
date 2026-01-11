export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  lastMessageTime: Date;
  isOnline: boolean;
  unreadCount: number;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sofia",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "That sounds amazing! 😊",
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    isOnline: true,
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        senderId: "user1",
        text: "Hey! How's your day going?",
        timestamp: new Date(Date.now() - 30 * 60000),
        read: true,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Great! Just finished work. How about you?",
        timestamp: new Date(Date.now() - 25 * 60000),
        read: true,
      },
      {
        id: "m3",
        senderId: "user1",
        text: "Same here! Want to grab coffee this weekend?",
        timestamp: new Date(Date.now() - 10 * 60000),
        read: true,
      },
      {
        id: "m4",
        senderId: "me",
        text: "I'd love that! When works for you?",
        timestamp: new Date(Date.now() - 8 * 60000),
        read: true,
      },
      {
        id: "m5",
        senderId: "user1",
        text: "That sounds amazing! 😊",
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
      },
    ],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Emma",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the recommendation!",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
    isOnline: false,
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        senderId: "me",
        text: "Have you seen that new art exhibition?",
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        read: true,
      },
      {
        id: "m2",
        senderId: "user2",
        text: "Not yet! Is it good?",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60000),
        read: true,
      },
      {
        id: "m3",
        senderId: "me",
        text: "Really cool installations. I think you'd love it!",
        timestamp: new Date(Date.now() - 2.2 * 60 * 60000),
        read: true,
      },
      {
        id: "m4",
        senderId: "user2",
        text: "Thanks for the recommendation!",
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        read: true,
      },
    ],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Jessica",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "Looking forward to it!",
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60000),
    isOnline: true,
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        senderId: "user3",
        text: "Hi! Nice to match with you 😊",
        timestamp: new Date(Date.now() - 24 * 60 * 60000),
        read: true,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Hey! You too! How's your week been?",
        timestamp: new Date(Date.now() - 23.5 * 60 * 60000),
        read: true,
      },
      {
        id: "m3",
        senderId: "user3",
        text: "Pretty good! Looking forward to chatting more",
        timestamp: new Date(Date.now() - 23 * 60 * 60000),
        read: true,
      },
      {
        id: "m4",
        senderId: "me",
        text: "Me too! Maybe we can grab dinner soon?",
        timestamp: new Date(Date.now() - 22 * 60 * 60000),
        read: true,
      },
      {
        id: "m5",
        senderId: "user3",
        text: "Looking forward to it!",
        timestamp: new Date(Date.now() - 22 * 60 * 60000),
        read: true,
      },
    ],
  },
];
