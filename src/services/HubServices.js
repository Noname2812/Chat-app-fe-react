import { QUERY_CLINENT } from "@/constants";
import { useAppStore } from "@/store";
import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

let connection = null;

const connect = async (token) => {
  if (connection) return connection;
  connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5117/chat", {
      transport: HttpTransportType.WebSockets,
      skipNegotiation: true,
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext) => {
        if (retryContext.elapsedMilliseconds < 60000) {
          return Math.random() * 10000;
        } else {
          return null;
        }
      },
    })
    .build();
  try {
    await connection.start();
    connection.on("ReceivedMessage", async (data) => {
      console.log("Received private message:", data);
      handleReceiveMessage(data);
      await QUERY_CLINENT.invalidateQueries({ queryKey: ["getAllRoomChats"] });
    });
    connection.on("SendMessageSuccessfully", async (message) => {
      handleReceiveMessage(message);
      await QUERY_CLINENT.invalidateQueries({ queryKey: ["getAllRoomChats"] });
    });
    connection.on("ErrorWhileSendingMessage", (message) => {
      console.log("ErrorWhileSendingMessage:", message);
    });
  } catch (error) {
    connection = null;
  }
  return connection;
};
const handleReceiveMessage = (data) => {
  const { roomSelected, user, addMessage } = useAppStore.getState();
  if (roomSelected?.id === data.roomChatId || user?.id !== data.createBy) {
    addMessage([data]);
  }
};
const handleSendMessage = async (msg) => {
  if (connection) {
    try {
      await connection.invoke("SendMessage", msg);
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Not connected to SignalR Hub");
  }
};
export const HubServices = {
  connection: (token) => connect(token),
  disconnect: async () => {
    if (connection) {
      try {
        await connection.stop();
        console.log("Disconnected from SignalR Hub");
      } catch (error) {
        console.error("Error disconnecting from SignalR Hub:", error);
      } finally {
        connection = null;
      }
    }
  },
  isConnected: () => {
    return connection !== null && connection.state === "Connected";
  },
  sendMessage: (msg) => handleSendMessage(msg),
};
