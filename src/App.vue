<template>
  <v-app v-resize="onResize">
    <confirm-dialog></confirm-dialog>
    <router-view></router-view>
  </v-app>
</template>

<script>
import VueConfirmDialog from './views/ConfirmDialog.vue'
export default {
  name: 'App',

  components: {
    'confirm-dialog': VueConfirmDialog
  },

  data: () => ({
    //
  }),
  created () {
    if (this.$cookies.get('Token')) {
    } else {
      if (window.location.href.indexOf("/dang-ky") || window.location.href.indexOf("/dang-nhap")) {
        
      } else {
        this.$router.push({ path: '/' })
      }
    }
  },
  computed: {
  },
  methods: {
    onResize: function () {
      let breakpointName = this.$vuetify.breakpoint.name
      this.$store.commit('SET_BREAKPOINTNAME', breakpointName)
    }
  }
};
</script>
