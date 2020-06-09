import videoCut from './src/main.vue';

videoCut.install = function (Vue) {
  Vue.component(videoCut.name, videoCut)
}
export default videoCut