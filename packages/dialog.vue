<template>
  <transition name="dialog-animation">
    <div class="un-dialog-wrapper" v-show="visible" @click.self="handleClose">
      <div class="un-dialog" :style="{ width: width, marginTop: top }">
        <div class="un-dialog-header">
          <slot name="title">
            <span class="un-dialog-title">
              {{ title }}
            </span>
          </slot>

          <button class="un-dialog-headerbtn" @click="handleClose">
            <i class="icon-close"></i>
          </button>
        </div>

        <div class="un-dialog-body">
          <slot><span> 这是一段内容 </span></slot>
        </div>

        <div class="un-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "UnDialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    width: {
      type: String,
      default: "50%",
    },
    top: {
      type: String,
      default: "15vh",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
// scoped会给当前组件的模板中的所有的元素都添加一个随机的属性
// scoped会给当前组件中的所有样式添加一个对应的属性选择器
.un-dialog-wrapper {
  position: fixed;
  // 设置width和height为自动调整
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;

  .un-dialog {
    width: 30%;
    margin: 15vh auto;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

    &-header {
      padding: 20px 20px 10px;
      // text-align: center;
      position: relative;

      .un-dialog-title {
        font-size: 18px;
        line-height: 24px;
      }

      .un-dialog-headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        background-color: transparent;
        border: none;
        font-size: 16px;
        width: 32px;
        height: 32px;

        &:hover {
          border: 1px solid rgb(180, 178, 178);
          border-radius: 5px;
        }
      }
    }

    &-body {
      font-size: 14px;
      padding: 20px 20px;
      // 设置换行方式
      word-break: break-all;
      color: rgb(94, 91, 91);
    }

    &-footer {
      padding: 10px 20px 20px;
      text-align: right;

      .un-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-animation-enter-active {
  animation: dialog-animation 0.2s;
}

.dialog-animation-leave-active {
  animation: dialog-animation 0.2s reverse;
}

@keyframes dialog-animation {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
  }
}
</style>
