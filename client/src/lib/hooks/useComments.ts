import { useLocalObservable } from "mobx-react-lite";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

export const useComments = (activityId?: string) => {
  const created = useRef(false);
  const commentStore = useLocalObservable(() => ({
    comments: [] as ChatComment[],
    hubConnection: null as HubConnection | null,

    createHubConnection(activityId: string) {
      if (!activityId) return;

      this.hubConnection = new HubConnectionBuilder()
        .withUrl(
          `${import.meta.env.VITE_COMMENTS_URL}/?activityId=${activityId}`,
          {
            withCredentials: true,
          }
        )

        .withAutomaticReconnect()
        .build();

      // start the connection but don't block UI; sendComment will await if needed
      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing connection: ", error)
        );

      this.hubConnection.on("LoadComments", (comments) => {
        runInAction(() => {
          this.comments = comments ?? [];
        });
      });

      this.hubConnection.on("ReceiveComment", (comment) => {
        console.log("Received comment:", comment);
        runInAction(() => {
          this.comments.unshift(comment);
        });
      });
    },

    stopHubConnection() {
      if (this.hubConnection?.state === HubConnectionState.Connected) {
        this.hubConnection
          .stop()
          .catch((error) => console.log("Error stopping connection: ", error));
      }
    },

    // Ensure connection is started and invoke SendComment on the server
    async sendComment(activityId: string, body: string, rate: number) {
      if (!this.hubConnection) {
        throw new Error("No hub connection");
      }

      try {
        if (this.hubConnection.state !== HubConnectionState.Connected) {
          // await start to ensure connected before invoking
          await this.hubConnection.start();
        }

        return await this.hubConnection.invoke("SendComment", activityId, body, rate);
      } catch (err) {
        console.error("Error invoking SendComment:", err);
        throw err;
      }
    },
  }));

  useEffect(() => {
    if (activityId && !created.current) {
      commentStore.createHubConnection(activityId);
      created.current = true;
    }

    return () => {
      commentStore.stopHubConnection();
      commentStore.comments = [];
    };
  }, [activityId, commentStore]);

  return {
    commentStore,
  };
};
