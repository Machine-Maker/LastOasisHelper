<template>
  <client-only>
    <l-map
      id="tree"
      ref="tree"
      :options="options"
      :crs="crs"
      :prefer-canvas="true"
    >
      <l-image-overlay
        ref="treeImage"
        :bounds="bounds"
        :center="center"
        url="./map.png"
      >
      </l-image-overlay>
    </l-map>
  </client-only>
</template>
<script>
import { CRS } from 'leaflet'

export default {
  data() {
    return {
      bounds: [
        [0, 0],
        [1400, 1400]
      ],
      center: [700, 700],
      crs: CRS.Simple,
      options: {
        minZoom: -2,
        maxZoom: 3,
        zoomSnap: 0.2,
        zoomDelta: 0.2,
        attributionControl: true
      }
    }
  }
}
</script>
<style lang="scss">
#tree {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
