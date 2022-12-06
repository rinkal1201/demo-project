import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import moment from 'moment';
Vue.prototype.moment = moment

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
