import Vue from 'vue'
import VueFeathers from '@vue-feathers/vue-feathers'
import { default as feathersClient } from './feathers'

Vue.use(VueFeathers, { feathersClient })