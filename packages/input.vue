<template>
  <div
    class="un-input un-input-widthIcon"
    :class="{ 'un-input-widthIcon': showIcon }"
  >
    <input
      class="un-input-inner"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handelInput"
      :class="{
        'is-disabled': disabled,
        'is-clearable': clearable,
      }"
    />
    <span class="un-input-icon" v-if="showIcon">
      <i class="icon-close" v-if="clearable && value" @click="clear"></i>
      <i
        class="icon-Notvisible"
        v-if="showPassword && value"
        @click="handlePassword"
        :class="{'un-input-icon-view-active':passwordVisible}"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "UnInput",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
  computed: {
    showIcon() {
      return this.clearable || this.showPassword;
    },
  },
  methods: {
    handelInput(e) {
      this.$emit("input", e.target.value);
    },
    clear() {
      this.$emit("input", "");
    },
    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.un-input {
  width: 100%;
  font-size: 16px;
  display: inline-block;
  position: relative;
  .un-input-inner {
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    // height: 40px;
    font-size: inherit;
    padding-left: 14px;
    line-height: 40px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.un-input-widthIcon {
  .un-input-inner {
    // 右侧位置放置小图标
    padding-right: 30px;
  }

  .un-input-icon {
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
  }

  .un-input-icon-view-active{
    color:blue
  }
}
</style>
