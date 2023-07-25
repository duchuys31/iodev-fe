<template>
  <div class="dashboard-page">
    <v-container
      class="px-0 pt-0"
      fluid
      tag="section"
    >
      <div class="wrap-dashboard" wrap>
        <div class="main-slider__desktop">
          <v-carousel hide-delimiter-background cycle :show-arrows="false">
            <v-carousel-item
              v-for="(item,i) in danhSachCuocThi_main"
              :key="i"
              :src="item.hinhAnh"
              @click="openWebSite(item.website)"
              style="cursor: pointer;"
            ></v-carousel-item>
          </v-carousel>
        </div>
        <!--  -->
        <v-layout wrap style="margin: 0 auto; max-width: 1500px;">
          <v-col cols="12">
            <div class="title-contest">--- ĐANG DIỄN RA ---</div>
          </v-col>
          <v-sheet
            class="mx-auto slide-contest-sub"
            max-width="1500"
          >
            <v-slide-group
              multiple
              show-arrows
              center-active
              cycle
            >
              <v-slide-item
                v-for="(item,i) in danhSachCuocThi_sub" :key="i"
              >
                <v-col style="width: 460px" class="py-0 mb-2">
                  <v-card
                    :loading="loading"
                    class="mx-auto my-5 col-contest-sub"
                    max-width="400"
                    @click="xemChiTietCuocThi(item)"
                    style="cursor: pointer;"
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img
                      class="image-contest"
                      height="250"
                      :src="item.hinhAnh"
                    ></v-img>
                    <span class="event_post_date">
                      <span class="post_start_date">
                        {{formatStartDate(item.ngayBatDau)}}
                      </span>
                    </span>
                    <div class="status-contest mx-4" :style="item.tinhTrang == 1 ? 'color: green' : (item.tinhTrang == 2 ? 'color: blue' : 'color: red')">
                      {{statusContest(item.tinhTrang)}}
                    </div>
                    <v-card-title class="py-0" style="word-break: break-word;min-height: 56px;">{{item.tenGoi}}</v-card-title>
                    <v-card-text style="min-height: 90px;">
                      <div v-snip="{ lines: 3 }" class="my-0 text-subtitle-1">
                        {{item.thongTinMoTa}}
                      </div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title class="des-contest py-2">
                      <v-flex>
                        <v-icon size="18" color="#2161B1">mdi-calendar-month</v-icon>&nbsp;
                        <span>{{item.ngayBatDau}} đến {{item.ngayKetThuc}}</span>
                      </v-flex>
                      <v-flex style="width:100%">
                        <v-icon size="18" color="#2161B1">mdi-bank-outline</v-icon>&nbsp;
                        <span>{{item.donViToChuc}}</span>
                      </v-flex>
                      <v-flex >
                        <v-icon size="18" color="#2161B1">mdi-web</v-icon>&nbsp;
                        <a>{{item.website}}</a>
                      </v-flex>
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-layout>
        <!--  -->
        <div style="margin: 0 auto; max-width: 1500px;padding-bottom: 30px;">
          <v-row justify="end" class="my-0 mt-2">
            <v-col cols="4">
              <div class="title-contest mt-0" style="text-align: left !important">TẤT CẢ CUỘC THI</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-autocomplete
                class="flex input-form mt-2"
                hide-no-data
                :items="itemsSerie"
                v-model="serieSearch"
                item-text="giaTri"
                item-value="maDanhMuc"
                dense
                solo
                hide-details="auto"
                placeholder="Serie cuộc thi"
                clearable
                @change="getDanhSachCuocThi('reset')"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  class="input-form mt-2"
                  v-model="keywordSearch"
                  solo
                  dense
                  placeholder="Tên cuộc thi ..."
                  hide-details="auto"
                  @keyup.enter="getDanhSachCuocThi('reset')"
                  clearable
              >
                <template v-slot:append>
                  <v-icon @click="getDanhSachCuocThi('reset')" size="18" color="#2161B1">mdi-magnify</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="my-0 mb-3">
            <!-- <v-col v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')" cols="12" class="py-0" style="text-align: right;">
              <v-btn small class="mr-3"
                color="primary"
                @click="pickFileImport('canhan')"
              >
                <v-icon size="18" >mdi-import</v-icon>&nbsp;
                Import khối cá nhân
              </v-btn>
              <v-btn small class=""
                color="primary"
                @click="pickFileImport('tapthe')"
              >
                <v-icon size="18" >mdi-import</v-icon>&nbsp;
                Import khối tập thể
              </v-btn>
            </v-col> -->
            <v-col cols="12" class="pt-0">
              <v-data-table
                :headers="headers"
                :items="danhSachTatCaCuocThi"
                :items-per-page="itemsPerPage"
                item-key="primKey"
                hide-default-footer
                class="table-base mt-2"
                no-data-text="Không có"
                :loading="loadingDataTable"
                loading-text="Đang tải... "
              >
                  <template v-slot:item.index="{ item, index }">
                    <div @click.stop="xemChiTietCuocThi(item)">{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                  </template>
                  <template v-slot:item.tenGoi="{ item }">
                    <div @click.stop="xemChiTietCuocThi(item)">{{ item.tenGoi }}</div>
                  </template>
                  <template v-slot:item.donViToChuc="{ item }">
                    <div @click.stop="xemChiTietCuocThi(item)">{{ item.donViToChuc }}</div>
                  </template>
                  <template v-slot:item.ngayBatDau="{ item }">
                    <div class="py-1" @click.stop="xemChiTietCuocThi(item)">
                      <p class="mb-1">Từ ngày: {{ item.ngayBatDau }}</p>
                      <p class="mb-1"> Đến ngày: {{ item.ngayKetThuc }}</p>
                    </div>
                  </template>
                  <template v-slot:item.tinhTrang="{ item }">
                    <div @click.stop="xemChiTietCuocThi(item)">
                      <v-chip v-if="item.tinhTrang == 1"
                        class="ma-2 white--text"
                        color="green"
                      >
                        Mở đăng ký
                      </v-chip>
                      <v-btn class="mb-2"
                        v-if="item.tinhTrang == 1 && !checkRoleAction('VAITRO_QUANTRIHETHONG')"
                        text
                        color="success"
                        @click.stop="dangKyThi(item)"
                      >
                        <v-icon size="18" >mdi-pencil</v-icon>&nbsp;
                        Đăng ký dự thi
                      </v-btn>
                      <v-chip v-if="item.tinhTrang == 2"
                        class="ma-2 white--text"
                        color="orange"
                      >
                        Đóng đăng ký
                      </v-chip>
                      <v-chip v-if="item.tinhTrang == 3"
                        class="ma-2 white--text"
                        color="red"
                      >
                        Đã kết thúc
                      </v-chip>
                    </div>
                  </template>
              </v-data-table>
              <pagination v-if="pageCount" :pageInput="page" :total="total" :pageCount="pageCount" @tiny:change-page="changePage"></pagination>
            </v-col>
          </v-row>
        </div>
        <!--  -->
      </div>
    </v-container>
    <input v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')" type="file" id="fileImportKhoiThi" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @input="importKhoiThi($event)" style="display:none">
  </div>
</template>

<script>
  import toastr from 'toastr'
  import axios from 'axios'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  export default {
    name: 'Dashboard',
    props: ['macuocthi'],
    components: {
    },
    data: () => ({
      danhSachCuocThi_main: [
        {
          website: '',
          hinhAnh: '/images/bg-def.jpeg',
          tinhTrang: 0
        }
      ],
      danhSachCuocThi_sub: [],
      danhSachTatCaCuocThi: [],
      loading: false,
      loadingDataTable: false,
      itemsSerie: [],
      serieSearch: '',
      keywordSearch: '',
      headers: [
        {
            sortable: false,
            text: 'STT',
            align: 'center',
            value: 'index',
            width: 50
        },
        {
            sortable: false,
            text: 'Cuộc thi',
            align: 'left',
            value: 'tenGoi',
            class: 'th-center py-2'
        },
        {
            sortable: false,
            text: 'Đơn vị tổ chức',
            align: 'left',
            value: 'donViToChuc',
            class: 'th-center'
        },
        {
            sortable: false,
            text: 'Thời gian diễn ra',
            align: 'left',
            value: 'ngayBatDau',
            class: 'th-center py-2',
            width: 200
        },
        {
            sortable: false,
            text: 'Tình trạng',
            align: 'center',
            value: 'tinhTrang',
            class: 'th-center',
            width: 90
        }
      ],
      page: 0,
      itemsPerPage: 20,
      total: 0,
      pageCount: 0,
      loadingImport: '',
      typeImport: ''
    }),
    created () {
      let vm = this
      // if (vm.macuocthi) {
      //   vm.goToDangKy()
      // }
      vm.getDanhSachCuocThi('reset')
      vm.getDanhSachCuocThiStatus('1,2')
      vm.getDanhMuc('C_SERIECUOCTHI')
    },
    computed: {
      breakpointName () {
        return this.$store.getters.getBreakpointName
      },
      isSigned () {
        return this.$cookies.get('Token') ? true : false
      },
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        // if (vm.macuocthi) {
        //   vm.goToDangKy()
        // }
        vm.getDanhSachCuocThi('reset')
        vm.getDanhSachCuocThiStatus('1,2')
        vm.getDanhMuc('C_SERIECUOCTHI')
      }
    },
    methods: {
      goToDangKy () {
        let vm = this
        let config = {
          method: 'get',
          url: '/api/cuocthis/thongtinchitiet/' + vm.macuocthi,
          data: {},
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
        }
        axios(config).then(function (response) {
          let serializable = response.data
          if (serializable) {
            vm.$router.push({ path: '/dang-ky-thi/' + serializable.id})
          }
        }).catch(function (error) {
        })
      },
      getDanhMuc (danhmuc) {
        let vm = this
        let filter = {
          collectionName: 'danhmucs',
          data: {
            loaiDanhMuc: danhmuc
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.itemsSerie = response
        }).catch(function () {
        })
      },
      getDanhSachCuocThi (type) {
        let vm = this
        if (type === 'reset') {
          vm.total = 0
          vm.pageCount = 0
          vm.page = 0
        }
        let filter = {
          collectionName: 'cuocthis',
          data: {
            tuKhoa: vm.keywordSearch,
            // page: vm.page,
            // size: vm.itemsPerPage
          }
        }
        if (vm.serieSearch) {
          filter.data['serieCuocThi'] = vm.serieSearch
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          let data = response
          vm.danhSachTatCaCuocThi = vm.orderCuocThi(data)
          vm.total = response.length
          vm.pageCount = response.totalPages
          // console.log('data', data)
        }).catch(function () {
        })
      },
      getDanhSachCuocThiStatus (status) {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          data: {
            tinhTrang: status
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          let data = response
          vm.danhSachCuocThi_sub = vm.orderCuocThi(data)
          // vm.danhSachCuocThi_main = vm.orderCuocThi([
          //   {
          //     website: '',
          //     hinhAnh: '/images/bg-def.jpeg',
          //     tinhTrang: 0
          //   }
          // ].concat(data).filter(function (item) {
          //   return item.hinhAnh
          // }))
        }).catch(function () {
        })
      },
      xemChiTietCuocThi (item) {
        let vm = this
        // if (item.tinhTrang == 1 && vm.isSigned) {
        //   vm.$router.push({ path: '/dang-ky/' + item.id})
        // } else {
          vm.$router.push({ path: '/cuoc-thi/' + item.id})
        // }
      },
      dangKyThi (item) {
        let vm = this
        if (vm.isSigned) {
          vm.$router.push({ path: '/dang-ky-thi/' + item.id})
        } else {
          let ref = '/dang-ky-thi/' + item.id
          vm.$router.push({ path: '/dang-nhap?redirect=' + ref})
        }
      },
      pickFileImport (type) {
        let vm = this
        vm.typeImport = type
        document.getElementById('fileImportKhoiThi').value = ''
        document.getElementById('fileImportKhoiThi').click()
      },
      importKhoiThi () {
        let vm = this
        if (vm.loadingImport) {
          return
        }
        vm.loadingImport = true
        let filesx = $('#fileImportKhoiThi')[0].files
        let file = filesx[0]

        let dataPost = new FormData()
        dataPost.append("file", file)
        dataPost.append("fileType", "xlsx")
        let url = vm.typeImport == 'canhan' ? '/api/cuocthis/khoithicanhan/import' : '/api/cuocthis/khoithitapthe/import'
        axios.post(url, dataPost, param).then(function (response) {
          vm.loadingImport = false
          toastr.success('Import danh sách thành công')
        }).catch(xhr => {
          vm.loadingImport = false
          toastr.error('Import danh sách thất bại')
        })
      },
      changePage (config) {
        let vm = this
        vm.page = config.page
        vm.getDanhSachCuocThi()
      },
      openWebSite (web) {
        if (web) {
          window.open(web, "_blank")
        }
      },
      formatStartDate (date) {
        if (!date) return ''
        const [day, month, year] = date.split('-')
        let ddd = `${day.padStart(2, '0')}/${month.padStart(2, '0')}`
        return ddd
      },
      statusContest (status) {
        if (status == 1) {
          return 'Mở đăng kí'
        } else if (status == 2) {
          return 'Đóng đăng kí'
        } else {
          return 'Đã kết thúc'
        }
      },
      orderCuocThi (data) {
        let sortItems = function (items) {
          function compare(a, b) {
            if (a.tinhTrang < b.tinhTrang)
              return -1
            if (a.tinhTrang > b.tinhTrang)
              return 1
            return 0
          }
          return items.sort(compare)
        }
        return sortItems(data)
      },
      checkRoleAction (role) {
        let vm = this
        let roleUser = vm.$cookies.get('Roles', '')
        if (!role || !roleUser) {
          return false
        }
        let roles = roleUser.split(',')
        let exits = roles.find(function (item) {
          return item == role
        })
        if (exits) {
          return true
        } else {
          return false
        }
      },
    }
  }
