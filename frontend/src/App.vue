<template>
  <v-app class="d-flex flex-column">
    <v-dialog v-model="selectRoomDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Select your room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="selectedChatRoomText"
                  label="Enter your room ID"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="selectRoomDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="setRoom">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar dense app color="#071E22" dark flat>
      <div class="d-flex align-center">
        <h1 style="font-weight: 400;">Chattuccino</h1>
      </div>
      <v-spacer></v-spacer>
      <div>Selected Room: {{ selectedChatRoom }}</div>
    </v-app-bar>
    <v-content class="mx-4" style="height: 100px;">
      <div ref="messagesBox" class="overflow-y-auto px-8" style="height: 100%;">
        <div class="d-flex flex-column">
          <div style="margin-top: 1rem" />
          <speech-bubble
            v-for="message in messages"
            :key="message.timestamp"
            :message="message.body"
            :class="{
              myMessage: message.sentByMe,
              otherMessage: !message.sentByMe,
              baseMessage: true
            }"
            :arrowDirection="message.sentByMe ? 'right' : 'left'"
            :color="message.sentByMe ? '#DEA47E' : '#F8F2DC'"
            :suffix="message.timestamp | format('E HH:mm')"
          />
        </div>
      </div>
    </v-content>
    <div class="align-end mr-4 extendMarginLeft">
      <v-btn
        fab
        color="brown accent-2"
        bottom
        right
        @click="selectRoomDialog = !selectRoomDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-text-field
        auto-grow
        hide-details
        v-model="draftMessage"
        v-on:keydown.enter="sendMessage"
        append-outer-icon="mdi-send"
      ></v-text-field>
    </div>
  </v-app>
</template>

<script>
import { format } from "date-fns";
import SpeechBubble from "@/components/SpeechBubble.vue";
import io from "socket.io-client";

export default {
  name: "App",

  components: {
    SpeechBubble
  },

  data: () => ({
    draftMessage: "",
    messages: [],
    socket: null,
    selectedChatRoom: null,
    selectedChatRoomText: "",
    selectRoomDialog: false,
    userId: false
  }),
  methods: {
    sendMessage() {
      if (!this.draftMessage.replace(/\s/g, "").length) {
        return;
      }
      const message = {
        body: this.draftMessage,
        timestamp: Date.now(),
        sentBy: this.userId,
        room: this.selectedChatRoom
      };
      this.socket.emit("chatMessage", message);
      this.draftMessage = "";
      this.$nextTick(() =>
        this.$refs.messagesBox.scroll(0, this.$refs.messagesBox.scrollHeight)
      );
    },
    setRoom() {
      this.selectedChatRoom = this.selectedChatRoomText;
      this.selectedChatRoomText = "";
      this.socket.emit("selectRoom", this.selectedChatRoom);
      this.selectRoomDialog = false;
    },
    handleIncomingMessage(msg) {
      msg.sentByMe = msg.sentBy === this.userId ? true : false;
      this.messages.push(msg);
      this.$nextTick(() =>
        this.$refs.messagesBox.scroll(0, this.$refs.messagesBox.scrollHeight)
      );
    }
  },
  filters: {
    format
  },
  mounted() {
    const userId = window.localStorage.getItem("CHATTUCINO_USER_ID");
    if (!userId) {
      const newUserId = prompt("enter a user ID String");
      window.localStorage.setItem("CHATTUCINO_USER_ID", newUserId);
    }

    if (!this.selectedChatRoom) {
      this.selectRoomDialog = true;
    }

    this.userId = window.localStorage.getItem("CHATTUCINO_USER_ID");
    this.socket = io(`${process.env.VUE_APP_BASEURL}/chat`);
    this.socket.on("chatMessage", this.handleIncomingMessage);
  }
};
</script>

<style>
/* https://coolors.co/F8F2DC-dea47e-071e22-f8f2dc-1d7874 */
.extendMarginLeft {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

.myMessage {
  align-self: flex-end;
}

.otherMessage {
  align-self: flex-start;
}

.baseMessage {
  max-width: 65%;
}

#messagesBox::-webkit-scrollbar {
  display: none;
}
</style>
