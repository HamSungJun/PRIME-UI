import '../src/styles/index.scss';
import {configure} from '@storybook/vue'
import Vue from 'vue';
import PrimeUI from '../src/packages'
Vue.use(PrimeUI);
configure(require.context('../src', true, /\.stories\.js$/),module);

