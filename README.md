# Vue组件封装与发布

## 1.基本介绍

1. Vue基础语法

2. 组件基本语法

3. 组件通讯 sync provide inject

4. 插槽的使用

5. props校验

6. 过渡与动画处理

7. 计算属性与监听属性

8. v-model语法糖

9. Vue插件机制

10. npm发布

    

## 2.常见组件封装

### 2.1 项目初始化

1. 使用vue-cli脚手架初始化一个Vue项目

   ```
   vue create unleash-ui
   ```

### 2.2 Button组件

#### 2.2.1 前置知识

1. 组件通讯
2. 组件插槽
3. props校验

#### 2.2.2 参数支持

| 参数名字 | 参数描述                                        | 参数类型 | 默认值  |
| -------- | ----------------------------------------------- | -------- | ------- |
| type     | 按钮类型（primary/success/warning/danger/info） | String   | default |
| plain    | 是否朴素按钮                                    | Boolean  | false   |
| round    | 是否圆角按钮                                    | Boolean  | false   |
| circle   | 是否圆形按钮                                    | Boolean  | false   |
| disabled | 是否禁用按钮                                    | Boolean  | false   |
| icon     | 图标类名                                        | String   | 无      |

父组件向子组件传递，用props加格式校验，如下

```vue
<div class="row">
    <un-button circle icon="icon-pic"></un-button>
    <un-button type="primary" circle icon="icon-zhixianghuishou"></un-button>
    <un-button type="success" circle></un-button>
    <un-button type="warning" circle></un-button>
    <un-button type="danger" circle></un-button>
    <un-button type="info" circle></un-button>
</div>
```




#### 2.2.3 事件支持

| 事件名字 | 事件描述 |
| -------- | -------- |
| click    | 点击事件 |



1. 子组件绑定点击事件，触发时，向父组件传递一个click事件

   ```js
   methods: {
       handleClick(e){
           this.$emit('click',e)
       }
   },
   ```

2. 父组件监听click事件

   ```vue
   <un-button @click="fn">按钮</un-button>
   ```


#### 2.2.4 设置样式

可以使用模板字符串，根据传值，动态绑定样式

```vue
<button class="un-button" :class="[`un-button-${type}`]">
    <span>
        <slot></slot>
    </span>
</button>
```



### 2.3 dialog组件

#### 2.3.1 前置知识

1. Vue过渡与动画
2. sync修饰符
3. 具名插槽与v-slot指令

#### 2.3.2 参数支持

| 参数名  | 参数描述                         | 参数类型 | 默认值 |
| ------- | -------------------------------- | -------- | ------ |
| title   | 对话框标题                       | String   | 提示   |
| width   | 宽度                             | String   | 50%    |
| top     | 与顶部距离                       | String   | 15vh   |
| visible | 是否显示dialog（支持sync修饰符） | boolean  | false  |

1. 关闭遮罩层，事件不从内部触发

```vue
<!-- 即事件不是从内部元素触发的 -->
<div class="un-dialog-wrapper" v-show="visible" @click.self="handleClose">...</div>
```
2. sync修饰符，支持子组件修改父组件的prop传值。 方便的是父组件（子组件没有方便），子组件必须用

```vue
//父组件
<un-dialog :visible.sync="visible">

//子组件传递方法格式：this.$emit('update:XXX',value)
handleClose(){
    this.$emit('update:visible',false)
}
```



#### 2.3.3 事件支持

| 事件名 | 事件描述 |
| ------ | -------- |
| opened | 打开     |
| closed | 关闭     |

#### 2.3.4 插槽说明

| 插槽名称 | 插槽描述   |
| -------- | ---------- |
| default  | dialog内容 |
| title    | dialog标题 |
| footer   | dialog底部 |

插槽无内容，不渲染标签， v-if="$slots.footer"

```vue
<div class="un-dialog-footer" v-if="$slots.footer">
    <slot name="footer"></slot>
</div>
```



### 2.4 输入组件

#### 2.4.1 参数支持

| 参数名称      | 参数描述                         | 参数类型 | 默认值 |
| ------------- | -------------------------------- | -------- | ------ |
| placeholder   | 占位符                           | string   | 无     |
| type          | 文本框类型（text/password）      | string   | text   |
| disabled      | 禁用                             | boolean  | false  |
| clearable     | 是否展示清除按钮                 | boolean  | false  |
| show-password | 是否展示密码切换按钮（切换类型） | boolean  | false  |
| name          | name属性                         | string   | 无     |

设置光标的CSS属性 cursor （disabled 用到）

[cursor]: https://www.runoob.com/cssref/pr-class-cursor.html



#### 2.4.2 事件支持

| 事件名称 | 事件描述     |
| -------- | ------------ |
| blur     | 失去焦点时间 |
| change   | 内容改变时间 |
| focus    | 获取焦点事件 |



#### 2.4.3 v-model的实质，在组件上使用v-model

v-model实质上就是一个语法糖，等价于v-bind和input事件

```vue
<!-- v-model实质上就是一个语法糖，等价于v-bind:value和input事件 -->
<input type="text" v-model="username">
<input type="text" :value="username" @input="username=$event.target.value">
```

在组件上使用v-model

[在组件上使用v-model]: https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model



#### 2.4.4 show-password切换type（text or password）

不能直接改父组件的type，**改了变不回来会有很大的问题**

1. 子组件重新定义一个值，passwordVisible，true（可见）则type为text，false（不可见）则password

2. 子组件的type改为（line 4），逻辑如下：

   1. 首先判断是否展示看密码的按钮，若不展示则类型根据 传值type判断
   2. 若展示看密码的按钮，则判断密码是否可见的标志，若可见则类型为text
   3. 若不展示看密码的按钮，则类型为password

   ```vue
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
   ```



### 2.5 switch组件

#### 2.5.1 参数支持

| 参数名称      | 参数描述   | 参数类型 | 默认值 |
| ------------- | ---------- | -------- | ------ |
| v-model       | 双向绑定   |          |        |
| name          | name       | string   |        |
| activeColor   | 激活颜色   | string   |        |
| inactiveColor | 不激活颜色 | string   |        |

name属性必须有，作用如下

1. 表单的name作用：name 属性用于对提交到服务器后的表单数据进行标识
2. 注意：只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。

switch组件可以加一个不显示的，有name属性的input框

#### 2.5.2 事件支持

| 事件名称 | 事件描述 |
| -------- | -------- |
| change   |          |



#### 2.5.3 点击改变颜色，使用nextTick
点击改变颜色，使用nextTick

```js
async handleClick() {
    this.$emit("input", !this.value);
    // 等待value值改变，再changeColor，使用nextTick
    await this.$nextTick();
    this.changeColor();
},
```



#### 2.5.4 添加name属性

switch组件作为表单元素使用，必须有name属性

name属性必须有，作用如下

1. 表单的name作用：name 属性用于对提交到服务器后的表单数据进行标识
2. 注意：只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。

switch组件可以加一个不显示的，有name属性的input框

```html
<input type="checkbox" class="un-switch-input" :name="name"/>
<style>
.un-switch-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
</style>
```





### 2.6 单选框radio组件

#### 2.6.1 前置知识

radio的基本使用 

[vue的radio]: https://cn.vuejs.org/v2/guide/forms.html#%E5%8D%95%E9%80%89%E6%8C%89%E9%92%AE

#### 2.6.2 参数支持

| 参数名称 | 参数描述        | 参数类型 | 默认值 |
| -------- | --------------- | -------- | ------ |
| v-model  | 双向绑定        |          |        |
| label    | 单选框的value值 |          |        |
| name     | name            |          |        |

