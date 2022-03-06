import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index.js'
import store from './vuex/index.js'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css' 
Vue.use(VueAwesomeSwiper)
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import {
  TInput,
  TTextarea,
  TButton,
  TAlert
} from 'vue-tailwind/dist/components';

const settings = {
  't-input': {
    component: TInput,
    props: {
      fixedClasses: 'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
      }
    }
  },
  't-textarea': {
    component: TTextarea,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
    }
  },
  't-alert': {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
        body: 'flex-grow',
        close: 'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4'
      },
      classes: {
        wrapper: 'bg-blue-50 border-blue-500',
        body: 'text-blue-700',
        close: 'text-blue-500 hover:bg-blue-200'
      },
      variants: {
        danger: {
          wrapper: 'bg-red-50 border-red-500',
          body: 'text-red-700',
          close: 'text-red-500 hover:bg-red-200'
        },
        success: {
          wrapper: 'bg-green-50 border-green-500',
          body: 'text-green-700',
          close: 'text-green-500 hover:bg-green-200'
        }
      }
    }
  },
  'normal-button': {
    component: TButton,
    props: {
      type: 'button',
      classes: 'bg-red-600 text-white'
    }
  },
  'submit-button': {
    component: TButton,
    props: {
      type: 'submit'
    }
  }
}

Vue.use(VueTailwind, settings)
Vue.use(VueRouter)

Vue.filter('priceFormat', function (value) {
    if (!value) return ''

    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
})

Vue.filter('phoneFormat', function (value) {
    if (!value) return '';

    var cleaned = ('' + value).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router : routes,
  store: store
}).$mount('#app');