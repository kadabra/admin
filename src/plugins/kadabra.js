import Vue from 'vue'
import client from '@kadabra/client'
import feathers from './feathers'

/*  
    When using Kadabra alongside other Feathers packages, you want to make sure 
    you're using the same one Feathers client across your app. This way when 
    you authenticate a client you only have to auth the one client.
*/
const kadabra = client({ feathers })

Vue.prototype.$kadabra = kadabra