import Vue from 'vue'
import VueFeathers from '@vue-feathers/vue-feathers'
import { feathers as feathersClient} from './feathers'

Vue.use(VueFeathers, { feathersClient })