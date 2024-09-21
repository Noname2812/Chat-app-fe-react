import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

let connection = null;

const connect = async (token) => {
  if (connection) return connection;
  // var token = getToken();
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
    connection.on("ReceiveMessagePrivate", (data) => {
      console.log("Received private message:", data);
    });

    connection.on("ReceiveMessageFromGroup", (data) => {
      console.log("Received group message:", data);
    });
  } catch (error) {
    connection = null;
  }
  return connection;
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
};
