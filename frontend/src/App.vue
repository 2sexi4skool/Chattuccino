<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1 style="font-weight: 400;">Chattuccino</h1>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content></v-content>
    <div class="align-end">
      <v-container m-2>
        <v-text-field append-outer-icon="mdi-send"></v-text-field>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
