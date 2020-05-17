<template>
  <v-app class="d-flex flex-column">
    <v-app-bar dense app color="#071E22" dark flat>
      <div class="d-flex align-center">
        <h1 style="font-weight: 400;">Chattuccino</h1>
      </div>
      <v-spacer></v-spacer>
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
export default {
  name: "App",

  components: {
    SpeechBubble
  },

  data: () => ({
    draftMessage: "",
    messages: [
    ]
  }),
  methods: {
    sendMessage() {
      if (!this.draftMessage.replace(/\s/g, "").length) {
        return;
      }
      const message = {
        body: this.draftMessage,
        timestamp: Date.now(),
        sentByMe: true
      };
      this.messages.push(message);
      this.draftMessage = "";
      this.$nextTick(() =>
        this.$refs.messagesBox.scroll(0, this.$refs.messagesBox.scrollHeight)
      );
    }
  },
  filters: {
    format
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
