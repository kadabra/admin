import Vue from 'vue'
import client, { feathersClient } from '@kadabra/client'

/*  
    When using Kadabra alongside Feathers packages, you want to make sure 
    you're using the same one Feathers client across your app. This way when 
    you authenticate a client you only have to auth the one client.
    
    This project uses vue-feathers which requires a Feathers client, so we'll
    set up a kadabra-style Feathers client, manually pass it to kadabra, then 
    export it for vue-feathers to use.
*/
const feathers = feathersClient()
const kadabra = client({ feathers })

Vue.prototype.$kadabra = kadabra

export { feathers }