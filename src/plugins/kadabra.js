import Vue from 'vue'
import client from '@kadabra/client'

const url = `${window.location.hostname}:7777`
const kadabra = client(url)

Vue.prototype.$K = kadabra
