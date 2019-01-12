import Vue from 'vue'
import { VueFeathers } from '@vue-feathers/vue-feathers'
import { feathersClient } from '@kadabra/client'

Vue.use(VueFeathers, { feathersClient: feathersClient() })