<template>
    <div>
        <v-row class="mx-0 my-0">
            <v-col cols="12" md="8">
                <v-row justify="end" class="my-0 mx-0 mt-3" style="border-bottom: 1px solid #2161B1">
                  <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
                    <div class="header-content">
                      THÔNG TIN TỔ CHỨC
                    </div>
                    <div class="triangle-header"></div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex align-center justify-end py-0 px-0">
                    <v-btn
                        class="mx-0 mr-3"
                        small
                        color="primary"
                        @click="goBack()"
                    >
                        <v-icon size="18">mdi-reply</v-icon>&nbsp;
                        <span>Quay lại</span>
                    </v-btn>
                    <v-btn
                        class="mx-0"
                        small
                        color="primary"
                        @click="editToChuc(thongTinCongDan['id'])"
                    >
                        <v-icon size="18">mdi-pencil-outline</v-icon>&nbsp;
                        <span>Cập nhật thông tin</span>
                    </v-btn>
                  </v-col>
                </v-row>
                <div>
                    <v-simple-table :dense="true" class="cong-dan-info"  style="border-bottom: thin solid rgba(0, 0, 0, 0.12);">
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="(item, index) in thongTin" :key="index" :class="{'td-highlight': index%2 === 0}">
                              <td class="py-2 px-6" style="width: 200px"><strong>{{item.lable}}</strong></td>
                              <td class="py-2">
                                <span>{{ thongTinCongDan[item.value]}}</span>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                    </v-simple-table>
                </div>
                <!-- <div class="title-page mt-3">GIẤY TỜ, TÀI LIỆU</div>
                <div class="px-0 mt-4">
                    <v-data-table
                        flat
                        :headers="headers"
                        :items="items"
                        :items-per-page="itemsPerPage"
                        hide-default-footer
                        class="elevation-1"
                        no-data-text="Không có"
                        :loading="loadingData"
                        loading-text="Đang tải... "
                    >
                        <template v-slot:item.index="{ item, index }">
                            <div>{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div>
                                <v-btn
                                    class="mx-2"
                                    small
                                    text
                                    color="primary"
                                >
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                    <pagination v-if="pageCount" :pageInput="page" :pageCount="pageCount"></pagination>
                </div> -->
            </v-col>
            <v-col cols="12" md="4" class="mt-2">
                <v-card class="py-4">
                    <div class="d-flex align-center flex-column">
                        <img class="mb-4" style="width: 226px; height: 226px;" :src="`${publicPath}/images/avt.png`">
                        <v-layout class="mt-4" wrap style="width: 350px;">
                            <v-flex xs5>Tên đăng nhập:</v-flex>
                            <v-flex xs7 class="mb-2">
                              <span class="font-weight-bold">
                                {{thongTinCongDan.email}}
                              </span>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
          max-width="700"
          v-model="dialogUpdateAcc"
          persistent
        >
          <v-card>
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title class="ml-3">Cập nhật thông tin</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  icon
                  dark
                  @click="dialogUpdateAcc = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="mt-5 px-3">
              <v-form
                ref="formCreateAcc"
                v-model="validFormAdd"
                lazy-validation
              >
                  <v-layout wrap>
                    <v-col cols="12" class="py-0 mb-2">
                        <label>Tên tổ chức <span class="red--text">(*)</span></label>
                        <v-text-field
                          class="flex input-form"
                          v-model="thongTinEdit['tenGoi']"
                          solo
                          dense
                          :rules="required"
                          required
                          hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0 mb-2">
                        <label>Tên tiếng anh</label>
                        <v-text-field
                          class="flex input-form"
                          v-model="thongTinEdit['tiengAnh']"
                          solo
                          dense
                          hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0 mb-2">
                        <label>Tên viết tắt</label>
                        <v-text-field
                          class="flex input-form"
                          v-model="thongTinEdit['tenVietTat']"
                          solo
                          dense
                          hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0 mb-2">
                        <label>Địa chỉ hoạt động</label>
                        <v-text-field
                          class="flex input-form"
                          v-model="thongTinEdit['diaChiHoatDong']"
                          solo
                          dense
                          hide-details="auto"
                          clearable
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0 mb-2">
                        <label>Website</label>
                        <v-text-field
                          class="flex input-form"
                          v-model="thongTinEdit['web']"
                          solo
                          dense
                          hide-details="auto"
                          clearable
                        ></v-text-field>
                    </v-col>
                  </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="red" small class="white--text mr-2" :loading="loadingAction" :disabled="loadingAction" @click="dialogUpdateAcc = false">
                <v-icon left>
                  mdi-close
                </v-icon>
                Thoát
              </v-btn>
              <v-btn class="mr-2" small color="primary" :loading="loadingAction" :disabled="loadingAction" @click.native="createAccount">
                <v-icon left>
                  mdi-content-save
                </v-icon>
                <span>Cập nhật</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->
        <v-dialog
          max-width="450"
          v-model="dialogChangePass"
          persistent
        >
          <v-card>
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>
                {{typeChange == 'password' ? 'Cấp lại mật khẩu' : 'Cập nhật tên đăng nhập'}}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  icon
                  dark
                  @click="dialogChangePass = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="mt-5">
              <v-form
                ref="formChangePass"
                v-model="validFormChangePass"
                lazy-validation
              >
                  <v-layout wrap>
                    <v-flex xs12 class="mb-2">
                      <div class="text-label mb-2">
                        <span v-if="typeChange == 'password'">Mật khẩu mới</span>
                        <span v-else>Tên đăng nhập mới</span>
                        <span class="red--text"> (*)</span>
                      </div>
                      <v-text-field
                        class="input-form"
                        v-model="passwordChange"
                        solo
                        dense
                        :rules="typeChange == 'password' ? requiredPassword : required"
                        required
                        hide-details="auto"
                        :readonly="typeChange != 'password'"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="red" class="white--text mr-2" :loading="loadingAction" :disabled="loadingAction" @click="dialogChangePass = false">
                <v-icon left>
                  mdi-close
                </v-icon>
                Thoát
              </v-btn>
              <v-btn v-if="typeChange == 'password'" class="mr-2" color="primary" :loading="loadingAction" :disabled="loadingAction" @click.native="submitChangePass">
                <v-icon left>
                  mdi-content-save
                </v-icon>
                <span>Xác nhận</span>
              </v-btn>
              <v-btn v-else class="mr-2" color="primary" :loading="loadingAction" :disabled="loadingAction" @click.native="submitChangeAccount">
                <v-icon left>
                  mdi-content-save
                </v-icon>
                <span>Xác nhận</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->
    </div>
</template>

<script>
import Vue from 'vue'
import Pagination from './Pagination.vue'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
export default {
    props: ["id"],
    components: {
      Pagination
    },
    data() {
        return {
            publicPath: process.env.VUE_APP_PULIC_PATH,
            selected: [],
            loadingData: false,
            loadingAction: false,
            headers: [
                {
                    sortable: false,
                    text: 'STT',
                    align: 'center',
                    value: 'index'
                },
                {
                    sortable: false,
                    text: 'Loại giấy tờ',
                    align: 'left',
                    value: 'cmnd'
                },
                {
                    sortable: false,
                    text: 'Số giấy tờ',
                    align: 'left',
                    value: 'fullname'
                },
                {
                    sortable: false,
                    text: 'Ngày cấp',
                    align: 'left',
                    value: 'contact'
                },
                {
                    sortable: false,
                    text: 'Nơi cấp',
                    align: 'left',
                    value: 'status'
                },
                {
                    sortable: false,
                    text: 'Thao tác',
                    align: 'center',
                    value: 'action'
                },
            ],
            items: [],
            page: 0,
            itemsPerPage: 10,
            total: 2,
            chuaCapTaiKhoan: false,
            daCapTaiKhoan: false,
            pageCount: 10,
            thongTin:  [
                {
                    lable: 'Tên tổ chức',
                    value: 'tenGoi'
                },
                {
                    lable: 'Tên tiếng anh',
                    value: 'tiengAnh'
                },
                {
                    lable: 'Tên viết tắt',
                    value: 'tenVietTat'
                },
                {
                    lable: 'Email',
                    value: 'email'
                },
                {
                    lable: 'Địa chỉ hoạt động',
                    value: 'diaChiHoatDong'
                },
                {
                    lable: 'Website',
                    value: 'web'
                }
            ],
            thongTinCongDan: '',
            thongTinEdit: '',
            validFormAdd: true,
            dialogUpdateAcc: false,
            passwordCreate: '',
            typeChange: '',
            dialogChangePass: false,
            validFormChangePass: true,
            passwordChange: '',
            required: [
            v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc'
            ],
            requiredPassword: [
              (value) => {
                const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                if (value) {
                  return pattern.test(value) || 'Mật khẩu ít nhất 8 ký tự, có chữ và số'
                } else {
                  return 'Mật khẩu là bắt buộc'
                }
              }
            ],
            validFormActionAccount: true,
            dialogNoteAction: false,
            titleAction: '',
            noteAction: '',
            actionStatusAcc: '',
            dialogStatusAccLog: false,
            dialogPrint: false,
            contentPrint: ''
        }
    },
    created () {
      let vm = this
      vm.$store.commit('SET_INDEXTAB', 2)
      vm.getThongTinToChuc()
    },
    watch: {
    },
    methods: {
      getStatus(status) {
        switch(status) {
          case 1:
              return 'Hoạt động'
          case 0:
              return 'Đã khóa'
          default:
              return ''
        }
      },
      editToChuc() {
        let vm = this
        vm.thongTinEdit = Object.assign({}, vm.thongTinCongDan)
        vm.dialogUpdateAcc = true
      },
      getThongTinToChuc () {
        let vm = this
        let filter = {
          collectionName: 'tochucs',
          id: vm.id
        }
        vm.$store.dispatch('collectionDetail', filter).then(function (response) {
          vm.thongTinCongDan = response
        }).catch(function () {
        })
      },
      createAccount () {
        let vm = this
        if (vm.$refs.formCreateAcc.validate()) {
          vm.loadingAction = true
          let filter = {
            collectionName: 'tochucs',
            id: vm.id,
            data: vm.thongTinEdit
          }
          vm.$store.dispatch('collectionUpdate', filter).then(function (result) {
            vm.loadingAction = false
            toastr.remove()
            toastr.success('Cập nhật thành công')
            vm.dialogUpdateAcc = false
            vm.getThongTinToChuc()
          }).catch(function (response) {
            vm.loadingAction = false
            toastr.remove()
            toastr.error('Thêm mới thất bại')
          })
        }
      },
      showChangeAcc () {
        let vm = this
        vm.typeChange = 'account'
        vm.passwordChange = vm.thongTinCongDan['maSoDoanhNghiep']
        vm.dialogChangePass = true
      },
      showChangePass () {
        let vm = this
        vm.typeChange = 'password'
        vm.passwordChange = ''
        vm.dialogChangePass = true
      },
      submitChangePass () {
        let vm = this
        if (vm.$refs.formChangePass.validate()) {
          let filter = {
            data: {
              "tenDinhDanh": vm.thongTinCongDan['danhTinhDienTu'][0]['tenDinhDanh'],
              "matKhauMoi": vm.passwordChange,
              "type": "donvikinhdoanh"
            }
          }
          vm.loadingAction = true
          vm.$store.dispatch('changePass', filter).then(function (response) {
            vm.loadingAction = false
            vm.dialogChangePass = false
            toastr.remove()
            toastr.success('Cấp lại mật khẩu thành công')
          }).catch(function () {
            vm.loadingAction = false
            toastr.remove()
            toastr.error('Cấp lại mật khẩu thất bại')
          })
        }
      },
      dateLocale (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      },
      dateLocaleTime (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} `
      },
      goBack () {
        window.history.back()
      }
    }
}
</script>

<style scoped lang="scss">
.cong-dan-info td{
    border-bottom: 0px!important;
}
.cong-dan-info table{
    border-top: none!important;
}
.td-highlight{
    background-color: #F9F4F1;
}
</style>