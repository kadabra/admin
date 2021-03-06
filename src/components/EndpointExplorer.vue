<template>
  <div class="endpoint-explorer" :class="{ show: $store.getters.route === 'home' }">
    <div class="w-72 pt-5 pb-3 mx-2">
      <box-primary bg-black endpoint-header p-2 w-48 mx-auto h-10 items-center rounded>
        <span/>
        <txt-accent uppercase font-semibold w-full text-center>
          Endpoints
        </txt-accent>
        <icon-accent mdi-plus text-lg @click="$modal.show('new-endpoint')"/>
      </box-primary>
      <modal name="new-endpoint" height="auto">
        <new-endpoint-modal/>
      </modal>
    </div>
    <box-primary class="endpoint bg-black my-2 mx-4 py-2 pl-3 w-72 h-10 flex items-center rounded"
      v-for="(endpoint, i) in allEndpoints" :key="i"
    >
      <icon-primary-static text-xl :class="`mdi-${endpoint.icon}`"/>
      <txt-primary endpoint-name cursor-pointer font-semibold text
        @click="$store.commit('set-searching', { endpoint: endpoint.name })"
      >
        {{ endpoint.name }}
      </txt-primary>
      <icon-accent v-if="endpoint.name !== 'users'" 
        mdi-dots-vertical text-lg item-wrapper__item 
        @click.prevent.stop="openMenu($event, endpoint)"
      />
      <modal :name="`edit-endpoint-${endpoint.name}`" height="auto">
        <edit-endpoint-modal :endpoint="endpoint"/>
      </modal>
      <modal :name="`new-record-${endpoint.name}`" height="auto">
        <new-record-modal :endpoint="endpoint"/>
      </modal>
      <modal :name="`edit-record-${endpoint.name}`" height="auto">
        <edit-record-modal :endpoint="endpoint"/>
      </modal>
    </box-primary>
    <vue-simple-context-menu
      :elementId="'myUniqueId'"
      :options="[{ name: 'Search' }, { name: 'New Record' }, { name: 'Edit Endpoint' }]"
      :ref="'contextMenu'"
      @optionClicked="optionClicked"
    />
  
  </div>
</template>

<script>
import NewEndpointModal from './modals/NewEndpointModal.vue'
import EditEndpointModal from './modals/EditEndpointModal.vue'
import NewRecordModal from './modals/NewRecordModal.vue'
import EditRecordModal from './modals/EditRecordModal.vue'
import { mixins } from '@vue-feathers/vue-feathers'
const endpointsMixin = mixins.StreamsMixin(['endpoints'])

export default {
  mixins: [endpointsMixin],
  components: {
    NewEndpointModal,
    EditEndpointModal,
    NewRecordModal,
    EditRecordModal
  },
  computed: {
    allEndpoints() {
      const output = [{ name: 'users', icon: 'account-multiple' }]
      for (let endpoint of Object.values(this.endpoints)) {
        output.push(endpoint)
      }
      return output
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    openMenu(event, item) {
      this.$refs.contextMenu.showMenu(event, item)
    },
    optionClicked({item, option}) {
      if (option.name === "Edit Endpoint") this.$modal.show(`edit-endpoint-${item.name}`)
      else if (option.name === "New Record") this.$modal.show(`new-record-${item.name}`)
      else if (option.name === "Search") this.$store.commit('set-searching', { endpoint: item.name })
      else {
        console.log(item, option)
      }
    },
    onInput(e) {
      console.log(e)
      alert(e)
    }
  },
  mounted() {
    this.subAll()
  }
}
</script>

<style scoped>
.endpoint-explorer {
  transition: transform 300ms;
  transform: translate(-20rem);
}
.endpoint-explorer.show {
  transform: translate(0);
}
.endpoint-header {
  display: grid;
  grid-template-columns: 2rem auto 2rem;
}
.endpoint {
  display: grid;
  grid-template-columns: 2rem auto 2rem;
}
.endpoint-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 13rem;
  overflow: hidden;
}
</style>
