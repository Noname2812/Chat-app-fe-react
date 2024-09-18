import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

let connection = null;

const connect = async (user) => {
  if (connection) return connection;
  connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5117/chat", {
      transport: HttpTransportType.WebSockets,
      skipNegotiation: true,
      accessTokenFactory: () => user?.token,
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
    connection.on("ReceiveMessagePrivate", (data) => {
      console.log("Received private message:", data);
    });

    connection.on("ReceiveMessageFromGroup", (data) => {
      console.log("Received group message:", data);
    });
  } catch (error) {
    console.error("Error connecting to SignalR Hub:", error);
    connection = null;
  }
  return connection;
};

export const HubServices = {
  connection: async (user) => await connect(user),
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
};
