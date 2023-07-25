<template>
  <v-card
    class="mx-auto pa-3" style="padding-bottom: 36px !important"
    flat
  >
    <v-layout wrap>
      <v-flex class="py-0">
        <div>
          <v-row class="mx-0 my-0 py-0" style="">
            <v-col cols="12" class="py-2">
              <div style="text-align: center;">
                <a v-if="chiTietCuocThi.hinhAnh" :href="chiTietCuocThi.website" target="_blank" class="py-0 px-0"> 
                  <img class="img-cuocthi" :src="chiTietCuocThi.hinhAnh" style="height: 300px">
                </a>
              </div>
            </v-col>
            <!-- <v-col cols="12" md="6" class="py-4">
              <v-layout wrap>
                <v-card
                  color="#fff"
                  dark
                  height="95"
                  class="mt-5"
                  style="max-width: 320px; background: #397cbf;margin: 0 auto"
                >
                  <v-card-title class="align-start" >
                    <div class="overflow-hidden mt-n9 v-card--material__sheet v-sheet theme--light elevation-6 rounded orange"
                    style="max-width: 100%;">
                      <div class="pa-5">
                        <v-icon size="36">mdi-bank</v-icon>
                      </div>
                    </div>
                    <div class="v-card--material__title" style="width: 200px">
                      <div style="color: #fff; font-size: 18px;" class="mb-2 text-right"> Số đoàn thi tham dự</div>
                      <div class="text-right" style="font-size: 36px;font-weight: 400; color: #fff">
                        20
                      </div>
                    </div>
                  </v-card-title>
                </v-card>

                <v-card
                  color="#fff"
                  dark
                  height="95"
                  class="mt-5"
                  style="max-width: 320px; background: #397cbf;margin: 0 auto"
                >
                  <v-card-title class="align-start" >
                    <div class="overflow-hidden mt-n9 v-card--material__sheet v-sheet theme--light elevation-6 rounded orange"
                    style="max-width: 100%;">
                      <div class="pa-5" style="background: #4caf50">
                        <v-icon size="36">mdi-account-group-outline</v-icon>
                      </div>
                    </div>
                    <div class="v-card--material__title" style="width: 200px">
                      <div style="color: #fff; font-size: 18px;" class="mb-2 text-right"> Số đội tham dự</div>
                      <div class="text-right" style="font-size: 36px;font-weight: 400; color: #fff">
                        2
                      </div>
                    </div>
                  </v-card-title>
                </v-card> 

                <v-card
                  color="#fff"
                  dark
                  height="95"
                  class=""
                  style="max-width: 320px; background: #397cbf;margin: 0 auto; margin-top: 50px"
                >
                  <v-card-title class="align-start" >
                    <div class="overflow-hidden mt-n9 v-card--material__sheet v-sheet theme--light elevation-6 rounded"
                    style="max-width: 100%;">
                      <div class="pa-5" style="background: #e91e63">
                        <v-icon size="36">mdi-account-circle-outline</v-icon>
                      </div>
                    </div>
                    <div class="v-card--material__title" style="width: 200px">
                      <div style="color: #fff; font-size: 18px;" class="mb-2 text-right"> Số thí sinh tham dự</div>
                      <div class="text-right" style="font-size: 36px;font-weight: 400; color: #fff">
                        15
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-col> -->
          </v-row>

          <v-row justify="end" class="my-0 mx-0" style="border-bottom: 1px solid #2161B1">
            <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
              <div class="header-content">
                Thông tin cuộc thi
              </div>
              <div class="triangle-header"></div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex align-center justify-end py-0 px-0" style="max-width: 150px;margin-bottom: -3px;">
              <v-btn
                depressed
                class="mx-0"
                small
                color="primary"
                @click="goHome()"
                style="float: right"
                >
                <v-icon size="18">mdi-reply-all</v-icon>
                &nbsp;
                Quay lại
              </v-btn>
            </v-col>
          </v-row>
          
          <div>
            <v-row class="mx-0 my-0 py-0" style="border: 1px solid #D9D9D9; border-top: 0px;">
              <v-col cols="12" md="7" style="border-right: 1px solid #dedede;">
                <v-row>
                  <v-col cols="12" class="py-2">
                    <div class="font-weight-bold" style="color: #2161B1;font-size: 18px;">{{chiTietCuocThi.tenGoi}}</div>
                    <div class="" style="text-align: justify;">{{chiTietCuocThi.thongTinMoTa}}</div>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-0">
                    <span class="label-header">Đơn vị tổ chức: </span>
                    <span class="blue-text font-weight-bold">{{chiTietCuocThi.donViToChuc}}</span>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-0">
                    <span class="label-header">Thời gian tổ chức: </span>
                    <span class="blue-text font-weight-bold">{{convertDate(chiTietCuocThi.ngayBatDau)}}</span>
                    <span class="blue-text font-weight-bold"> - {{convertDate(chiTietCuocThi.ngayKetThuc)}}</span>
                  </v-col>
                  <!-- <v-col cols="12" md="6" class="pt-0"></v-col> -->
                  <v-col cols="12" md="6" class="pt-0">
                    <span class="label-header">Trang web: </span>
                    <a class="blue-text font-weight-bold">{{chiTietCuocThi.website}}</a>
                  </v-col>
                  <v-col v-if="chiTietCuocThi.tinhTrang == 1 && !checkRoleAction('VAITRO_QUANTRIHETHONG')" cols="12" md="6" class="pt-0">
                    <span class="label-header">Tình trạng: </span>
                    <span class="font-weight-bold" :style="chiTietCuocThi.tinhTrang == 1 ? 'color: green' : (chiTietCuocThi.tinhTrang == 2 ? 'color: blue' : 'color: red')">
                      {{statusContest(chiTietCuocThi.tinhTrang)}}
                    </span>
                    <v-btn small class="ml-5"
                      color="primary"
                      @click="dangKyThi(chiTietCuocThi)"
                    >
                      <v-icon size="18" >mdi-pencil</v-icon>&nbsp;
                      Đăng ký dự thi
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="5" class="py-4">
                <v-layout wrap>
                  <v-card
                    color="#fff"
                    dark
                    height="70"
                    class="mt-5 flex"
                    style="max-width: 250px; background: #397cbf;margin: 0 auto"
                  >
                    <v-card-title class="align-start py-1" >
                      <div class="overflow-hidden mt-n7 v-card--material__sheet v-sheet theme--light elevation-6 rounded orange"
                      style="max-width: 100%;">
                        <div class="pa-3">
                          <v-icon size="24">mdi-bank</v-icon>
                        </div>
                      </div>
                      <div class="v-card--material__title" style="width: 170px">
                        <div style="color: #fff; font-size: 18px;" class="mb-1 text-right"> Số đoàn thi tham dự</div>
                        <div class="text-right" style="font-size: 28px;font-weight: 400; color: #fff">
                          {{soDoanThiThamDu}}
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>

                  <v-card
                    color="#fff"
                    dark
                    height="70"
                    class="mt-5 flex"
                    style="max-width: 250px; background: #397cbf;margin: 0 auto"
                  >
                    <v-card-title class="align-start py-1" >
                      <div class="overflow-hidden mt-n7 v-card--material__sheet v-sheet theme--light elevation-6 rounded orange"
                      style="max-width: 100%;">
                        <div class="pa-3" style="background: #4caf50">
                          <v-icon size="24">mdi-account-group-outline</v-icon>
                        </div>
                      </div>
                      <div class="v-card--material__title" style="width: 170px">
                        <div style="color: #fff; font-size: 18px;" class="mb-1 text-right"> Số đội tham dự</div>
                        <div class="text-right" style="font-size: 28px;font-weight: 400; color: #fff">
                          {{soDoiThiThamDu}}
                        </div>
                      </div>
                    </v-card-title>
                  </v-card> 

                  <v-card
                    color="#fff"
                    dark
                    height="70"
                    class="flex"
                    style="max-width: 250px; background: #397cbf;margin: 0 auto; margin-top: 50px"
                  >
                    <v-card-title class="align-start py-1" >
                      <div class="overflow-hidden mt-n7 v-card--material__sheet v-sheet theme--light elevation-6 rounded"
                      style="max-width: 100%;">
                        <div class="pa-3" style="background: #e91e63">
                          <v-icon size="24">mdi-account-circle-outline</v-icon>
                        </div>
                      </div>
                      <div class="v-card--material__title" style="width: 170px">
                        <div style="color: #fff; font-size: 18px;" class="mb-1 text-right"> Số thí sinh tham dự</div>
                        <div class="text-right" style="font-size: 28px;font-weight: 400; color: #fff">
                          {{soThiSinhThamDu}}
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-layout>
              </v-col>
            </v-row>
          </div>
        </div>

        <div>
          <v-row justify="end" class="my-0 mx-0 mt-3" style="border-bottom: 1px solid #2161B1">
            <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
              <div class="header-content">
                Tổng hợp thí sinh đăng ký dự thi
              </div>
              <div class="triangle-header"></div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="px-0 py-0">
              <v-layout wrap>
                <v-text-field
                  class="input-form my-0 mr-3"
                  v-model="keywordSearchDoanThi"
                  solo
                  dense
                  placeholder="Tên trường, đoàn thi"
                  hide-details="auto"
                  @keyup.enter="getdanhSachDoanThi()"
                  clearable
                >
                  <template v-slot:append>
                    <v-icon @click="getdanhSachDoanThi()" size="18" color="#2161B1">mdi-magnify</v-icon>
                  </template>
                </v-text-field>
                <v-btn small v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')" color="green" @click="exportDoanThi()"
                :loading="loadingExport" :disabled="loadingExport" class="white--text">
                <v-icon size="18" class="white--text">mdi-file-excel-outline</v-icon>
                  &nbsp;
                <span class="white--text">Xuất danh sách Thi</span>
                </v-btn>
              </v-layout>
              
            </v-col>
          </v-row>
          <v-row class="my-0 py-0 pt-3">
            <v-col cols="12"  class="pt-0">
              <v-data-table
                :headers="headersTongHopDangKy"
                :items="danhSachTongHopDangKy"
                :items-per-page="itemsPerPage"
                :page.sync="pageTongHopDangKy"
                hide-default-footer
                class="table-base mt-2 table-tong-hop"
                no-data-text="Không có"
                :loading="loadingDataTongHopDangKy"
                loading-text="Đang tải... "
              >
                <template v-slot:header.noiDungThi="{ header }">
                  <v-layout>
                    <v-flex class="py-2" v-for="(itemNd, indexNd) in headerNoiDung" :key="indexNd" :style="'width:' + maxLengthHeader + 'px'" style="border-right: 1px solid #dedede">
                      <div>{{itemNd.text}}</div>
                      <div style="font-weight: normal !important;">
                        (<span v-if="danhSachKhoiThi[indexNd] && danhSachKhoiThi[indexNd]['soDoi']">Số đội: {{danhSachKhoiThi[indexNd]['soDoi']}},</span>
                        <span> Số thí sinh: {{danhSachKhoiThi[indexNd] ? danhSachKhoiThi[indexNd]['soThiSinh'] : 0}}</span>)
                        <div class="mt-2" v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon dark small color="primary" class="mr-2" v-bind="attrs" v-on="on" @click="exportKhoiThi(danhSachKhoiThi[indexNd]['id'], danhSachKhoiThi[indexNd]['maKhoi'])">
                                <v-icon dark>
                                  mdi-file-export-outline
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Xuất danh sách</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon dark small color="green" v-bind="attrs" v-on="on" @click="pickFileImport(danhSachKhoiThi[indexNd])">
                                <v-icon dark>
                                  mdi-file-import-outline
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Import danh sách</span>
                          </v-tooltip>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </template>
                <template v-slot:header.soThiSinh="{ header }">
                  <div>Số thí sinh</div>
                  <div style="font-weight: normal !important;">(Tổng số: {{soThiSinhThamDu}})</div>
                </template>
                <template v-slot:header.soHuanLuyenVien="{ header }">
                  <div>Số huấn luyện viên</div>
                  <div style="font-weight: normal !important;">(Tổng số: {{soHuanLuyenVienThamDu}})</div>
                </template>
                <template v-slot:item.index="{ item, index }">
                  <div>{{ (pageTongHopDangKy) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                </template>
                <template v-slot:item.noiDungThi="{ item, index }">
                  <v-layout>
                    <v-flex class="py-2 px-2" v-for="(itemNd2, indexNd2) in item.noiDungThi" :key="indexNd2" :style="'width:' + maxLengthHeader + 'px'" style="border-right: 1px solid #dedede">
                      <p v-if="itemNd2.thiTapThe" class="mb-1" @click.stop="showDsDoiThi(item, itemNd2)">Số đội: 
                        <!-- <span style="color: #2161B1">{{itemNd2.soDoi}}</span> -->
                        <span v-if="itemNd2.soDoi == 0" style="color: #2161B1">{{itemNd2.soDoi}}</span>
                        <a v-else href="javascript:;" style="color: #2161B1" >{{itemNd2.soDoi}}</a>
                      </p>
                      <p class="mb-1" style="cursor: pointer" @click.stop="showDsThiSinh(item, itemNd2)">Số thí sinh: 
                        <span v-if="itemNd2.soThiSinh == 0" style="color: #2161B1">{{itemNd2.soThiSinh}}</span>
                        <a v-else href="javascript:;" style="color: #2161B1" >{{itemNd2.soThiSinh}}</a>
                      </p>
                    </v-flex>
                  </v-layout>
                </template>
                <template v-slot:item.soThiSinh="{ item, index }">
                  <p class="mb-1" style="cursor: pointer" @click.stop="showDsThiSinh(item)">
                    <span v-if="item.soThiSinh == 0" style="color: #2161B1">{{item.soThiSinh}}</span>
                    <a v-else href="javascript:;" style="color: #2161B1" >{{item.soThiSinh}}</a>
                  </p>
                </template>
                <template v-slot:item.soHuanLuyenVien="{ item, index }">
                  <p class="mb-1" style="cursor: pointer" @click.stop="showDsHlv(item)">
                    <span v-if="item.soHuanLuyenVien == 0" style="color: #2161B1">{{item.soHuanLuyenVien}}</span>
                    <a v-else href="javascript:;" style="color: #2161B1" >{{item.soHuanLuyenVien}}</a>
                  </p>
                </template>
                <template v-slot:item.doanThi="{ item, index }">
                  <div class="px-2">{{item.doanThi.tenGoi}}</div>
                </template>
                <template v-slot:item.action="{ item, index }">
                  <div class="px-2">
                    <v-btn class="mb-2"
                      text
                      color="#2161B1"
                      @click.stop="capNhatDangKy(item)"
                    >
                      <v-icon size="18" >mdi-pencil</v-icon>&nbsp;
                      Cập nhật đăng ký
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
              <pagination v-if="totalTongHopDangKy" :pageInput="pageTongHopDangKy-1" :total="totalTongHopDangKy" :pageCount="pageCountTongHopDangKy" @tiny:change-page="changePage"></pagination>
            </v-col>
          </v-row>
        </div>

        <div>
          <v-row justify="end" class="my-0 mx-0 mt-3" style="border-bottom: 1px solid #2161B1">
            <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
              <div class="header-content">
                Kết quả cuộc thi
              </div>
              <div class="triangle-header"></div>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row class="my-0 py-0 pt-3 mx-0">
            <v-col cols="12" class="py-0 px-0 mb-2 col col-12 my-2" style="color: #2161b1;font-weight: bold;">
              <div class="background-triangle-small"> <v-icon size="20" color="white">mdi-view-dashboard-outline</v-icon></div>
              NỘI DUNG ĐỒNG ĐỘI
            </v-col>
            <v-col cols="12"  class="pt-0 px-0">
              <v-data-table
                :headers="headersKetQuaDongDoi"
                :items="danhSachKetQuaDongDoi"
                :page.sync="pageKetQuaDongDoi"
                :items-per-page="10000"
                item-key="primKey"
                hide-default-footer
                class="table-base mt-2 table-kq"
                no-data-text="Không có"
                :loading="loadingDataKetQuaDongDoi"
                group-by="Nội dung thi"
                loading-text="Đang tải... "
              >
                <!-- <template v-slot:item.index="{ item, index }">
                  <div>{{ (pageKetQuaDongDoi) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                </template> -->
                <template v-slot:item.thiSinh="{ item, index }">
                  <p class="mb-1" v-for="(item2, index2) in item.thiSinh" :key="index2">- {{ item2.hoTen }}</p>
                </template>
                <template v-slot:item.hangGiaiThuong="{ item, index }">
                  <div class="mb-1 font-weight-bold" v-if="item.tenGiaiThuong">{{ item.tenGiaiThuong }}</div>
                  <div >{{ item.hangGiaiThuong }}</div>
                  <div v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')">
                    <v-btn small color="primary" class="white--text mx-0 my-1 mr-2" @click="exportChungNhanLoai(item)">
                      <v-icon left>
                        mdi-certificate-outline
                      </v-icon>
                      In chứng nhận
                    </v-btn>
                    <v-btn small color="primary" class="white--text mx-0 my-1" @click="exportBangKhen(item, 'tapthe')">
                      <v-icon left>
                        mdi-certificate-outline
                      </v-icon>
                      In bằng khen
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
              <!-- <pagination v-if="pageCountKetQuaDongDoi" :pageInput="pageKetQuaDongDoi - 1" :total="totalKetQuaDongDoi" :pageCount="pageCountKetQuaDongDoi" @tiny:change-page="changePageKqDongDoi"></pagination> -->
            </v-col>
          </v-row>
          <!--  -->
          <v-row class="my-0 py-0 pt-3 mx-0">
            <v-col cols="12" class="py-0 px-0 mb-2 col col-12 my-2" style="color: #2161b1;font-weight: bold;">
              <div class="background-triangle-small"> <v-icon size="20" color="white">mdi-view-dashboard-outline</v-icon></div>
              NỘI DUNG CÁ NHÂN
            </v-col>
            <v-col cols="12"  class="pt-0 px-0">
              <v-data-table
                :headers="headersKetQuaCaNhan"
                :items="danhSachKetQuaCaNhan"
                :page.sync="pageKetQuaCaNhan"
                :items-per-page="10000"
                group-by="Nội dung thi"
                item-key="primKey"
                hide-default-footer
                class="table-base mt-2 table-kq"
                no-data-text="Không có"
                :loading="loadingDataKetQuaCaNhan"
                loading-text="Đang tải... "
              >
                <template v-slot:item.index="{ item, index }">
                  <div>{{ (pageKetQuaCaNhan) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                </template>
                <template v-slot:item.hangGiaiThuong="{ item, index }">
                  <div class="mb-1 font-weight-bold" v-if="item.tenGiaiThuong">{{ item.tenGiaiThuong }}</div>
                  <div >{{ item.hangGiaiThuong }}</div>
                  <div v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')">
                    <v-btn small color="primary" class="white--text mx-0 my-1 mr-2" @click="exportChungNhanCaNhan(item)">
                      <v-icon left>
                        mdi-certificate-outline
                      </v-icon>
                      In chứng nhận
                    </v-btn>
                    <v-btn small color="primary" class="white--text mx-0 my-1" @click="exportBangKhen(item, 'canhan')">
                      <v-icon left>
                        mdi-certificate-outline
                      </v-icon>
                      In bằng khen
                    </v-btn>
                  </div>
                </template>
                
              </v-data-table>
              <!-- <pagination v-if="pageCountKetQuaCaNhan" :pageInput="pageKetQuaCaNhan - 1" :total="totalKetQuaCaNhan" :pageCount="pageCountKetQuaCaNhan" @tiny:change-page="changePageKqCaNhan"></pagination> -->
            </v-col>
          </v-row>
        </div>
      </v-flex>
    </v-layout>
    <!--  -->
    <v-dialog
      max-width="1200"
      v-model="dialogDsThiSinh"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Danh sách thí sinh</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogDsThiSinh = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-data-table
            :headers="headersDanhSachThiSinh"
            :items="danhSachThiSinh"
            :items-per-page="itemsPerPageDanhSachThiSinh"
            :page.sync="pageDanhSachThiSinh"
            hide-default-footer
            class="table-base mt-2"
            no-data-text="Không có"
            :loading="loadingDataDanhSachThiSinh"
            loading-text="Đang tải... "
          >
            <template v-slot:item.index="{ item, index }">
              <div>{{ (pageDanhSachThiSinh) * itemsPerPageDanhSachThiSinh - itemsPerPageDanhSachThiSinh + index + 1 }}</div>
            </template>
            <template v-slot:item.gioiTinh="{ item, index }">
              <div>{{ item.gioiTinh == 0 ? 'Nam' : 'Nữ'}}</div>
            </template>
            <template v-slot:item.maQr="{ item, index }">
              <div style="text-align: center">
                <!-- <v-btn small color="primary" class="white--text mx-0" @click="exportQrCode(item)">
                  <v-icon left>
                    mdi-qrcode
                  </v-icon>
                  Mã QR thí sinh
                </v-btn> -->
                <qrcode :value="parseQr(item)" :options="{ width: 100 }" tag="img"></qrcode>
              </div>
            </template>
          </v-data-table>
          <qrcode id="qrcode" :value="urlQr" :options="{ width: 150 }" tag="img" style="display: none;"></qrcode>
          <pagination :getAll="true" :pageInput="pageDanhSachThiSinh -1" :total="totalDanhSachThiSinh" :pageCount="pageCountDanhSachThiSinh" @tiny:change-page="changePageDanhSachThiSinh"></pagination>
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-2">
          <v-btn small color="red" class="white--text mx-0" @click="dialogDsThiSinh = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <!--  -->
    <v-dialog
      max-width="1200"
      v-model="dialogDsHlv"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Danh sách huấn luyện viên</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogDsHlv = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-data-table
            :headers="headersDanhSachHlv"
            :items="danhSachHlv"
            :items-per-page="itemsPerPageDanhSachHlv"
            :page.sync="pageDanhSachHlv"
            hide-default-footer
            class="table-base mt-2"
            no-data-text="Không có"
            :loading="loadingDataDanhSachHlv"
            loading-text="Đang tải... "
          >
            <template v-slot:item.index="{ item, index }">
              <div>{{ (pageDanhSachHlv) * itemsPerPageDanhSachHlv - itemsPerPageDanhSachHlv + index + 1 }}</div>
            </template>
            <template v-slot:item.truongPhoDoan="{ item, index }">
              <div>{{ item.truongPhoDoan == 1 ? 'Trưởng đoàn' : ( item.truongPhoDoan == 2 ? 'Phó đoàn' : 'Huấn luyện viên')}}</div>
            </template>
          </v-data-table>
          <pagination :getAll="true" :pageInput="pageDanhSachHlv -1" :total="totalDanhSachHlv" :pageCount="pageCountDanhSachHlv" @tiny:change-page="changePageDanhSachHlv"></pagination>
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-2">
          <v-btn small color="red" class="white--text mx-0" @click="dialogDsHlv = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      max-width="1000"
      v-model="dialogDsDoiThi"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Danh sách đội thi tham dự</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogDsDoiThi = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-card-text class="pt-0 px-2">
            <v-data-table
              :headers="headersDanhSachDoiThi"
              :items="danhSachThiSinh"
              :items-per-page="1000"
              page.sync="1"
              hide-default-footer
              class="table-base mt-2 ds-doi-thi"
              no-data-text="Không có"
              loading-text="Đang tải... "
              group-by="Đội thi"
            >
              <template v-slot:item.index="{ item, index }">
                <div>{{ index + 1 }}</div>
              </template>
              <template v-slot:item.gioiTinh="{ item, index }">
                <div>{{ item.gioiTinh == 0 ? 'Nam' : 'Nữ'}}</div>
              </template>
            </v-data-table>
          </v-card-text>
          
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-2">
          <v-btn small color="red" class="white--text mx-0" @click="dialogDsDoiThi = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <input v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')" type="file" id="fileImportKhoiThi" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @input="importKhoiThi($event)" style="display:none">
  </v-card>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import Pagination from './Pagination.vue'
import axios from 'axios'
import toastr from 'toastr'
import docxtemplater from 'docxtemplater'
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode);

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
export default {
    name: 'CuocThi',
    components: {
      Pagination
    },
    props: ['id'],
    data() {
      return {
        urlQr: '',
        loadingExport: false,
        readonlyForm: false,
        mauNhapForm: '',
        dataInput: '',
        formData: '',
        chiTietCuocThi: '',
        itemsPerPage: 15,
        keywordSearch: '',

        headerNoiDung: [],
        maxLengthHeader: 0,
        danhSachTongHopDangKy: [],
        headersTongHopDangKy: [
          {
              sortable: false,
              text: 'STT',
              align: 'center',
              value: 'index',
              width: 50
          },
          {
              sortable: false,
              text: 'Đoàn thi',
              align: 'left',
              value: 'doanThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Nội dung thi',
              align: 'left',
              value: 'noiDungThi',
              class: 'th-center py-0 px-0',
              width: 1000
          },
          {
              sortable: false,
              text: 'Số thí sinh',
              align: 'center',
              value: 'soThiSinh',
              class: 'th-center',
              width: 100
          },
          {
              sortable: false,
              text: 'Số huấn luyện viên',
              align: 'center',
              value: 'soHuanLuyenVien',
              class: 'th-center',
              width: 100
          }
        ],
        loadingDataTongHopDangKy: false,
        pageTongHopDangKy: 1,
        totalTongHopDangKy: 0,
        pageCountTongHopDangKy: 0,

        danhSachKetQuaCaNhan: [],
        headersKetQuaCaNhan: [
          // {
          //     sortable: false,
          //     text: 'STT',
          //     align: 'center',
          //     value: 'index',
          //     width: 50
          // },
          {
              sortable: false,
              text: 'Tên thí sinh',
              align: 'left',
              value: 'tenThiSinh',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Số báo danh',
              align: 'left',
              value: 'soBaoDanh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Đoàn thi',
              align: 'left',
              value: 'tenDoanThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giải thưởng',
              align: 'center',
              value: 'hangGiaiThuong',
              class: 'th-center',
              width: 320
          }
        ],
        loadingDataKetQuaCaNhan: false,
        pageKetQuaCaNhan: 1,
        totalKetQuaCaNhan: 0,
        pageCountKetQuaCaNhan: 0,

        danhSachKetQuaDongDoi: [],
        headersKetQuaDongDoi: [
          // {
          //     sortable: false,
          //     text: 'STT',
          //     align: 'center',
          //     value: 'index',
          //     width: 50
          // },
          {
              sortable: false,
              text: 'Tên đội thi',
              align: 'left',
              value: 'tenDoiThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Thí sinh',
              align: 'left',
              value: 'thiSinh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Đoàn thi',
              align: 'left',
              value: 'tenDoanThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giải thưởng',
              align: 'center',
              value: 'hangGiaiThuong',
              class: 'th-center',
              width: 320
          }
        ],
        loadingDataKetQuaDongDoi: false,
        pageKetQuaDongDoi: 1,
        totalKetQuaDongDoi: 0,
        pageCountKetQuaDongDoi: 0,

        dialogThemThanhPhan: false,
        editThanhPhan: false,
        thanhPhanEdit: '',
        loadingAction: false,
        danhSachKhoiThiCaNhan: [],
        danhSachKhoiThiTapThe: [],
        headersDanhSachThiSinh: [
          {
              sortable: false,
              text: 'STT',
              align: 'center',
              value: 'index',
              width: 50
          },
          {
              sortable: false,
              text: 'Tên thí sinh',
              align: 'left',
              value: 'hoTen',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giới tính',
              align: 'left',
              value: 'gioiTinh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Ngày sinh',
              align: 'left',
              value: 'ngaySinh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Đối tượng thi',
              align: 'left',
              value: 'doiTuongThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Ngành đào tạo',
              align: 'left',
              value: 'nganhDaoTao',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giải thưởng',
              align: 'left',
              value: 'datGiaiThuong',
              class: 'th-center',
              width: 200
          },
          {
              sortable: false,
              text: 'Mã QR',
              align: 'left',
              value: 'maQr',
              class: 'th-center',
              width: 120
          }
        ],
        headersDanhSachDoiThi: [
          {
              sortable: false,
              text: 'STT',
              align: 'center',
              value: 'index',
              width: 50
          },
          {
              sortable: false,
              text: 'Tên thí sinh',
              align: 'left',
              value: 'hoTen',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giới tính',
              align: 'left',
              value: 'gioiTinh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Ngày sinh',
              align: 'left',
              value: 'ngaySinh',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Đối tượng thi',
              align: 'left',
              value: 'doiTuongThi',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Ngành đào tạo',
              align: 'left',
              value: 'nganhDaoTao',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Giải thưởng',
              align: 'left',
              value: 'datGiaiThuong',
              class: 'th-center',
              width: 200
          }
        ],
        dialogDsThiSinh: false,
        dialogDsDoiThi: false,
        loadingDataDanhSachThiSinh:false,
        danhSachThiSinh: [],
        danhSachDoiThi: [],
        pageDanhSachThiSinh: 1,
        pageDanhSachDoiThi: 1,
        totalDanhSachThiSinh: 0,
        pageCountDanhSachThiSinh: 0,
        itemsPerPageDanhSachThiSinh: 15,

        headersDanhSachHlv: [
          {
              sortable: false,
              text: 'STT',
              align: 'center',
              value: 'index',
              width: 50
          },
          {
              sortable: false,
              text: 'Họ tên',
              align: 'left',
              value: 'hoTen',
              class: 'th-center py-2'
          },
          // {
          //     sortable: false,
          //     text: 'Số điện thoại',
          //     align: 'left',
          //     value: 'soDienThoai',
          //     class: 'th-center py-2'
          // },
          // {
          //     sortable: false,
          //     text: 'Email',
          //     align: 'left',
          //     value: 'email',
          //     class: 'th-center py-2'
          // },
          {
              sortable: false,
              text: 'Chức danh',
              align: 'left',
              value: 'truongPhoDoan',
              class: 'th-center',
              // width: 150
          }
        ],
        dialogDsHlv: false,
        loadingDataDanhSachHlv:false,
        danhSachHlv: [],
        pageDanhSachHlv: 1,
        totalDanhSachHlv: 0,
        pageCountDanhSachHlv: 0,
        itemsPerPageDanhSachHlv: 15,
        soThiSinhThamDu: 0,
        soHuanLuyenVienThamDu: 0,
        soDoanThiThamDu: 0,
        soDoiThiThamDu: 0,
        keywordSearchDoanThi: '',
        danhSachKhoiThi: [],
        khoiThiImport: ''
      }
    },
    created () {
      let vm = this
      vm.getChiTietCuocThi()
      vm.getdanhSachDoanThi()
      vm.getDanhSachKhoiThi()
      // vm.getDanhSachThiSinh()
      if (vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
        vm.headersTongHopDangKy.push(
          {
            sortable: false,
            text: 'Thao tác',
            align: 'center',
            value: 'action',
            class: 'th-center',
            width: 100
          }
        )
      }
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
        vm.getChiTietCuocThi()
        vm.getdanhSachDoanThi()
        vm.getDanhSachKhoiThi()
        // vm.getDanhSachThiSinh()
      }
    },
    methods: {
      parseQr (thisinh) {
        return window.location.origin + '/#/thisinh/' + thisinh.id
      },
      getChiTietCuocThi () {
        let vm = this
        if (vm.loadingData) {
          return
        }
        vm.loadingData = true
        let filter = {
          collectionName: 'cuocthis',
          id: vm.id
        }
        vm.actionItems = []
        vm.loadingData = true
        vm.$store.dispatch('collectionDetail', filter).then(function (response) {
          vm.loadingData = false
          vm.chiTietCuocThi = response
        }).catch(function () {
          vm.loadingData = false
        })
      },
      getdanhSachDoanThi () {
        let vm = this
        if (vm.loadingDataTongHopDangKy) {
          return
        }
        vm.loadingDataTongHopDangKy = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'thongke',
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
          if (vm.keywordSearchDoanThi && String(vm.keywordSearchDoanThi).trim()) {
            vm.danhSachTongHopDangKy = response.filter(function (item) {
              return item.soThiSinh && String(item.doanThi.tenGoi).trim().toLowerCase().indexOf(String(vm.keywordSearchDoanThi).trim().toLowerCase()) >= 0
            })
          } else {
            vm.danhSachTongHopDangKy = response.filter(function (item) {
              return item.soThiSinh
            })
          }
          vm.totalTongHopDangKy = vm.danhSachTongHopDangKy.length
          vm.soDoanThiThamDu = vm.totalTongHopDangKy
          vm.pageCountTongHopDangKy = Math.ceil(vm.totalTongHopDangKy / vm.itemsPerPage)
          vm.pageTongHopDangKy = 1
          if (vm.danhSachTongHopDangKy.length) {
            let noiDungThi = vm.danhSachTongHopDangKy[0]['noiDungThi']
            if (noiDungThi.length) {
              vm.maxLengthHeader = 1000 / noiDungThi.length
              vm.headerNoiDung = Array.from(noiDungThi, function (item, index) {
                return {
                  sortable: false,
                  text: item.tenNoiDung,
                  align: 'left',
                  value: 'noiDung',
                  class: 'th-center py-2'
                }
              })
              // console.log('headerNoiDung', vm.headerNoiDung)
            }
          }
          vm.loadingDataTongHopDangKy = false

          let soThiSinh = 0
          let soHlv = 0
          let soDoiThi = 0
          vm.danhSachTongHopDangKy.forEach(function (item) {
            soThiSinh += item.soThiSinh
            soHlv += item.soHuanLuyenVien
            item.noiDungThi.forEach(function (el) {
              if (el.soDoi && el.soThiSinh) {
                soDoiThi += el.soDoi
              }
            })
          })
          vm.soDoiThiThamDu = soDoiThi
          vm.soThiSinhThamDu = soThiSinh
          vm.soHuanLuyenVienThamDu = soHlv
          // console.log('danhSachTongHopDangKy', vm.danhSachTongHopDangKy)
          // 
          let filter = {
            collectionName: 'cuocthis',
            collectionId: vm.id,
            collectionNameChild: 'khoithis',
            data: {}
          }
          vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
            vm.danhSachKhoiThi = response
            vm.danhSachKhoiThi.forEach(function (item) {
              let soDoi = 0
              let soThiSinh = 0
              vm.danhSachTongHopDangKy.forEach(function (itemThongKe) {
                let noiDung = itemThongKe.noiDungThi.find(function (itemNoiDung) {
                  return itemNoiDung.khoiThiId == item.id
                })
                if (noiDung) {
                  soDoi += noiDung.soDoi
                  soThiSinh += noiDung.soThiSinh
                }
              })
              item = Object.assign(item, {soDoi: soDoi, soThiSinh: soThiSinh})
            })
            // console.log('danhSachKhoiThi', vm.danhSachKhoiThi)
          })
        }).catch(function () {
          vm.loadingDataTongHopDangKy = false
        })
      },
      getDanhSachKhoiThi () {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'khoithis',
          data: {}
        }
        vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
          vm.danhSachKhoiThiCaNhan = response.filter(function (item) {
            return !item.thiTapThe
          })
          vm.danhSachKhoiThiTapThe = response.filter(function (item) {
            return item.thiTapThe
          })

          var arrCaNhan = []
          for (let index = 0; index < vm.danhSachKhoiThiCaNhan.length; index++) {
            let filter = {
              collectionName: 'cuocthis',
              collectionId: vm.id,
              collectionNameChild: 'khoithis',
              collectionChildId: vm.danhSachKhoiThiCaNhan[index]['id'],
              collectionNameChild2: 'giaicanhan',
              data: {}
            }
            arrCaNhan.push(vm.$store.dispatch('collectionFilterLevel3', filter))
          }
          Promise.all(arrCaNhan).then(values => {
            for (let index = 0; index < values.length; index++) {
              values[index] = values[index].filter(function (itemGt) {
                return itemGt.hangGiaiThuong
              })
              if (values[index].length) {
                values[index].forEach(element => {
                  element['Nội dung thi'] = vm.danhSachKhoiThiCaNhan[index] ? vm.danhSachKhoiThiCaNhan[index]['tenGoi'] : ''
                })
              }
            }
            vm.danhSachKetQuaCaNhan = [].concat(...values)
            vm.totalKetQuaCaNhan = vm.danhSachKetQuaCaNhan.length
            vm.pageKetQuaCaNhan = 1
            vm.pageCountKetQuaCaNhan = Math.ceil(vm.totalKetQuaCaNhan / vm.itemsPerPage)
            // vm.danhSachKetQuaCaNhan = vm.dataLocal.danhSachGiaiCaNhan
          })
          var arrTapThe = []
          for (let index = 0; index < vm.danhSachKhoiThiTapThe.length; index++) {
            let filter = {
              collectionName: 'cuocthis',
              collectionId: vm.id,
              collectionNameChild: 'khoithis',
              collectionChildId: vm.danhSachKhoiThiTapThe[index]['id'],
              collectionNameChild2: 'giaitapthe',
              data: {}
            }
            arrTapThe.push(vm.$store.dispatch('collectionFilterLevel3', filter))
          }
          Promise.all(arrTapThe).then(values => {
            for (let index = 0; index < values.length; index++) {
              values[index] = values[index].filter(function (itemGt) {
                return itemGt.hangGiaiThuong
              })
              if (values[index].length) {
                values[index].forEach(element => {
                  element['Nội dung thi'] = vm.danhSachKhoiThiTapThe[index]['tenGoi']
                })
              }
            }
            vm.danhSachKetQuaDongDoi = [].concat(...values)
            vm.totalKetQuaDongDoi = vm.danhSachKetQuaDongDoi.length
            vm.pageKetQuaDongDoi = 1
            vm.pageCountKetQuaDongDoi = Math.ceil(vm.totalKetQuaDongDoi / vm.itemsPerPage)
            // vm.danhSachKetQuaDongDoi = vm.dataLocal.danhSachGiaiTapThe
          })
        }).catch(function () {})
      },
      getDanhSachThiSinh () {
        let vm = this
        let filter = {
          collectionName: 'thisinhs',
          data: {
            cuocThiId: vm.id,
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.soThiSinhThamDu = response.length
        }).catch(function () {})
      },
      getDanhSachDoiThi () {
        let vm = this
        let filter = {
          collectionName: 'doithis',
          data: {
            cuocThiId: vm.id,
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.soDoiThiThamDu = response.length
        }).catch(function () {})
      },
      showDsThiSinh (item, noidung) {
        let vm = this
        vm.dialogDsThiSinh = true
        vm.loadingDataDanhSachThiSinh = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: item.doanThi.id,
          collectionNameChild2: 'thisinhs',
          data: {}
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.pageDanhSachThiSinh = 1
          if (noidung) {
            response = response.filter(function (item) {
              let exits = item.noiDungThi.find(function (item2) {
                return item2.id == noidung.khoiThiId
              })
              return exits
            })
          }
          vm.danhSachThiSinh = response
          vm.totalDanhSachThiSinh = vm.danhSachThiSinh.length
          vm.pageCountDanhSachThiSinh = Math.ceil(vm.totalDanhSachThiSinh / vm.itemsPerPageDanhSachThiSinh)
          vm.loadingDataDanhSachThiSinh = false
        }).catch(function () {
          vm.loadingDataDanhSachThiSinh = false
        })
      },
      showDsHlv (item, noidung) {
        let vm = this
        vm.dialogDsHlv = true
        vm.loadingDataDanhSachHlv = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: item.doanThi.id,
          collectionNameChild2: 'huanluyenviens',
          data: {}
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.pageDanhSachHlv = 1
          vm.danhSachHlv = response
          vm.totalDanhSachHlv = vm.danhSachHlv.length
          vm.pageCountDanhSachHlv = Math.ceil(vm.totalDanhSachHlv / vm.itemsPerPageDanhSachHlv)
          vm.loadingDataDanhSachHlv = false
        }).catch(function () {
          vm.loadingDataDanhSachHlv = false
        })
      },
      exportDoanThi() {
        let vm = this
        if (vm.loadingExport) {
          return
        }
        vm.loadingExport = true
        let dataPost = {}
        let param = {
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          params: {},
          responseType: 'blob'
        }
        axios.post('/api/cuocthis/' + vm.id + '/export', dataPost, param).then(function (response) {
          vm.loadingExport = false
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          let url = window.URL.createObjectURL(response.data)
          a.href = url
          a.download = 'DanhSachDangKyThi.xlsx'
          a.click()
          window.URL.revokeObjectURL(url)
        }).catch(xhr => {
          vm.loadingExport = false
        })
      },
      exportKhoiThi (khoiThiId, maKhoi) {
        let vm = this
        if (vm.loadingExport) {
          return
        }
        vm.loadingExport = true
        let dataPost = {}
        let param = {
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          params: {},
          responseType: 'blob'
        }
        axios.post('/api/cuocthis/' + vm.id + '/khoithis/'+ khoiThiId + '/export', dataPost, param).then(function (response) {
          vm.loadingExport = false
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          let url = window.URL.createObjectURL(response.data)
          a.href = url
          a.download = 'DanhSachThiSinh-' + maKhoi + '.xlsx'
          a.click()
          window.URL.revokeObjectURL(url)
        }).catch(xhr => {
          vm.loadingExport = false
        })
      },
      pickFileImport (khoiThi) {
        let vm = this
        vm.khoiThiImport = khoiThi
        console.log('vm.khoiThiImport', vm.khoiThiImport)
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
        let url = !vm.khoiThiImport.thiTapThe ? '/api/cuocthis/khoithicanhan/import' : '/api/cuocthis/khoithitapthe/import'
        axios.post(url, dataPost, param).then(function (response) {
          vm.loadingImport = false
          toastr.success('Import danh sách thành công')
          vm.getChiTietCuocThi()
          vm.getdanhSachDoanThi()
          vm.getDanhSachKhoiThi()
          vm.getDanhSachThiSinh()
        }).catch(xhr => {
          vm.loadingImport = false
          toastr.error('Import danh sách thất bại')
        })
      },
      exportQrCode (item) {
        let vm = this
        vm.urlQr = window.location.origin + '/#/thisinh/' + item.id
        setTimeout(function () {
          let linkSource = $('#qrcode').attr('src');;
          let downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = String(item.hoTen).replace(/ /g, "") + "-" + item.ngaySinh;
          downloadLink.click();
        }, 200)
      },
      exportBangKhen (item, type) {
        loadFile(window.location.origin + "/docs/BangKhen.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
          if (type == 'canhan') {
            doc.setData({
              Ten_giai: item.tenGiaiThuong ? item.tenGiaiThuong : '',
              Ten_khoithi: item['Nội dung thi'] ? item['Nội dung thi'] : '',
              Ten_thi_sinh: item.tenThiSinh ? item.tenThiSinh : '',
            });
          } else {
            doc.setData({
              Ten_giai: item.tenGiaiThuong ? item.tenGiaiThuong : '',
              Ten_khoithi: item['Nội dung thi'] ? item['Nội dung thi'] : '',
              Ten_thi_sinh: item.tenDoiThi ? item.tenDoiThi : '',
            });
          }
          
          try {
            doc.render();
          } catch (error) {
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function(error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
            }
            throw error;
          }
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          let tenFile = type == 'canhan' ? item.tenThiSinh : item.tenDoiThi
          saveAs(out, "BangKhen-" + String(tenFile).replace(/ /g, "") + ".docx");
        });
      },
      exportChungNhanCaNhan (thisinh) {
        loadFile(window.location.origin + "/docs/chungnhan_canhan.docx", function(
        // loadFile("http://127.0.0.1:8887/chungnhan_canhan.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

          doc.setData({
            Ten_Doan_thi: thisinh.tenDoanThi ? thisinh.tenDoanThi : '',
            Ten_TS: thisinh.tenThiSinh ? thisinh.tenThiSinh : '',
          });
          
          try {
            doc.render();
          } catch (error) {
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function(error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
            }
            throw error;
          }
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          saveAs(out, "ChungNhan-" + String(thisinh.tenThiSinh).replace(/ /g, "") + ".docx");
        });
      },
      exportChungNhanLoai (doithi) {
        let vm = this
        if (doithi['Nội dung thi'].toLowerCase().indexOf('procon') >= 0) {
          vm.exportChungNhanProcon(doithi)
        } else {
          vm.exportChungNhanTapThe(doithi)
        }
      },
      exportChungNhanTapThe (doithi) {
        loadFile(window.location.origin + "/docs/chungnhan_pmnm.docx", function(
        // loadFile("http://127.0.0.1:8887/chungnhan_pmnm.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

          doc.setData({
            Hang_giai_thuong: doithi.hangGiaiThuong ? doithi.hangGiaiThuong : '',
            Ten_doi_thi: doithi.tenDoiThi ? doithi.tenDoiThi : '',
            Ten_thi_sinh_1: doithi.thiSinh[0] ? doithi.thiSinh[0]['hoTen'] : '',
            Ten_thi_sinh_2: doithi.thiSinh[1] ? doithi.thiSinh[1]['hoTen'] : '',
            Ten_thi_sinh_3: doithi.thiSinh[2] ? doithi.thiSinh[2]['hoTen'] : ''
          });
          
          try {
            doc.render();
          } catch (error) {
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function(error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
            }
            throw error;
          }
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          saveAs(out, "ChungNhan-" + String(doithi.tenDoiThi).replace(/ /g, "") + ".docx");
        });
      },
      exportChungNhanProcon (doithi) {
        loadFile(window.location.origin + "/docs/chungnhan_procon.docx", function(
        // loadFile("http://127.0.0.1:8887/chungnhan_procon.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

          doc.setData({
            Hang_giai_thuong: doithi.hangGiaiThuong ? doithi.hangGiaiThuong : '',
            Ten_doi_thi: doithi.tenDoiThi ? doithi.tenDoiThi : '',
            Ten_thi_sinh_1: doithi.thiSinh[0] ? doithi.thiSinh[0]['hoTen'] : '',
            Ten_thi_sinh_2: doithi.thiSinh[1] ? doithi.thiSinh[1]['hoTen'] : '',
            Ten_thi_sinh_3: doithi.thiSinh[2] ? doithi.thiSinh[2]['hoTen'] : ''
          });
          
          try {
            doc.render();
          } catch (error) {
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function(error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
            }
            throw error;
          }
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          saveAs(out, "ChungNhan-" + String(doithi.tenDoiThi).replace(/ /g, "") + ".docx");
        });
      },
      changePageDanhSachThiSinh (config) {
        let vm = this
        vm.pageDanhSachThiSinh = config.page + 1
      },
      changePageDanhSachHlv () {
        let vm = this
        vm.pageDanhSachHlv = config.page + 1
      },
      showDsDoiThi (item, noidung) {
        let vm = this
        let filter = {
          collectionName: 'doithis',
          data: {
            cuocThiId: vm.id,
            khoiThiId: noidung.khoiThiId,
            doanThiId: item.doanThi.id
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.danhSachDoiThi = response
          let filter = {
            collectionName: 'danhsachthis',
            data: {
              cuocThiId: vm.id,
              khoiThiId: noidung.khoiThiId,
              doanThiId: item.doanThi.id,
              page: 1,
              size: 10000
            }
          }
          vm.$store.dispatch('collectionFilter', filter).then(function (response) {
            let danhSachThiTheoDoi = response
            let filter = {
              collectionName: 'cuocthis',
              collectionId: vm.id,
              collectionNameChild: 'doanthis',
              collectionChildId: item.doanThi.id,
              collectionNameChild2: 'thisinhs',
              data: {}
            }
            vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
              let dsThiOutPut = []
              let dsThiSinh = response
              danhSachThiTheoDoi.forEach(function (itemDsThi) {
                let thisinh = dsThiSinh.find(function (ts) {
                  return ts.id == itemDsThi.thiSinhId
                })
                if (thisinh) {
                  let doithi = vm.danhSachDoiThi.find(function (dt) {
                    return dt.id == itemDsThi.doiThiId
                  })
                  itemDsThi = Object.assign(itemDsThi, {
                    datGiaiThuong: thisinh.datGiaiThuong,
                    doiTuongThi: thisinh.doiTuongThi,
                    email: thisinh.email,
                    gioiTinh: thisinh.gioiTinh,
                    hoTen: thisinh.hoTen,
                    nganhDaoTao: thisinh.nganhDaoTao,
                    ngaySinh: thisinh.ngaySinh,
                    "Đội thi": doithi.tenGoi
                  })
                  dsThiOutPut.push(itemDsThi)
                }
              })
              vm.danhSachThiSinh = dsThiOutPut
              vm.dialogDsDoiThi = true
            })
          })
        }).catch(function () {
          
        })
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
      capNhatDangKy (item) {
        let vm = this
        vm.$router.push({ path: '/dang-ky-thi/' + vm.id + '?doanthi=' + item.doanThi.id + '&tochuc=' + item.doanThi.toChucId + '&email=' + item.doanThi.email})
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
      convertDataView (itemHeader, item) {
        let output = ''
        try {
          let calu = itemHeader['calculator'].replace(/dataInput/g, 'item')
          output = eval(calu)
        } catch (error) {
          output = ''
        }
        return output
      },
      convertDataArray (itemHeader, array) {
        let output = ''
        if (array) {
          output = Array.from(array, function (item) {
            return item[itemHeader['mapping']]
          })
        }
        output = output.toString().replace(/,/g, ', ')
        return output
      },
      currency (value) {
        if (value) {
          let moneyCur = (value / 1).toFixed(0).replace('.', ',')
          return moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }
        return ''
      },
      convertDate (date) {
        if (!date) return ''
        const [day, month, year] = date.split('-')
        let ddd = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
        return ddd
      },
      dateLocale (dateInput) {
        if (!dateInput) {
          return ''
        }
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      },
      dateLocaleTime (dateInput) {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      },
      changePage (config) {
        let vm = this
        vm.pageTongHopDangKy = config.page + 1
      },
      changePageKqCaNhan (config) {
        let vm = this
        vm.pageKetQuaCaNhan = config.page + 1
      },
      changePageKqDongDoi (config) {
        let vm = this
        vm.pageKetQuaDongDoi = config.page + 1
      },
      resetFormTimKiem () {
        let vm = this
        vm.$refs.formTimKiem.reset()
        vm.$refs.formTimKiem.resetValidation()
      },
      changeDate(index) {
        let vm = this
        vm.menuDate1 = false
        if (index === '1') {
          vm.fromReceiveDateFormatted = vm.formatDate(vm.fromReceiveDate)
        } else if (index === '2') {
          vm.toReceiveDateFormatted = vm.formatDate(vm.toReceiveDate)
        }
      },
      formatDate(date) {
        if (!date) return ''
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate(date) {
        if (!date) return ''
        if (String(date).indexOf('/') > 0) {
          const [day, month, year] = date.split('/')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        } else if (String(date).indexOf('-') > 0) {
          const [day, month, year] = date.split('-')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        } else {
          let date1 = new Date(Number(date))
          return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, '0')}-${date1.getDate().toString().padStart(2, '0')}`
        }
      },
      getMinMax (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      },
      goBack () {
        window.history.back()
      },
      goHome () {
        let vm = this
        vm.$router.push({ path: '/'})
      }
    }
  }
</script>
<style lang="scss">
  .table-tong-hop td{
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .table-kq .v-row-group__header td button:nth-child(2) {
    display: none !important;
  }
  .table-kq .v-row-group__header {
    font-weight: 600;
  }
  .nav-content {
    border-right: 1px solid #DDDDDD;
    box-sizing: border-box;
    // border-radius: 7px;
    height: 100%;
  }
  .ds-doi-thi .v-row-group__header{
    font-weight: bold;
  }
  .ds-doi-thi .v-row-group__header button {
    display: none
  }
</style>