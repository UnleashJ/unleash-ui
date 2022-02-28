<template>
  <label class="un-radio" :class="{'is-checked':label === value}">
    <span class="un-radio-input">
      <!-- 选择小框 -->
      <span class="un-radio-inner"> </span>
      <input
        type="radio"
        class="un-radio-original"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <!-- label -->
    <span class="un-radio-label">
      <slot>
        <!-- 插槽默认展示label -->
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "UnRadio",
  computed:{
      model:{
          get(){
              return this.value
          },
          set(value){
              console.log(value)
              this.$emit('input',value)
          }
      }
  },
  props: {
    label: {
      type: [String, Number, Boolean],
      default: "",
    },
    value: null,
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.un-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: nun;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: nun;
  -webkit-user-select: nun;
  -moz-user-select: nun;
  .un-radio-input {
    white-space: nowrap;
    cursor: pointer;
    outline: nun;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .un-radio-inner {
      border: 1px solid #dcdfe6;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }
    .un-radio-original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
      width: 0;
    }
  }
  .un-radio-label {
    font-size: 14px;
    padding-left: 10px;
  }
}
// 选中的样式
.un-radio.is-checked {
  .un-radio-input {
    .un-radio-inner {
      border-color: #409eff;
      background-color: #409eff;
      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .un-radio-label {
    color: #409eff;
  }
}
</style>
