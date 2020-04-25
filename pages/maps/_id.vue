<template>
  <v-card>
    <v-toolbar color="secondary" elevation="0">
      <v-toolbar-title :class="{ 'font-italic': !map.name }">
        {{ map.name || 'Unnamed' }}
        <span :class="`info-bg difficulty ${map.difficulty.toLowerCase()}`">{{ map.difficulty }}</span>
        <span class="info-bg region">{{ map.region }}</span>
      </v-toolbar-title>
      <v-spacer />
      <edit-map v-bind="map" />
    </v-toolbar>
    <div id="map-wrap" style="height: calc(100vh - 36px - 64px - 12px - 12px - 64px); width: 100%; z-index: 0">
      <client-only>
        <l-map ref="map" :options="options" :crs="options.crs" :center="options.center" @zoomend="zoomEnd">
          <l-image-overlay :url="`/maps/${map.type}.png`" :bounds="bounds" />
        </l-map>
      </client-only>
    </div>
  </v-card>
</template>
<script>
import EditMap from '@/components/EditMap'
const isBrowser = typeof window !== 'undefined'
let L = null
if (isBrowser) L = require('leaflet')

export default {
  middleware: ['map'],
  components: {
    'edit-map': EditMap
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ app, params, store, error }) {
    return app.$api.get(`/maps/${params.id}`).then(({ data, status }) => {
      if (status === 204) {
        error({
          message: 'Not a map',
          statusCode: 404
        })
      } else if (status === 200) {
        return { map: data }
      }
    })
  },
  data() {
    return {
      bounds: [
        [0, 0],
        [2000, 2000]
      ],
      options: {
        maxBounds: [
          [-500, -500],
          [2500, 2500]
        ],
        maxBoundsViscosity: 1,
        center: [1000, 1000],
        crs: null,
        minZoom: -1.5,
        maxZoom: 1.8,
        zoom: -1.5,
        zoomSnap: 0
      },
      map: {}
    }
  },
  beforeMount() {
    this.options.crs = L.CRS.Simple
  },
  methods: {
    zoomEnd(event) {
      console.log(`Zoom: ${event.target._zoom}`)
    }
  }
}
</script>
<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#map-wrap {
  padding: 0;
}

.info-bg {
  background-color: map-get($grey, darken-4);
  padding: 0 4px;
  border-radius: 3px;
  font-size: 70%;
}

.difficulty {
  &.hard {
    color: map-get($red, base);
  }

  &.medium {
    color: map-get($orange, lighten-1);
  }
}
</style>