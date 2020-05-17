<template>
  <div
    :class="`speechbubble ${arrowDirection}`"
    :style="{ backgroundColor: color }"
  >
    <div class="messageContent">{{ message }}</div>
    <div :style="suffixPosition">{{ suffix }}</div>
  </div>
</template>

<script>
export default {
  props: ["message", "arrowDirection", "color", "suffix"],
  computed: {
    suffixPosition() {
      return {
        float: this.arrowDirection,
        fontSize: ".7rem",
        color: "#071E22DE",
        padding: "0 .5rem"
      };
    }
  }
};
</script>

<style scoped>
.messageContent {
  padding: 0.5rem;
  overflow-wrap: break-word;
  color: #071e22;
}

.speechbubble {
  position: relative;
  border-radius: 0.4rem;
  min-height: 2.5rem;
  margin-bottom: 0.5rem;
}

.left {
}
.left::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 20px;
  top: 40%;
  left: -0.6rem;
  background-color: #f8f2dc;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
}

.right {
}

.right::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 20px;
  top: 40%;
  right: -0.6rem;
  background-color: #dea47e;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
</style>
