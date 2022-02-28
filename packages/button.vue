<template>
  <button
    class="un-button"
    :class="[
      `un-button-${type}`,
      {
        'is-palin': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
      },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span>
      <i v-if="icon" :class="icon"></i>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "UnButton",
  props: {
    type: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.un-button {
  box-sizing: border-box;
  color: black;
  background-color: #f3efef;
  padding: 0 20px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 5px;
  line-height: 32px;
  height: 32px;
  vertical-align: top;
}

.un-button-primary {
  color: rgb(243, 243, 243);
  border: none;
  background-color: rgb(122, 206, 245);
  &:hover {
    background-color: rgb(175, 224, 247);
  }
}

.un-button-success {
  color: rgb(243, 243, 243);
  border: none;
  background-color: rgb(127, 236, 141);
}

.un-button-primary.is-palin {
  background-color: rgb(229, 244, 252);
  border: rgb(122, 206, 245) 1px solid;
  color: rgb(122, 206, 245);
}

.un-button-success.is-palin {
  background-color: rgb(233, 252, 229);
  border: rgb(127, 236, 141) 1px solid;
  color: rgb(127, 236, 141);
}

.un-button.is-round {
  border-radius: 16px;
}

.un-button.is-circle {
  width: 32px;
  border-radius: 50%;
  padding: 0%;
}

.is-disabled {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
</style>
