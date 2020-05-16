<template>
  <v-app class="d-flex flex-column">
    <v-app-bar dense app color="primary" dark flat>
      <div class="d-flex align-center">
        <h1 style="font-weight: 400;">Chattuccino</h1>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content id="messagesBox" class="mx-4 overflow-y-auto"  style="height: 100px;">
      <p v-for="(message) in messages" :key="message.id">{{ message.msg }}</p>
    </v-content>
    <div class="align-end mr-4 extendMarginLeft">
      <v-text-field
      hide-details
        v-model="draftMessage"
        v-on:keydown.enter="sendMessage"
        append-outer-icon="mdi-send"
      ></v-text-field>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    draftMessage: "",
    messages: []
    }),
  methods: {
    sendMessage() {
      console.log("message received", this.draftMessage);
      const message = {msg: this.draftMessage, id: Date.now(), sentByMe: true}
      this.messages.push(message);
      this.draftMessage = "";
    }
  }
};
</script>

<style>
.extendMarginLeft {
  margin-left: 3.0625rem;
  margin-bottom: 0.5rem;
}

#messagesBox::-webkit-scrollbar {
  display: none;
}
</style>
