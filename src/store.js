import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexTab: 0,
    apiSso: process.env.VUE_APP_PATH_API_SSO,
    drawer: false,
    breakpointName: 'lg',
    isShowConfirm: false,
    dialogConfirm: {
      auth: false,
      title: '',
      message: '',
      button: {},
      callback: () => {}
    },
    formData: '',
    formThongKe: ''
  },
  getters: {
    getIndexTab: (state) => state.indexTab,
    getIsSigned: (state) => {
      return state.isSigned
    },
    getBreakpointName: (state) => state.breakpointName,
    getIsShowConfirm: (state) => {
      return state.isShowConfirm
    },
    getDialogConfirm: (state) => {
      return state.dialogConfirm
    },
    getFormData: (state) => {
      return state.formData
    },
    getFormThongKe: (state) => {
      return state.formThongKe
    },
  },
  mutations: {
    SET_INDEXTAB(state, indexTab) {
      state.indexTab = indexTab
    },
    SET_ISSIGNED (state, payload) {
      state.isSigned = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_BREAKPOINTNAME(state, breakpointName) {
      state.breakpointName = breakpointName
    },
    SET_SHOWCONFIRM (state, payload) {
      state.isShowConfirm = payload
    },
    SET_CONFIG_CONFIRM_DIALOG (state, payload) {
      state.dialogConfirm = payload
    },
    SET_FORM_DATA (state, payload) {
      state.formData = payload
    },
    SET_FORM_THONGKE (state, payload) {
      state.formThongKe = payload
    },
  },
  actions: {
    exportDoanThi ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'POST',
          url: '/api/'+ filter.collectionName + '/' + filter.id + '/export',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          data : dataPost
        }
        axios(config).then(function(response) {
          if (response.data) {
            var urlFile = window.URL.createObjectURL(response.data)
            var a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            a.href = urlFile
            a.download = 'Danh sách đăng ký ' + filter.tenGoi + '.xlsx'
            a.click()
            window.URL.revokeObjectURL(urlFile)
            resolve('success')
          } else {
            resolve('pending')
          }
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionCreate ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: '/api/' + filter.collectionName,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : dataPost
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error.response)
        })
      })
    },
    collectionCreateChild ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: '/api/' + filter.collectionName + '/' + filter.collectionId + '/' + filter.collectionChildName,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : dataPost
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error.response)
        })
      })
    },
    collectionUpdate ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'put',
          url: '/api/' + filter.collectionName + '/' + filter.id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : dataPost
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionDelete ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'delete',
          url: '/api/' + filter.collectionName + '/' + filter.id,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {}
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionFilter ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: filter.data
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionFilterDaGhiDanh ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName + '/' + filter.toChucId + '/daghidanh',
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: filter.data
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionFilterLevel2 ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName + '/' + filter.collectionId + '/' + filter.collectionNameChild,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: filter.data
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionFilterLevel3 ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName + '/' + filter.collectionId + '/' + filter.collectionNameChild + '/' + filter.collectionChildId + '/' + filter.collectionNameChild2,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data: {},
          params: filter.data
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionDetail ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName + '/' + filter.id,
          data: {},
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    collectionDetailSearch ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let config = {
          method: 'get',
          url: '/api/' + filter.collectionName + '/' + filter.keySearch + '/' + filter.id,
          data: {},
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
        }
        axios(config).then(function (response) {
          let serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    login ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/api/authenticate',
          "method": "POST",
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          "data": JSON.stringify(filter.data)
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    getThongTinUserDangNhap ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          method: 'get',
          url: state.apiSso + '/api/taikhoans/' + filter.email,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': filter.token
          },
          data: {},
          params: {}
        }
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    signUp ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/api/auth/register',
          "method": "POST",
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          "data": JSON.stringify(filter.data)
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    activeTaiKhoan ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/api/auth/' + filter.email +'/verify-email?maKichHoat=' + filter.maKichHoat,
          "method": "PUT",
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          "data": JSON.stringify({})
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    forgotPassWord ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/api/auth/' + filter.email +'/quenmatkhau',
          "method": "POST",
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          "data": JSON.stringify({})
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    verifyForgotPassWord ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        let settings = {
          "url": state.apiSso + '/api/auth/forgot-password/' + filter.email +'/verify-email?maBiMat=' + filter.maBiMat,
          "method": "PUT",
          "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          "data": JSON.stringify({})
        };
        
        $.ajax(settings).done(function (response) {
          let serializable = response
          resolve(serializable)
        }).fail(function (response) {
          reject(response)
        })
      })
    },
    exportDanhSachDangKy ({ commit, state }, filter) {
      return new Promise((resolve, reject) => {
        let dataPost = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: filter.url,
          headers: { 
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          data : dataPost
        }
        axios(config).then(function (response) {
          if (response.data) {
            var urlFile = window.URL.createObjectURL(response.data)
            var a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            a.href = urlFile
            a.download = 'tonghopbaocao-' + filter.maBaoCao +'.xlsx'
            a.click()
            window.URL.revokeObjectURL(urlFile)
            resolve('success')
          } else {
            resolve('pending')
          }
        }).catch(function (error) {
          reject(error)
        })
      })
    },
  }
})
