<template>
  <div class="wrap-login">
    <v-container
      id="login-page"
      class="px-0 pt-0"
      fluid
      tag="section"
    >
      <div class="container-wrap">
        <div class="wrap-title">
          <v-flex style="text-align: center;" class="mb-5">
            <img class="img-login-logo" :src="`${publicPath}/images/logo-vaip.jpg?t=93111413`">
          </v-flex>
          <v-flex class="wrap-title pt-1 mb-2 mt-3">
            <div class="text-1">Hệ thống thông tin quản lý các cuộc thi tin học</div>
          </v-flex>
        </div>

        <div class="wrap-form px-4 py-3" v-if="!signed && !dialogActive">
          <div>
            <v-form ref="form" v-model="valid" lazy-validation class="">
              <v-flex xs12 class="action-title mb-5" style="text-align: center;
                font-size: 22px;
                font-family: 'Roboto Slab';
                color: #fff;
                font-weight: 700;">
                <div>ĐĂNG KÝ TÀI KHOẢN</div>
              </v-flex>
              <v-flex xs12 class="select-loaitk" style="text-align: center;">
                <v-radio-group class="d-inline-block mt-0"
                  v-model="loaiTaiKhoan"
                  row
                >
                  <v-radio
                    label="Tài khoản tổ chức"
                    value="0"
                    color="#fff"
                  ></v-radio>
                  <v-radio
                    label="Tài khoản cá nhân"
                    value="1"
                    color="#fff"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  dense
                  class="input-text"
                  placeholder="Email đăng nhập"
                  v-model="userName"
                  :rules="[v => !!v || 'Email là bắt buộc']"
                  required
                  prepend-inner-icon="mdi-account"
                  @keyup.enter="signUp"
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="" style="margin-top: 30px">
                <v-text-field
                  class="input-text"
                  dense
                  placeholder="Mật khẩu"
                  v-model="password"
                  :type="'password'"
                  :rules="[v => !!v || 'Mật khẩu là bắt buộc']"
                  required
                  prepend-inner-icon="mdi-key"
                  @keyup.enter="signUp"
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="wrap-btn-login" style="margin-top: 30px;margin-bottom: 20px">
                <v-btn class="my-0 white--text mr-3 btn-login" style="padding: 0 15px !important;"
                  :loading="loading"
                  :disabled="loading"
                  @click="signUp"
                >
                  <v-icon size="20">mdi-account-plus-outline</v-icon>&nbsp;
                  Đăng ký
                </v-btn>
                
                <a @click="login()"  href="javascript:;" class="" style="position: absolute; right: 0; bottom: 0; color: #fff;">
                  <span> Đăng nhập</span>
                </a>
              </v-flex>
            </v-form>
          </div>
        </div>
        <div class="wrap-form px-3 py-3" v-if="signed">
          <div class="text-login">TÀI KHOẢN ĐÃ ĐĂNG NHẬP HỆ THỐNG</div>
          <v-flex xs12  style="margin: 20px 0;text-align: center;">
            <v-btn class="my-0 white--text mr-3 btn-login" style="padding: 0 15px !important;"
              :loading="loading"
              :disabled="loading"
              @click="submitLogout"
            >
              <div class="v-btn__content">
                <v-icon size="18">mdi-logout-variant</v-icon>&nbsp;
                <span>Đăng xuất</span>
              </div>
            </v-btn>
            <v-btn class="my-0 white--text mr-3 btn-login" style="padding: 0 15px !important;"
              :loading="loading"
              :disabled="loading"
              @click="goToPage"
            >
                <v-icon size="20">mdi-home-circle-outline</v-icon>&nbsp;
                <span>Truy cập hệ thống</span>
            </v-btn>
          </v-flex>
        </div>
      </div> 
      
    </v-container>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </div>
    <v-dialog
      max-width="450"
      v-model="dialogActive"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3" style=""
        >
          <v-toolbar-title>KÍCH HOẠT TÀI KHOẢN</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formActive"
            v-model="validFormActive"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Mã kích hoạt <span class="red--text">(*)</span> </label>
                  <i>Vui lòng kiểm tra email để lấy mã kích hoạt.</i>
                  <v-text-field
                    class="flex input-form"
                    v-model="maKichHoat"
                    solo
                    dense
                    :rules="[v => !!v || 'Mã kích hoạt là bắt buộc']"
                    required
                    hide-details="auto"
                    placeholder="Nhập mã kích hoạt"
                    clearable
                  ></v-text-field>
              </v-col>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small class="mr-2" color="primary" :loading="loading" :disabled="loading" @click="activeTaiKhoan">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Kích hoạt</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import toastr from 'toastr'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  export default {
    name: 'Login',

    data: () => ({
      publicPath: process.env.VUE_APP_PULIC_PATH,
      apiSso: process.env.VUE_APP_PATH_API_SSO,
      overlay: false,
      loading: false,
      valid: true,
      userName: '',
      password: '',
      client_secret: '',
      code: '',
      signed: false,
      loaiTaiKhoan: '0',
      dialogActive: false,
      validFormActive: false,
      emailActive: '',
      maKichHoat: ''
    }),
    created () {
      let vm = this
      if (Vue.$cookies.get('Token')) {
        vm.signed = true
      } else {
        vm.signed = false
      }
      
      let router = vm.$router.history.current
      let searchParams = window.location.href.split("?")[1]
      if (searchParams) {
        let email = decodeURIComponent(String(vm.getSearchParams(searchParams, "email")))
        let active = decodeURIComponent(String(vm.getSearchParams(searchParams, "active")))
        if (email && active && !vm.signed) {
          vm.dialogActive = true
          vm.emailActive = email
          vm.maKichHoat = active
        }
      }
    },
    computed: {
    },
    methods: {
      signUp () {
        let vm = this
        if (vm.loading || !vm.userName || !vm.password) {
          return
        }
        vm.loading = true
        let filter = {
          data: {
            "email": String(vm.userName).trim(),
            "loaiTaiKhoan": Number(vm.loaiTaiKhoan),
            "matKhau": vm.password
          }
        }
        vm.$store.dispatch('signUp', filter).then(function (result) {
          vm.loading = false
          vm.emailActive = String(result.email).trim()
          toastr.remove()
          toastr.success('Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.')
          vm.$refs.form.reset()
          vm.$refs.form.resetValidation()
          setTimeout(function () {
            vm.dialogActive = true
          }, 300)
        }).catch(function (result) {
          vm.loading = false
          toastr.remove()
          if (result.status == 409) {
            toastr.error('Đăng ký không thành công. Email đã được sử dụng.')
          } else {
            toastr.error('Đăng ký không thành công')
          }
        })
      },
      activeTaiKhoan () {
        let vm = this
        if (!String(vm.maKichHoat).trim()) {
          return
        }
        vm.loading = true
        let filter = {
          maKichHoat: vm.maKichHoat,
          email: vm.emailActive
        }
        vm.$store.dispatch('activeTaiKhoan', filter).then(function (result) {
          vm.loading = false
          toastr.remove()
          toastr.success('Kích hoạt thành công. Đăng nhập để sử dụng hệ thống.')
          setTimeout(function () {
            vm.$router.push({ path: '/dang-nhap' })
          }, 300)
        }).catch(function (result) {
          vm.loading = false
          toastr.remove()
          toastr.error('Kích hoạt không thành công. Mã kích hoạt không chính xác.')
        })
      },
      login () {
        let vm = this
        vm.$router.push({ path: '/dang-nhap' })
      },
      goToPage () {
        let vm = this
        let currentQuery = vm.$router.history.current.query
        if (currentQuery.hasOwnProperty('redirect') && currentQuery.redirect) {
          vm.$router.push({ path: currentQuery.redirect })
        } else {
          vm.$router.push({ path: '/' })
        }
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
  }
</script>

<style lang="scss">
  $image-login: $public-path + '/images/bg-login-2.jpg?t=3913123';
  #app {
    background: transparent !important
  }
  .select-loaitk .v-icon, .select-loaitk label  {
    color: #ffffff !important;
  }
  .wrap-login {
    background: url($image-login) no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .wrap-login input {
    padding-top: 0px !important;
  }
  #login-page {
    position: relative;
    margin: 0 auto;
  }
  .container-wrap {
    // background: rgba(14, 42, 66, 0.8);
    // box-shadow: inset -4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: auto;
    height: auto;
    // padding: 45px;
    margin: 0 auto;
    margin-top: 40px;
  }
  #login-page .text-1 {
    font-family: "Roboto Slab";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    color: #ffffff;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  #login-page .text-2 {
    font-family: "Roboto Slab";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
  }
  .wrap-form {
    max-width: 450px;
    margin: 0 auto;
    background: rgba(14, 42, 66, 0.8);
    border: 1px solid #BAB7B5;
    border-radius: 5px;
    margin-top: 45px;
  }
  .text-login {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.17);
    margin-bottom: 15px;
    text-transform: uppercase;
    text-align: center;
  }
  .wrap-login .input-text .v-input__slot:before {
    border-color: transparent;
    border: none !important;
  }
  .wrap-login .input-text .v-input__slot::after {
    display: none !important
  }
  .wrap-login .input-text .v-input__slot {
    border: 1px solid #BAB7B5;
    padding: 4px 5px;
    border-radius: 5px;
    height: 32px
  }
  .input-text .v-icon{
    color: #ffffff !important;
    font-size: 20px !important;
  }
  .input-text input {
    color: #ffffff !important;
    font-size: 14px;
  }
  .input-text  .v-input__slot {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 8%), 0px 2px 2px 0px rgb(0 0 0 / 0%), 0px 1px 5px 0px rgb(0 0 0 / 7%) !important;
  }
  .input-text input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ffffff !important;
    opacity: 1; /* Firefox */
  }

  .input-text input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #ffffff !important;
  }

  .input-text input::-ms-input-placeholder { /* Microsoft Edge */
    color: #ffffff !important;
  }
  .btn-login {
    background: linear-gradient(90deg, #114078 0%, #3757AA 100%);
  }
  .wrap-title, .wrap-btn-login {
    text-align: center;
    text-transform: uppercase;
    position: relative;
  }
  .wrap-contact-info {
    max-width: 1366px !important;
    height: 120px;
    position: absolute;
    bottom: 0;
    left: 100px;
    color: #ffffff !important;
  }
  .img-login-logo {
    width: 120px;
    border-radius: 30px;
  }
  .wrap-title {
    text-align: center;
    margin-top: 0px;
  }
  @media screen and (max-width: 426px) {
    .action-title {
      display: none;
    }
    .img-login-logo {
      width: 50px;
    }
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    #login-page .text-1 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    #login-page .text-2 {
      font-size: 16px;
    }
    .wrap-btn-login {
      text-align: center;
    }
    .wrap-form {
      margin: 0 10px;
      margin-top: 10px;
    }
    .wrap-contact-info {
      left: 15px;
    }
  }
  @media screen and (min-width: 426px) and (max-width: 769px){
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    .wrap-form {
      margin-top: 15px;
      padding-top: 24px !important;
    }
    #login-page .text-1 {
      font-size: 18px;
    }
    .wrap-contact-info {
      left: 50px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1025px){
    .container-wrap {
      padding: 8px;
      margin-top: 0px;
    }
    .wrap-title {
      text-align: center;
      margin-top: 0px;
    }
    .wrap-form {
      margin-top: 15px;
    }
    .wrap-contact-info {
      left: 50px;
    }
  }
</style>
