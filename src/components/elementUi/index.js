import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Container, Aside, Main, Header, Input, Dialog } from 'element-ui'

const els = [Container, Aside, Main, Header, Input, Dialog]
els.forEach(e => {
  Vue.use(e)
})