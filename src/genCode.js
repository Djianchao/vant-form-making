// const matchVant = /(van-[\w]*)/

function getComponents(el) {
  const list = []
  let dragBox = el.children[0]
  if (dragBox.className != 'deng') {
    return list;
  } else {
    // 拿到在拖拽盒子中的所有组件节点
    let dragItems = dragBox.childNodes;
    dragItems.forEach(dom => {
      list.push(dom.firstElementChild.dataset.wtype)
    });
    return list
  }
}

function genTemplate(type) {
  if (type == 'calendar') {
    return `
  <van-cell
    title="选择单个日期"
    :value="calendar.date"
    @click="calendar.show = true"
  />
  <van-calendar
    v-model="calendar.show"
    @confirm="onConfirm"
  />
    `
  } else if (type == 'checkbox') {
    return `
    van-checkbox v-model="el.checked">复选框</van-checkbox>
    `
  } else if (type == 'cascader') {
    return `
    <van-field
      v-model="Cascader.fieldValue"
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="Cascader.show = true"
    />
    <van-popup
      v-model="Cascader.show"
      round
      position="bottom"
    >
      <van-cascader
        v-model="Cascader.cascaderValue"
        title="请选择所在地区"
        :options="Cascader.options"
        @close="Cascader.show = false"
        @finish="onFinish"
      />
    </van-popup>
    `
  } else if (type == 'datetimePicker') {
    return `
    <van-datetime-picker
      v-model="datetime.currentDate"
      type="date"
      title="选择年月日"
      :min-date="datetime.minDate"
      :max-date="datetime.maxDate"
		/>
    `
  } else if (type == 'field') {
    return `
    <van-cell-group>
      <van-field
        v-model="field.value"
        label="文本"
        placeholder="请输入用户名"
      />
		</van-cell-group>
    `
  } else if (type == 'form') {
    return `
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >提交</van-button>  
      </div>
    </van-form>
    `
  }
}

function genData(type, data) {
  if (type == 'calendar') {
    data[type] = {
      show: false,
      date: "",
    }
  } else if (type == 'checkbox') {
    data[type] = {
      checked: false
    }
  } else if (type == 'cascader') {
    data[type] = {
      fieldValue: "",
      cascaderValue: "",
      show: false,
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ],
    }
  } else if (type == 'datetimePicker') {
    data[type] = {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    }
  } else if (type == 'field') {
    data[type] = {
      value: "",
    }
  } else if (type == 'form') {
    data[type] = {
      username: "",
      password: "",
    }
  }
}

export default function (el) {
  let componentCode = ""
  let data = {}
  const components = getComponents(el)
  components.forEach(type => {
    componentCode += genTemplate(type)
    genData(type, data)
  })

  return `
  <template lang="">
    <div>
      ${componentCode}
    </div>
  </template>
  <script>
    export default {
      name: '',
      components: '',
      data() {
        return ${JSON.stringify(data)}
      },
      methods: {

      }
    }
  </script>
  <style lang="">
    
  </style>
  `;
}