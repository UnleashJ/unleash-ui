<template>
  <div
    class="un-switch"
    @click="handleClick"
    :class="{ 'is-checked': value }"
  >
    <input type="checkbox" class="un-switch-input" :name="name"/>
    <span class="un-switch-core" ref="core">
      <span class="un-switch-button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "un-switch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "",
    },
    inactiveColor: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.changeColor();
  },
  methods: {
    handleClick() {
      this.$emit("input", !this.value);
      // 等待value值改变，再changeColor，使用nextTick
      this.$nextTick(this.changeColor);
    },
    changeColor() {
      if (this.activeColor || this.inactiveColor) {
        let color = this.value ? this.activeColor : this.inactiveColor;
        console.log(color);
        this.$refs.core.style.borderColor = color;
        this.$refs.core.style.backgroundColor = color;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.un-switch {
  display: inline-flex;
  align-items: center;
  height: 20px;
  .un-switch-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .un-switch-core {
    margin: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    background-color: #dcdfe6;
    box-sizing: border-box;
    transition: all 0.3s;

    .un-switch-button {
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border-radius: 50%;
      top: 1px;
      left: 1px;
      transition: all 0.3s;
    }
  }
}

.un-switch.is-checked {
  .un-switch-core {
    background-color: #409eff;
    border-color: #409eff;
    .un-switch-button {
      transform: translateX(20px);
    }
  }
}
</style>
