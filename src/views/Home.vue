<template>
  <v-app>
    <!-- <Drawer></Drawer> -->
    <AppBar></AppBar>
    <v-main>
      <div class="container wrap-content-page">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </v-main>
    
  </v-app>
</template>

<script>
import Drawer from '../containerComponents/Drawer'
import AppBar from '../containerComponents/AppBar'
import Footer from '../containerComponents/Footer'
import axios from 'axios'
export default {
  name: 'Home',

  components: {
    Drawer,
    AppBar,
    Footer
  },

  data: () => ({
  }),
  created () {
    let vm = this
    let router = vm.$router.history.current
    // if (router.path === '/') {
    //   this.$router.push({ path: '/dang-nhap' })
    // }
    console.log('router', router)
    let searchParams = window.location.href.split("?")[1]
    if (searchParams) {
      let email = decodeURIComponent(String(vm.getSearchParams(searchParams, "email")))
      let active = decodeURIComponent(String(vm.getSearchParams(searchParams, "active")))
      if (window.location.href.indexOf("/dang-ky") && email && active) {
        window.location.href = window.location.origin + '/#/dang-ky' + window.location.search
      }
    }
    if (router.name == 'DashBoardRedirectDangKy' && router.params.macuocthi) {
      vm.goToDangKy(router.params.macuocthi)
    }
    if (router.name == 'DashBoardRedirectCuocThi' && router.params.macuocthi) {
      vm.goToCuocThi(router.params.macuocthi)
    }
    // let pathname = window.location.pathname
    // if (pathname && String(pathname).indexOf('/dangky/') >=0) {
    //   let splits = pathname.split('/')
    //   if (splits.length == 3 && splits[2]) {
    //     vm.goToDangKy(splits[2])
    //   }
    // }
    // if (pathname && String(pathname).indexOf('/cuocthi/') >=0) {
    //   let splits = pathname.split('/')
    //   if (splits.length == 3 && splits[2]) {
    //     vm.goToCuocThi(splits[2])
    //   }
    // }
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let router = newRoute
      let vm = this
      if (router.name == 'DashBoardRedirectDangKy' && router.params.macuocthi) {
        vm.goToDangKy(router.params.macuocthi)
      }
      if (router.name == 'DashBoardRedirectCuocThi' && router.params.macuocthi) {
        vm.goToCuocThi(router.params.macuocthi)
      }
    }
  },
  methods: {
    goToDangKy (macuocthi) {
      let vm = this
      let config = {
        method: 'get',
        url: '/api/cuocthis/thongtincuocthi/' + macuocthi,
        data: {},
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        }
      }
      axios(config).then(function (response) {
        let serializable = response.data
        if (serializable) {
          window.location.href = window.location.origin + '/#/dang-ky-thi/' + serializable.id
        }
      }).catch(function (error) {
      })
    },
    goToCuocThi (macuocthi) {
      let vm = this
      let config = {
        method: 'get',
        url: '/api/cuocthis/thongtincuocthi/' + macuocthi,
        data: {},
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        }
      }
      axios(config).then(function (response) {
        let serializable = response.data
        if (serializable) {
          window.location.href = window.location.origin + '/#/cuoc-thi/' + serializable.id
        }
      }).catch(function (error) {
      })
    },
    getSearchParams (prams, key) {
      let value = ""
      let headers = prams.split("&")
      headers.forEach(function (header) {
        header = header.split("=");
        let keyHeader = header[0];
        if (keyHeader === key) {
          value = header[1]
        }
      });
      return value
    }
  }
};
</script>
<style lang="scss">
  main.v-main {
    padding-top: 0px !important;
    padding-bottom: 0px !important
  }
  @media screen and (max-width: 426px){
    
  }
  @media screen and (max-width: 769px){
    .wrap-content-page {
      padding-bottom: 70px !important
    }
  }
  @media screen and (max-width: 1025px){
    .wrap-content-page {
      padding-bottom: 70px !important
    }
  }
</style>