</script>

<style lang="sass">
  $image-login: $public-path + '/images/bg-login.png?t=39123'
  .wrap-dashboard
    width: 100%
    margin: 0 auto
    justify-content: space-around
    margin-top: 0px
  .main-slider__desktop
    border-bottom: 2px solid #dedede
  .main-slider__desktop .v-carousel__item, .main-slider__desktop .v-carousel
    height: 600px !important
  .main-slider__desktop .v-image__image
    background-size: contain !important
  .text-title-dashboard
    font-weight: 600
    font-size: 14px
  .col-contest-sub
    box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 10%) !important
  .image-contest .v-image__image
    background-repeat: no-repeat
    background-size: contain
    border-radius: 10px
    border-bottom: 1px solid #dedede
  .event_post_date
    margin-right: 20px
    margin-top: -40px
    margin-left: auto
    position: relative
    z-index: 2
    background: #344962
    width: 60px
    min-width: fit-content
    height: 60px
    padding: 0 9px
    border-radius: 5px
    display: flex
    font-size: 12px
    text-transform: uppercase
    color: #fff
    text-align: center
    line-height: 1
    font-weight: 700
    box-shadow: 6px 5px 16px 0px rgb(0 0 0 / 15%)
    flex-direction: row !important
  .text-subtitle-1
    text-align: justify
  .des-contest
    font-size: 14px !important
    color: #2161B1
  .status-contest
    font-size: 14px
  .title-contest
    text-align: center
    text-transform: uppercase
    font-size: 24px
    font-weight: 500
    color: #2161b1
    margin-top: 20px
    font-family: 'Roboto Slab'
  .post_start_date
    font-size: 12px
    display: flex
    flex-direction: column
    text-align: center
    justify-content: center
  .event_post_date span
    font-size: 18px
    margin-bottom: 2px
  .slide-contest-sub .v-slide-group__next:not(.v-slide-group__next--disabled) .v-icon, .slide-contest-sub .v-slide-group__prev:not(.v-slide-group__prev--disabled) .v-icon
    width: 36px
    height: 36px
    background: #000000
    border-radius: 50%
    font-size: 24px
    color: #fff
    opacity: 0.4
  @media screen and (max-width: 768px) 
    #dashboard-page
      background-repeat-y: repeat
      background-size: contain
      height: auto
      padding: 8px 0
    .wrap-dashboard
      padding-top: 50px
  /* ---- reset ---- */
  
</style>
