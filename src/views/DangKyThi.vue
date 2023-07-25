<template>
  <v-card
    class="mx-auto pa-3" style="padding-bottom: 36px !important"
    flat
  >
    <v-layout wrap>
      <v-flex class="py-0">
        <div>
          <!-- <v-row class="mx-0 my-0 py-0" style="">
            <v-col cols="12" class="py-2">
              <div style="text-align: center;">
                <a v-if="chiTietCuocThi.hinhAnh" :href="chiTietCuocThi.website" target="_blank" class="py-0 px-0"> 
                  <img class="img-cuocthi" :src="chiTietCuocThi.hinhAnh" style="height: 300px">
                </a>
              </div>
            </v-col>
          </v-row> -->
          <v-row justify="end" class="my-0 mx-0" style="border-bottom: 1px solid #2161B1">
            <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
              <div class="header-content">
                Đăng ký dự thi
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
                @click="goToCuocThi()"
                style="float: right"
                >
                <v-icon size="18">mdi-reply-all</v-icon>
                &nbsp;
                Quay lại
              </v-btn>
            </v-col>
          </v-row>
          <div style="position: relative;">
            <v-row class="mx-0 my-0 py-0" style="border: 1px solid #D9D9D9; border-top: 0px">
              <v-col cols="12" md="8" class="py-4">
                <v-row>
                  <v-col cols="12" class="py-2">
                    <div class="font-weight-bold" style="color: #2161B1;font-size: 18px;">{{chiTietCuocThi.tenGoi}}</div>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="7" class="pt-0">
                    <span class="label-header">Đoàn đăng ký dự thi: </span>
                    <span class="blue-text font-weight-bold">{{thongTinDoanThi ? thongTinDoanThi.tenGoi : ''}}</span>&nbsp;
                    <span v-if="thongTinToChuc && thongTinToChuc.tenVietTat" class="blue-text font-weight-bold">({{thongTinToChuc.tenVietTat}})</span>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="5" class="pt-0">
                    <span class="label-header">Số thí sinh tham dự: </span>&nbsp;
                    <span class="blue-text font-weight-bold">{{soThiSinhThamDu}}</span>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="7" class="pt-0">
                    <span class="label-header">Email: </span>
                    <span class="blue-text font-weight-bold">{{thongTinToChuc && thongTinToChuc.email ? thongTinToChuc.email : ''}}</span>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="5" class="pt-0">
                    <span class="label-header">Số khối thi tham dự: </span>&nbsp;
                    <span class="blue-text font-weight-bold">{{soKhoiThiThamDu}}</span>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="7" class="pt-0">
                    <span class="label-header">Địa chỉ: </span>
                    <span class="blue-text font-weight-bold">{{thongTinToChuc && thongTinToChuc.diaChiHoatDong ? thongTinToChuc.diaChiHoatDong : ''}}</span>
                  </v-col>
                  <v-col v-if="userLogin.loaiTaiKhoan == 0 || toChucUpdate" cols="5" class="pt-0">
                    <span class="label-header">Số đội thi tham dự: </span>&nbsp;
                    <span class="blue-text font-weight-bold">{{soDoiThiThamDu}}</span>
                  </v-col>
                  <!-- <v-col class="pt-0" v-if="userLogin.loaiTaiKhoan == 1">
                    <v-btn color="primary" @click="exportDoanThi()" :loading="loadingExport" :disabled="loadingExport">Export Danh Sách Thi</v-btn>
                  </v-col> -->
                </v-row>
              </v-col>
              <v-col cols="12" md="4" class="py-4">
              </v-col>
            </v-row>
            <div v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')" style="position: absolute;right: 10px;bottom: 10px">
              <v-btn small color="orange" class="btn-form mx-0 mr-2 text-white" @click="showThiSinhXoa">
                <v-icon style="color: #fff !important" size="18">mdi-delete</v-icon>&nbsp;
                <span style="color: #fff !important">Xóa thí sinh không tham dự thi</span>
              </v-btn>

              <v-btn small color="orange" class="btn-form mx-0 text-white" @click="showDoiThiXoa">
                <v-icon style="color: #fff !important" size="18">mdi-delete</v-icon>&nbsp;
                <span style="color: #fff !important">Xóa đội thi không có thí sinh</span>
              </v-btn>
            </div>
          </div>
        </div>

        <div>
          <!--  -->
          <v-row class="my-0 py-0 pt-3 mx-0">
             <v-flex>
              <v-row justify="end" class="my-0 mx-0 mt-3" style="border-bottom: 1px solid #2161B1">
                <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
                  <div class="header-content">
                    Danh sách huấn luyện viên
                  </div>
                  <div class="triangle-header"></div>
                </v-col>
                <v-spacer></v-spacer>
            
                <v-col v-if="((thongTinToChuc && userLogin.loaiTaiKhoan == 0 && chiTietCuocThi.tinhTrang == 1) || checkRoleAction('VAITRO_QUANTRIHETHONG'))" class="d-flex align-center justify-end py-0 px-0" style="max-width: 150px;">
                  <v-btn small color="primary" class="btn-form mx-0 text-white" @click="showCreateHlv">
                    <v-icon size="18">mdi-plus</v-icon>&nbsp;
                    Thêm huấn luyện viên
                  </v-btn>
                </v-col>
              </v-row>
            </v-flex>
            <v-col cols="12"  class="pt-0 px-0">
              <v-data-table
                :headers="headersDanhSachHlv"
                :items="danhSachHlv"
                :items-per-page="itemsPerPage"
                item-key="id"
                hide-default-footer
                class="table-base mt-2"
                no-data-text="Không có"
                :loading="loadingDataDanhSachHlv"
                loading-text="Đang tải... "
              >
                <template v-slot:item.index="{ item, index }">
                  <div>{{ (pageDanhSachHlv+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
                </template>
                <template v-slot:item.truongPhoDoan="{ item, index }">
                  <div>{{ item.truongPhoDoan == 1 ? 'Trưởng đoàn' : ( item.truongPhoDoan == 2 ? 'Phó đoàn' : 'Huấn luyện viên')}}</div>
                </template>
                <template v-slot:item.noiDungThi="{ item, index }">
                  <p class="mb-1" v-for="(item2, index2) in item.noiDungThi" :key="index2">{{index2 + 1}}. {{ item2.noiDungThi }}</p>
                </template>
                <template v-slot:item.action="{ item }" >
                  <div v-if="chiTietCuocThi.tinhTrang == 1 || checkRoleAction('VAITRO_QUANTRIHETHONG')">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small @click.stop="showEditHlv(item)" color="#2161B1" text icon class=" mr-3" v-bind="attrs" v-on="on">
                          <v-icon size="22">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Sửa</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small @click.stop="deleteHlv(item)" color="red" text icon class="" v-bind="attrs" v-on="on">
                          <v-icon size="22">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Xóa</span>
                    </v-tooltip>
                    <v-tooltip top v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')">
                      <template v-slot:activator="{on, attrs}">
                        <v-btn small @click.stop="inTheHuanLuyenVien(item)" text icon class="" v-bind="attrs" v-on="on">
                          <v-icon>mdi-printer</v-icon>
                        </v-btn>
                      </template>
                      <span>In thẻ huấn luyện viên</span>
                    </v-tooltip>
                  </div>
                </template>
              </v-data-table>
              <pagination v-if="pageCountDanhSachHlv" :pageInput="pageDanhSachHlv" :total="totalDanhSachHlv" :pageCount="pageCountDanhSachHlv" @tiny:change-page="changePage"></pagination>
            </v-col>
          </v-row>

          <!--  -->
          <v-row justify="end" class="my-0 mx-0 mt-3" style="border-bottom: 1px solid #2161B1">
            <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
              <div class="header-content">
                Danh sách thí sinh đăng ký dự thi
              </div>
              <div class="triangle-header"></div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="isSigned" class="d-flex align-center py-0 px-0" style="max-width: 390px;height: 30px;">
              <v-btn :loading="loadingExport" :disabled="loadingExport"
                depressed
                class="mx-0 mr-3"
                small
                color="green"
                @click="exportExcel"
                style="float: right"
                >
                <v-icon size="18" class="white--text">mdi-file-excel-outline</v-icon>
                &nbsp;
                <span class="white--text">Xuất danh sách thí sinh</span>
              </v-btn>

              <v-btn :loading="loadingExport" :disabled="loadingExport"
                depressed
                class="mx-0"
                small
                color="green"
                @click="exportQrCode"
                style="float: right"
                >
                <v-icon size="18" class="white--text">mdi-qrcode</v-icon>
                &nbsp;
                <span class="white--text">Xuất mã QR thí sinh</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="my-0 py-0 pt-3 mx-0">
            <!-- <v-flex>
              <v-row justify="end" class="my-0 mx-0 mt-3">
                <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #2161B1;font-weight: 500;">
                  <div class="background-triangle-small"> <v-icon size="20" color="white">mdi-view-dashboard-outline</v-icon></div>
                  DANH SÁCH THÍ SINH ĐĂNG KÝ DỰ THI
                </v-col>
                <v-spacer></v-spacer>
            
                <v-col v-if="thongTinToChuc && userLogin.loaiTaiKhoan == 0 && chiTietCuocThi.tinhTrang == 1" class="d-flex align-center justify-end py-0 px-0" style="max-width: 150px;">
                  <v-btn small color="primary" class="btn-form mx-0 text-white" @click="showCreateThiSinh">
                    <v-icon size="18">mdi-plus</v-icon>&nbsp;
                    Thêm thí sinh
                  </v-btn>
                </v-col>
              </v-row>
            </v-flex> -->
            <v-col cols="12"  class="py-0 px-0">
              <v-data-table
                :headers="headersDanhSachThiSinh"
                :items="[]"
                :items-per-page="itemsPerPage"
                item-key="id"
                hide-default-footer
                class="table-thisinh table-base mt-2"
                no-data-text="Không có"
                :loading="loadingDataDanhSachThiSinh"
                loading-text="Đang tải... "
              >
              </v-data-table>
            </v-col>
          </v-row>
          <v-row class="wrap-noidung-thi my-0 py-0 mx-0 pb-5">
            <v-expansion-panels flat v-model="panelModel" multiple>
              <v-expansion-panel
                v-for="(item2,i) in danhSachKhoiThi"
                :key="i"
                readonly
              >
                <div v-if="((thongTinToChuc && userLogin.loaiTaiKhoan == 0 && chiTietCuocThi.tinhTrang == 1) || checkRoleAction('VAITRO_QUANTRIHETHONG')) && (item2.thiTapThe || !item2.countThiSinh || !item2.maxDangKi || (item2.countThiSinh && item2.countThiSinh < item2.maxDangKi ))"
                 class="ml-5 layout wrap" style="position: absolute; right: 0; top: 10px; width: 150px; z-index: 1000">
                  <!-- <v-autocomplete
                    style="width: 280px; max-width: 400px"
                    class="flex input-form mr-0"
                    hide-no-data
                    :items="item2.danhSachThiSinhSuggest"
                    v-model="item2.thiSinhSuggest"
                    item-text="hoTen"
                    item-value="id"
                    dense
                    solo
                    placeholder="Chọn thí sinh"
                    return-object
                    clearable
                  >
                    <template v-slot:item="data">
                      <span>{{data.item.hoTen}}</span>
                      <span>&nbsp;</span>
                      <span v-if="data.item.email">({{data.item.email}})</span>
                    </template>

                  </v-autocomplete>
                  <v-btn small class="mr-3" color="primary"  @click.stop="item2.thiTapThe ? showChonDoiThi(item2, item2.thiSinhSuggest) : addThiSinhSuggest(item2, i)"
                    style="height: 32px;margin-left: -15px;z-index: 10011;border-top-left-radius: 0;border-bottom-left-radius: 0;"
                  >
                    <v-icon size="18">
                      mdi-pencil-plus-outline
                    </v-icon>&nbsp;
                    Đăng ký
                  </v-btn> -->
                  <v-btn small color="primary" class="btn-form mx-0 text-white ml-2" @click.stop="showCreateThiSinh(item2, item2.danhSachThiSinhSuggest)" style="height: 32px;max-width: 150px">
                    <v-icon size="18">mdi-plus</v-icon>&nbsp;
                    Thêm thí sinh
                  </v-btn>
                </div>
                <v-expansion-panel-header>
                  <div class="text-header" style="width: calc(100% - 150px); text-align: justify">
                    {{ item2.tenGoi }} - {{ item2.noiDungThi }}
                    <span v-if="item2.maxDangKi">&nbsp; (Tối đa {{item2.maxDangKi}} thí sinh)</span>
                    <span v-if="item2.maxThiSinh">&nbsp; (Tối đa {{item2.maxThiSinh}} thí sinh / đội thi)</span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    v-if="item2.thiSinhs.length"
                    :headers="headersDanhSachThiSinh"
                    :items="item2.thiSinhs"
                    :items-per-page="itemsPerPage"
                    item-key="id"
                    hide-default-footer
                    hide-default-header
                    class="table-group-thisinh table-base"
                    no-data-text="Không có"
                    :loading="loadingDataDanhSachThiSinh"
                    loading-text="Đang tải... "
                    :group-by="item2.thiTapThe ? 'Đội thi' : null"
                  >
                    <template v-slot:item.index="{ item, index }">
                      <div>{{ index + 1 }}</div>
                    </template>
                    <template v-slot:item.gioiTinh="{ item }">
                      <div>{{ item.gioiTinh == 0 ? 'Nam' : 'Nữ'}}</div>
                    </template>
                    <template v-slot:item.hoTen="{ item }">
                      <div>{{ item.hoTen}}</div>
                    </template>
                    <template v-slot:item.ngaySinh="{ item }">
                      <div>{{ item.ngaySinh}}</div>
                    </template>
                    <template v-slot:item.doiTuongThi="{ item }">
                      <div>{{ item.doiTuongThi}}</div>
                    </template>
                    <template v-slot:item.nganhDaoTao="{ item }">
                      <div>{{ item.nganhDaoTao}}</div>
                    </template>
                    <template v-slot:item.soDienThoai="{ item }">
                      <div>{{ item.soDienThoai}}</div>
                    </template>
                    <template v-slot:item.email="{ item }">
                      <div>{{ item.email}}</div>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <div v-if="isSigned">
                        <v-tooltip top v-if="chiTietCuocThi.tinhTrang == 1 || checkRoleAction('VAITRO_QUANTRIHETHONG')">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn small @click.stop="showEditThiSinh(item)" color="#2161b1" text icon class="mr-3" v-bind="attrs" v-on="on">
                              <v-icon size="22">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>Sửa thông tin thí sinh</span>
                        </v-tooltip>

                        <v-tooltip top v-if="chiTietCuocThi.tinhTrang == 1 || checkRoleAction('VAITRO_QUANTRIHETHONG')">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn small @click.stop="deleteThiSinh(item)" color="red" text icon class="" v-bind="attrs" v-on="on">
                              <v-icon size="22">mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>Xóa đăng ký</span>
                        </v-tooltip>

                        <v-tooltip top v-if="checkRoleAction('VAITRO_QUANTRIHETHONG')">
                          <template v-slot:activator="{on, attrs}">
                          <v-btn small @click.stop="inTheThiSinh(item)" text icon class="" v-bind="attrs" v-on="on">
                            <v-icon size="22">mdi-printer</v-icon>
                          </v-btn>
                        </template>
                        <span>In thẻ thí sinh</span>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-data-table>
                  <div v-else class="ml-5 py-2">KHÔNG CÓ THÍ SINH</div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </div>
      </v-flex>
    </v-layout>
    
    <v-dialog
      max-width="1200"
      v-model="dialogAddThiSinh"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title v-if="typeAction === 'create'">Đăng ký thí sinh</v-toolbar-title>
          <v-toolbar-title v-else>Cập nhật thông tin thí sinh</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogAddThiSinh = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddThiSinh"
            v-model="validFormAddThiSinh"
            lazy-validation
          >
            <v-layout wrap>
              <!-- <v-col cols="12" class="py-0 mb-2">
                <label>Chọn thí sinh </label>
                <v-combobox
                  class="flex input-form mr-0"
                  hide-no-data
                  :items="danhSachThiSinhSuggest"
                  v-model="thiSinhSuggested"
                  item-text="hoTen"
                  item-value="id"
                  dense
                  solo
                  placeholder="Chọn thí sinh"
                  clearable
                  return-object
                  @change="changeSuggest"
                >
                  <template v-slot:item="data">
                    <span>{{data.item.hoTen}}</span>
                    <span>&nbsp;</span>
                    <span v-if="data.item.email">({{data.item.email}})</span>
                  </template>

                </v-combobox>
              </v-col> -->
              <v-col cols="12" md="6" class="py-0 mb-2">
                  <label>Họ và tên <span class="red--text">(*)</span></label>
                  <v-text-field
                    class="flex input-form"
                    v-if="typeAction == 'update'"
                    v-model="thongTinThiSinh['hoTen']"
                    solo
                    dense
                    :rules="required"
                    required
                    hide-details="auto"
                    clearable
                  ></v-text-field>

                  <v-combobox
                    v-if="typeAction == 'create'"
                    class="flex input-form mr-0 select-thisinh"
                    hide-no-data
                    :items="danhSachThiSinhSuggest"
                    v-model="thiSinhSuggested"
                    item-text="hoTen"
                    item-value="id"
                    dense
                    solo
                    clearable
                    return-object
                    @change="changeSuggest"
                  >
                    <template v-slot:item="data">
                      <span>{{data.item.hoTen}}</span>
                      <span>&nbsp;</span>
                      <span v-if="data.item.ngaySinh">,&nbsp;{{data.item.ngaySinh}}</span>
                      <span>&nbsp;</span>
                      <span v-if="data.item.email">,&nbsp;{{data.item.email}}</span>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Ngày sinh  <span class="red--text">(*)</span></label>
                <v-text-field
                  class="input-form"
                  v-model="ngaySinhCreate"
                  placeholder="dd/mm/yyyy, ddmmyyyy"
                  @blur="formatBirthDate"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                  :rules="required"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <label>Giới tính <span class="red--text">(*)</span></label>
                <v-autocomplete
                  class="flex input-form"
                  hide-no-data
                  :items="itemsGioiTinh"
                  v-model="thongTinThiSinh['gioiTinh']"
                  item-text="tenMuc"
                  item-value="maMuc"
                  dense
                  solo
                  hide-details="auto"
                  placeholder="Chọn giới tính"
                  :rules="required"
                  required
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Email</label>
                <v-text-field
                  class="input-form"
                  v-model="thongTinThiSinh['email']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <label>Điện thoại</label>
                <v-text-field
                  class="input-form"
                  v-model="thongTinThiSinh['soDienThoai']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Đối tượng</label>
                <v-text-field
                v-if="typeAction == 'update'"
                  class="input-form"
                  v-model="thongTinThiSinh['doiTuongThi']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                  placeholder="Sinh viên năm mấy..."
                ></v-text-field>
                <v-combobox
                  v-if="typeAction == 'create'"
                  class="flex input-form mr-0 select-thisinh"
                  hide-no-data
                  :items="danhSachDoiTuongSuggest"
                  v-model="doiTuongSuggested"
                  item-text="giaTri"
                  item-value="maDanhMuc"
                  dense
                  solo
                  clearable
                  return-object
                  @change="changeSuggestDoiTuong"
                >
                </v-combobox>
              </v-col>
              <v-col cols="12" class="py-0">
                <label>Ngành đào tạo</label>
                <v-text-field
                  v-if="typeAction == 'update'"
                  class="input-form"
                  v-model="thongTinThiSinh['nganhDaoTao']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                ></v-text-field>
                <v-combobox
                  v-if="typeAction == 'create'"
                  class="flex input-form mr-0 select-thisinh"
                  hide-no-data
                  :items="danhSachNganhDaoTaoSuggest"
                  v-model="nganhDaoTaoSuggested"
                  item-text="giaTri"
                  item-value="maDanhMuc"
                  dense
                  solo
                  clearable
                  return-object
                  @change="changeSuggestNganhDaoTao"
                >
                </v-combobox>
              </v-col>
              <v-col cols="12" class="py-0">
                <label>Giải thưởng đã đạt được</label>
                <v-textarea
                  v-if="typeAction == 'update'"
                  class="input-form"
                  v-model="thongTinThiSinh['datGiaiThuong']"
                  solo
                  dense
                  clearable
                  max
                  rows="2"
                  hide-details="auto"
                ></v-textarea>
                <v-layout wrap v-if="typeAction == 'create'">
                  <v-combobox
                    class="flex input-form mr-0 select-thisinh"
                    hide-no-data
                    :items="danhSachCuocThiSuggest"
                    v-model="cuocThiSuggested"
                    item-text="giaTri"
                    item-value="maDanhMuc"
                    dense
                    solo
                    clearable
                    return-object
                    placeholder="Cuộc thi"
                  >
                  </v-combobox>
                  <v-combobox
                    class="flex input-form mr-0 select-thisinh px-2"
                    hide-no-data
                    :items="danhSachNamThiSuggest"
                    v-model="namThiSuggested"
                    item-text="giaTri"
                    item-value="maDanhMuc"
                    dense
                    solo
                    clearable
                    return-object
                    placeholder="Năm thi"
                  >
                  </v-combobox>
                  <v-combobox
                    class="flex input-form mr-0 select-thisinh"
                    hide-no-data
                    :items="danhSachGiaiThuongSuggest"
                    v-model="giaiThuongSuggested"
                    item-text="giaTri"
                    item-value="maDanhMuc"
                    dense
                    solo
                    clearable
                    return-object
                    placeholder="Giải thưởng"
                  >
                  </v-combobox>
                </v-layout>
              </v-col>

              <v-col cols="12" class="py-0 mb-2" v-if="typeAction == 'create' && khoiThiSelected.thiTapThe">
                <label>Chọn đội thi <span class="red--text">(*)</span></label>
                <v-layout wrap>
                  <v-autocomplete
                    class="flex input-form"
                    placeholder="Yêu cầu chọn đội thi"
                    hide-no-data
                    :items="filterDoiThiTheoKhoi(danhSachDoiThi, khoiThiSelected)"
                    v-model="doiThiSelected"
                    item-text="tenGoi"
                    item-value="doiThiId"
                    dense
                    solo
                    hide-details
                    :rules="required"
                    required
                  >
                  </v-autocomplete>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn small class="mr-0 ml-3" color="primary" @click="createDoiThi(khoiThiSelected)" v-bind="attrs" v-on="on">
                        <v-icon>
                          mdi-plus
                        </v-icon>
                        <span>Tạo đội thi</span>
                      </v-btn>
                    </template>
                    <span>Tạo đội thi</span>
                  </v-tooltip>
                </v-layout>
              </v-col>

              <!-- <v-col cols="12" class="py-0 mb-2">
                <label>Nội dung dự thi</label>
                <v-layout>
                  <v-autocomplete
                    class="flex input-form"
                    hide-no-data
                    :items="danhSachKhoiThi"
                    v-model="noiDungDuThiThiSinh"
                    item-text="noiDungThi"
                    item-value="id"
                    dense
                    solo
                    hide-details="auto"
                    return-object
                  >
                    <template v-slot:selection="data">
                      <span>{{data.item.tenGoi}}</span>
                      <span>&nbsp;-&nbsp;</span>
                      <span>{{data.item.noiDungThi}}</span>
                    </template>
                    <template v-slot:item="data">
                      <span>{{data.item.tenGoi}}</span>
                      <span>&nbsp;-&nbsp;</span>
                      <span>{{data.item.noiDungThi}}</span>
                      <span v-if="data.item.maxDangKi">&nbsp; (Tối đa {{data.item.maxDangKi}} thí sinh)</span>
                      <span v-if="data.item.maxThiSinh">&nbsp; (Tối đa {{data.item.maxThiSinh}} thí sinh / đội thi)</span>
                    </template>
                  </v-autocomplete>
                  <v-btn small class="mr-0 ml-3" color="primary" :loading="loading" :disabled="loading" @click="addNoiDungThi">
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    <span>Thêm nội dung thi</span>
                  </v-btn>
                </v-layout>
              </v-col>
              <v-col cols="12" class="py-0 mb-2" v-if="danhSachNoiDungThiThiSinh && danhSachNoiDungThiThiSinh.length">
                <v-data-table
                  :headers="headersNoiDung"
                  :items="danhSachNoiDungThiThiSinh"
                  item-key="khoiThiId"
                  hide-default-footer
                  class="table-base mt-2"
                  no-data-text="Không có"
                >
                  <template v-slot:item.tenNoiDung="{ item, index }">
                    <div>{{ item.tenKhoiThi }} - {{ item.tenNoiDung }}</div>
                  </template>
                  <template v-slot:item.thiTapThe="{ item, index }">
                    <div>{{ item.thiTapThe ? 'Đồng đội' : 'Cá nhân' }}</div>
                  </template>
                  <template v-slot:item.tenDoiThi="{ item, index }">
                    <v-layout v-if="item.thiTapThe">
                      <v-autocomplete
                        class="flex input-form"
                        placeholder="Yêu cầu chọn đội thi"
                        hide-no-data
                        :items="filterDoiThiTheoKhoi(danhSachDoiThi, item)"
                        v-model="item.doiThiId"
                        item-text="tenGoi"
                        item-value="doiThiId"
                        dense
                        solo
                        hide-details
                        :rules="required"
                        required
                      >
                      </v-autocomplete>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon small class="mr-0 ml-3" color="primary" @click="createDoiThi(item, index)" v-bind="attrs" v-on="on">
                            <v-icon>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Thêm đội thi</span>
                      </v-tooltip>
                    </v-layout>
                  </template>
                  <template v-slot:item.action="{ item, index }">
                    <div>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn small @click.stop="deleteNoiDungThiThiSinh(item, index)" color="red" text icon class="" v-bind="attrs" v-on="on">
                            <v-icon size="22">mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Xóa</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-data-table>
              </v-col> -->
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2" :loading="loading" :disabled="loading" @click="dialogAddThiSinh = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Hủy
          </v-btn>
          <v-btn small v-if="typeAction === 'create'" class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="submitCreateThiSinh">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Đăng ký</span>
          </v-btn>
          <v-btn small v-else class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="submitUpdateThiSinh">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Cập nhật</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Thêm Hlv -->
    <v-dialog
      max-width="900"
      v-model="dialogAddHlv"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title v-if="typeAction === 'create'">Đăng ký huấn luyện viên</v-toolbar-title>
          <v-toolbar-title v-else>Cập nhật thông tin huấn luyện viên</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogAddHlv = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddHlv"
            v-model="validFormAddHlv"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" md="6" class="py-0 mb-2">
                  <label>Họ và tên <span class="red--text">(*)</span></label>
                  <v-text-field
                    class="flex input-form"
                    v-if="typeAction == 'update'"
                    v-model="thongTinHlv['hoTen']"
                    solo
                    dense
                    :rules="required"
                    required
                    hide-details="auto"
                    clearable
                  ></v-text-field>

                  <v-combobox
                    v-if="typeAction == 'create'"
                    class="flex input-form mr-0 select-thisinh"
                    hide-no-data
                    :items="danhSachHlvSuggest"
                    v-model="hlvSuggested"
                    item-text="hoTen"
                    item-value="id"
                    dense
                    solo
                    clearable
                    return-object
                    @change="changeSuggestHlv"
                  >
                    <template v-slot:item="data">
                      <span>{{data.item.hoTen}}</span>
                      <span>&nbsp;</span>
                      <span v-if="data.item.email">,&nbsp;{{data.item.email}}</span>
                    </template>

                  </v-combobox>
              </v-col>
              <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Email <span class="red--text">(*)</span></label>
                <v-text-field
                  class="input-form"
                  v-model="thongTinHlv['email']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                  :rules="required"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0 mb-2">
                <label>Số điện thoại <span class="red--text">(*)</span></label>
                <v-text-field
                  class="input-form"
                  v-model="thongTinHlv['soDienThoai']"
                  solo
                  dense
                  clearable
                  max
                  hide-details="auto"
                  :rules="required"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <label>Chức vụ <span class="red--text">(*)</span></label>
                <v-autocomplete
                  class="flex input-form"
                  hide-no-data
                  :items="itemsChucVu"
                  v-model="thongTinHlv['truongPhoDoan']"
                  item-text="tenMuc"
                  item-value="maMuc"
                  dense
                  solo
                  hide-details="auto"
                  placeholder="Chọn chức vụ"
                  :rules="required"
                  required
                >
                </v-autocomplete>
              </v-col>
              <!-- <v-col cols="12" class="py-0">
                <label>Nội dung thi phụ trách <span class="red--text">(*)</span></label>
                <v-autocomplete
                  class="flex input-form"
                  hide-no-data
                  :items="danhSachKhoiThi"
                  v-model="noiDungDuThiHlv"
                  item-text="noiDungThi"
                  item-value="id"
                  dense
                  solo
                  hide-details="auto"
                  return-object
                  multiple
                >
                  <template v-slot:item="data">
                    <span>{{data.item.tenGoi}}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{{data.item.noiDungThi}}</span>
                  </template>
                </v-autocomplete>
              </v-col> -->
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2" :loading="loading" :disabled="loading" @click="dialogAddHlv = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Hủy
          </v-btn>
          <v-btn small v-if="typeAction === 'create'" class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="submitCreateHlv">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Đăng ký</span>
          </v-btn>
          <v-btn small v-else class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="submitUpdateHlv">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Cập nhật</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Thêm đội thi -->
    <v-dialog
      max-width="700"
      v-model="dialogAddDoiThi"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Tạo đội thi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogAddDoiThi = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddDoiThi"
            v-model="validFormAddDoiThi"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Tên đội thi <span class="red--text">(*)</span></label>
                  <v-text-field
                    class="input-form"
                    v-model="tenDoiThiTaoMoi"
                    solo
                    dense
                    clearable
                    max
                    hide-details="auto"
                    placeholder="Nhập tên đội thi"
                    :rules="required"
                    required
                  ></v-text-field>
              </v-col>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2"  @click="dialogAddDoiThi = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn small class="mr-2" color="primary" :loading="loading" :disabled="loading" @click="submitCreateDoiThi">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Tạo mới</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      max-width="700"
      v-model="dialogTaoDoanThi"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3" style=""
        >
          <v-toolbar-title>THÔNG TIN ĐOÀN THI</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formTaoDoanThi"
            v-model="validFormTaoDoanThi"
            lazy-validation
          >
            <v-layout wrap>
              <v-col cols="12" class="py-0 mb-2">
                  <label>Tên đoàn thi <span class="red--text">(*)</span> </label>
                  <v-text-field
                    class="flex input-form mt-2"
                    v-model="tenDoanThi"
                    solo
                    dense
                    :rules="[v => !!v || 'Tên đoàn thi là bắt buộc']"
                    required
                    hide-details="auto"
                    clearable
                  ></v-text-field>
              </v-col>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn
            depressed
            class="mr-2 white--text"
            small
            color="red"
            @click="goBack()"
            :loading="loading" :disabled="loading"
            style="float: right"
            >
            <v-icon size="18">mdi-reply-all</v-icon>
            &nbsp;
            Quay lại
          </v-btn>
          <v-btn small class="mr-2" color="primary" :loading="loading" :disabled="loading" @click="taoDoanThi">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Đồng ý</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      max-width="700"
      v-model="dialogChonDoiThi"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Chọn đội thi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogChonDoiThi = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-form
            ref="formAddThiSinhDoiThi"
            v-model="validFormAddThiSinhDoiThi"
            lazy-validation
          >
            <v-layout wrap>
              <!-- <v-col cols="12" class="py-0 mb-2"> -->
                <v-autocomplete
                  class="flex input-form"
                  placeholder="Yêu cầu chọn đội thi"
                  hide-no-data
                  :items="filterDoiThiTheoKhoi(danhSachDoiThi, khoiThiSelected)"
                  v-model="doiThiSelected"
                  item-text="tenGoi"
                  item-value="doiThiId"
                  dense
                  solo
                  hide-details
                  :rules="required"
                  required
                >
                </v-autocomplete>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn small class="mr-0 ml-3" color="primary" @click="createDoiThi(khoiThiSelected)" v-bind="attrs" v-on="on">
                      <v-icon>
                        mdi-plus
                      </v-icon>
                      <span>Tạo đội thi</span>
                    </v-btn>
                  </template>
                  <span>Tạo đội thi</span>
                </v-tooltip>
              <!-- </v-col> -->
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3">
          <v-btn small color="red" class="white--text mr-2" :loading="loading" :disabled="loading" @click="dialogChonDoiThi = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Hủy
          </v-btn>
          <v-btn small class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="khoiThiSelected.thiTapThe && thiSinhSuggested ? addThiSinhSuggestThiTapThe() : showCreateThiSinhTapThe()">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span v-if="!khoiThiSelected.thiTapThe">Đăng ký</span>
            <span v-else>Thêm thí sinh</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <v-toolbar-title>Danh sách thí sinh không tham dự thi</v-toolbar-title>
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
            :items="danhSachThiSinhXoa"
            :items-per-page="100"
            page.sync="1"
            hide-default-footer
            class="table-base mt-2"
            no-data-text="Không có"
            loading-text="Đang tải... "
          >
            <template v-slot:item.index="{ item, index }">
              <div>{{ index + 1 }}</div>
            </template>
            <template v-slot:item.gioiTinh="{ item, index }">
              <div>{{ item.gioiTinh == 0 ? 'Nam' : 'Nữ'}}</div>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-2">
          <v-btn small color="red" class="white--text mx-0" @click="dialogDsThiSinh = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn small class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="xoaThiSinhKhongThi">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Xác nhận xóa thí sinh</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      max-width="1000"
      v-model="dialogDoiThiXoa"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="primary" class="px-3"
        >
          <v-toolbar-title>Danh sách đội thi không có thí sinh</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              small
              icon
              dark
              @click="dialogDoiThiXoa = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5 px-2">
          <v-card-text class="pt-0 px-2">
            <v-data-table
              :headers="headersDanhSachDoiThi"
              :items="danhSachDoiThiXoa"
              :items-per-page="500"
              page.sync="1"
              hide-default-footer
              class="table-base mt-2 ds-doi-thi"
              no-data-text="Không có"
              loading-text="Đang tải... "
            >
              <template v-slot:item.index="{ item, index }">
                <div>{{ index + 1 }}</div>
              </template>
            </v-data-table>
          </v-card-text>
          
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-2">
          <v-btn small color="red" class="white--text mx-0" @click="dialogDoiThiXoa = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Thoát
          </v-btn>
          <v-btn small class="mr-0" color="primary" :loading="loading" :disabled="loading" @click="xoaDoiThiKhongThiSinh">
            <v-icon left>
              mdi-content-save
            </v-icon>
            <span>Xác nhận xóa đội thi</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
  </v-card>
</template>

<script>
import Vue from 'vue'
import Pagination from './Pagination.vue'
import toastr from 'toastr'
import docxtemplater from 'docxtemplater'
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import axios from 'axios'

import VueQrcode from '@chenfengyuan/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
export default {
    name: 'CuocThi',
    components: {
      Pagination
    },
    props: ['type', 'id'],
    data() {
      return {
        dialogDoiThiXoa: false,
        danhSachDoiThiXoa: [],
        dialogDsThiSinh: false,
        danhSachThiSinhXoa: [],
        doanThiUpdate: '',
        toChucUpdate: '',
        emailToChucUpdate: '',
        loading: false,
        readonlyForm: false,
        mauNhapForm: '',
        dataInput: '',
        formData: '',
        chiTietCuocThi: '',
        itemsPerPage: 500,
        keywordSearch: '',
        dialogTaoDoanThi: false,
        validFormTaoDoanThi: false,
        tenDoanThi: '',
        danhSachDangKyThi: [],
        danhSachThiSinh: [],
        headersDanhSachThiSinh: [
          {
              sortable: false,
              text: 'STT',
              align: 'center',
              value: 'index',
              width: '5%'
          },
          {
              sortable: false,
              text: 'Tên thí sinh',
              align: 'left',
              value: 'hoTen',
              class: 'th-center py-2',
              width: '20%'
          },
          {
              sortable: false,
              text: 'Giới tính',
              align: 'left',
              value: 'gioiTinh',
              class: 'th-center',
              width: '10%'
          },
          {
              sortable: false,
              text: 'Ngày sinh',
              align: 'left',
              value: 'ngaySinh',
              class: 'th-center',
              width: '10%'
          },
          {
              sortable: false,
              text: 'Đối tượng thi',
              align: 'left',
              value: 'doiTuongThi',
              class: 'th-center py-2',
              width: '10%'
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
              text: 'Số điện thoại',
              align: 'left',
              value: 'soDienThoai',
              class: 'th-center py-2',
              width: '10%'
          },
          {
              sortable: false,
              text: 'Email',
              align: 'left',
              value: 'email',
              class: 'th-center py-2',
              width: '15%'
          },
          {
              sortable: false,
              text: 'Thao tác',
              align: 'center',
              value: 'action',
              width: '7%'
          }
        ],
        danhSachNoiDungThiThiSinh: [],
        headersNoiDung: [
          {
              sortable: false,
              text: 'Nội dung dự thi',
              align: 'left',
              value: 'tenNoiDung',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Thể thức',
              align: 'left',
              value: 'thiTapThe',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Đội thi',
              align: 'left',
              value: 'tenDoiThi',
              class: 'th-center'
          },
          {
              sortable: false,
              text: '',
              align: 'center',
              value: 'action',
              class: 'th-center'
          }
        ],
        loadingDataDanhSachThiSinh: false,
        pageDanhSachThiSinh: 0,
        totalDanhSachThiSinh: 0,
        pageCountDanhSachThiSinh: 0,

        noiDungThiUpDate: '',
        indexNoiDungThiUpDate: '',
        danhSachDoiThi: [],
        danhSachHlv: [],
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
          {
              sortable: false,
              text: 'Chức danh trong đoàn',
              align: 'left',
              value: 'truongPhoDoan',
              class: 'th-center'
          },
          {
              sortable: false,
              text: 'Số điện thoại',
              align: 'left',
              value: 'soDienThoai',
              class: 'th-center py-2'
          },
          {
              sortable: false,
              text: 'Email',
              align: 'left',
              value: 'email',
              class: 'th-center'
          },
          // {
          //     sortable: false,
          //     text: 'Nội dung phụ trách',
          //     align: 'left',
          //     value: 'noiDungThi',
          //     class: 'th-center',
          //     width: 400
          // },
          {
              sortable: false,
              text: 'Thao tác',
              align: 'center',
              value: 'action',
              width: 100
          }
        ],
        loadingDataDanhSachHlv: false,
        pageDanhSachHlv: 0,
        totalDanhSachHlv: 0,
        pageCountDanhSachHlv: 0,

        danhSachKhoiThi: [],
        doiThiDangKy: '',
        noiDungDuThiThiSinh: '',
        noiDungDuThiHlv: '',
        thongTinToChuc: '',
        thongTinDoanThi: '',
        typeAction: '',
        thongTinThiSinh: '',
        dialogAddThiSinh: false,
        validFormAddThiSinh: false,
        itemsGioiTinh: [
          {tenMuc: 'Nam', maMuc: 0},
          {tenMuc: 'Nữ', maMuc: 1}
        ],
        itemsChucVu: [
          {tenMuc: 'Trưởng đoàn', maMuc: 1},
          {tenMuc: 'Phó đoàn', maMuc: 2},
          {tenMuc: 'Huấn luyện viên', maMuc: 3}
        ],
        ngaySinhCreate: '',
        thongTinHlv: '',
        dialogAddHlv: false,
        validFormAddHlv: false,
        validFormAddDoiThi: false,
        tenDoiThiTaoMoi: '',
        dialogAddDoiThi: false,
        required: [
          v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc'
        ],
        panelModel: [],
        khoiThiSelected: '',
        validFormAddThiSinhDoiThi: false,
        dialogChonDoiThi: false,
        doiThiSelected: '',
        danhSachHlvSuggest: [],
        hlvSuggested: '',
        danhSachThiSinhSuggest: [],
        thiSinhSuggested: '',
        danhSachDoiTuongSuggest: [],
        doiTuongSuggested: '',
        danhSachNganhDaoTaoSuggest: [],
        nganhDaoTaoSuggested: '',
        danhSachNamThiSuggest: [
          {giaTri: 2022, maDanhMuc: '2022'},
          {giaTri: 2021, maDanhMuc: '2021'},
          {giaTri: 2020, maDanhMuc: '2020'},
          {giaTri: 2019, maDanhMuc: '2019'}
        ],
        namThiSuggested: '',
        danhSachCuocThiSuggest: [
          {giaTri: 'Olympic Tin học Sinh Viên Việt Nam', maDanhMuc: 'OLP'},
          {giaTri: 'Kỳ thi lập trình sinh viên Quốc tế ICPC', maDanhMuc: 'ICPC'}
        ],
        cuocThiSuggested: '',
        danhSachGiaiThuongSuggest: [
          {giaTri: 'Giải nhất', maDanhMuc: 'NHAT'},
          {giaTri: 'Giải nhì', maDanhMuc: 'NHI'},
          {giaTri: 'Giải ba', maDanhMuc: 'BA'},
          {giaTri: 'Giải khuyến khích', maDanhMuc: 'KK'},
          {giaTri: 'Huy chương vàng', maDanhMuc: 'VANG'},
          {giaTri: 'Huy chương bạc', maDanhMuc: 'BAC'},
          {giaTri: 'Huy chương đồng', maDanhMuc: 'DONG'}
        ],
        giaiThuongSuggested: '',
        soThiSinhThamDu: 0,
        soDoanThiThamDu: 0,
        soDoiThiThamDu: 0,
        soKhoiThiThamDu: 0,
        loadingExport: false,
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
              text: 'Tên đội thi',
              align: 'left',
              value: 'tenGoi',
              class: 'th-center py-2'
          }
        ],
      }
    },
    created () {
      let vm = this
      let currentQuery = vm.$router.history.current.query
      //
      if (!vm.isSigned) {
        let ref = '/dang-ky-thi/' + vm.id
        vm.$router.push({ path: '/dang-nhap?redirect=' + ref})
      }
      if (vm.isSigned && vm.checkRoleAction('VAITRO_QUANTRIHETHONG') && !currentQuery.hasOwnProperty('doanthi')) {
        vm.$router.push({ path: '/cuoc-thi/' + vm.id})
      }
      //
      if (currentQuery.hasOwnProperty('doanthi') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
        vm.doanThiUpdate = currentQuery.doanthi
      }
      if (currentQuery.hasOwnProperty('tochuc') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
        vm.toChucUpdate = currentQuery.tochuc
      }
      if (currentQuery.hasOwnProperty('email') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
        vm.emailToChucUpdate = currentQuery.email
      }
      vm.getDanhSachDoiThi()
      vm.getChiTietCuocThi()
      vm.getDanhSachKhoiThi()
      if (vm.userLogin.loaiTaiKhoan == 0 || vm.toChucUpdate) {
        vm.getThongTinToChuc()
      }
      vm.getDanhMuc('C_DOITUONGTHI')
      vm.getDanhMuc('C_NGANHDAOTAO')
      vm.getDanhMuc('C_CUOCTHIDATGIAI')
      vm.getDanhMuc('C_GIAITHUONGCUOCTHI')
    },
    computed: {
      breakpointName () {
        return this.$store.getters.getBreakpointName
      },
      isSigned () {
        return this.$cookies.get('Token') ? true : false
      }
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let currentQuery = newRoute.query
        if (currentQuery.hasOwnProperty('doanthi') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
          vm.doanThiUpdate = currentQuery.doanthi
        }
        if (currentQuery.hasOwnProperty('tochuc') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
          vm.toChucUpdate = currentQuery.tochuc
        }
        if (currentQuery.hasOwnProperty('email') && vm.checkRoleAction('VAITRO_QUANTRIHETHONG')) {
          vm.emailToChucUpdate = currentQuery.email
        }
        let vm = this
        vm.getChiTietCuocThi()
        vm.getDanhSachKhoiThi()
        if (vm.userLogin.loaiTaiKhoan == 0 || vm.toChucUpdate) {
          vm.getThongTinToChuc()
        }
        vm.getDanhMuc('C_DOITUONGTHI')
        vm.getDanhMuc('C_NGANHDAOTAO')
        vm.getDanhMuc('C_CUOCTHIDATGIAI')
        vm.getDanhMuc('C_GIAITHUONGCUOCTHI')
      }
    },
    methods: {
      inTheThiSinh(item){
        loadFile(window.location.origin + "/docs/The_thi_sinh_OLP-PROCON.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
          doc.setData({
            ten_ts: item.hoTen
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
            console.log(JSON.stringify({ error: error }, replaceErrors));
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
          saveAs(out, "Thẻ thí sinh " + item.hoTen + ".docx");
        });
      }, 
      inTheHuanLuyenVien(item){
        loadFile(window.location.origin + "/docs/The_truong_pho_doan.docx", function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        doc.setData({
          ten_hlv: item.hoTen
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
          console.log(JSON.stringify({ error: error }, replaceErrors));
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
        saveAs(out, "Thẻ trưởng phó đoàn " + item.hoTen + ".docx");
      });
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
          if (danhmuc == 'C_DOITUONGTHI') {
            vm.danhSachDoiTuongSuggest = response
          }
          if (danhmuc == 'C_NGANHDAOTAO') {
            vm.danhSachNganhDaoTaoSuggest = response
          }
          if (danhmuc == 'C_CUOCTHIDATGIAI' && response && response.length) {
            vm.danhSachCuocThiSuggest = response
          }
          if (danhmuc == 'C_GIAITHUONGCUOCTHI' && response && response.length) {
            vm.danhSachGiaiThuongSuggest = response
          }
        }).catch(function () {
        })
      },
      getChiTietCuocThi () {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          id: vm.id
        }
        vm.$store.dispatch('collectionDetail', filter).then(function (response) {
          vm.chiTietCuocThi = response
        }).catch(function () {
        })
      },
      getDanhSachKhoiThi () {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'khoithis',
          data: {
          }
        }
        vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
          response.forEach(element => {
            element.danhSachThiSinhSuggest = []
            element.thiSinhSuggest = ''
            element.thiSinhs = []
          })
          vm.danhSachKhoiThi = response
          vm.panelModel = Array.from(vm.danhSachKhoiThi, function (item, index) {
            return index
          })
          vm.getDanhSachThiSinhSuggest()
        }).catch(function () {
        })
      },
      getThongTinToChuc () {
        let vm = this
        if (!vm.toChucUpdate) {
          let filter = {
            collectionName: 'tochucs',
            data: {
              email: vm.emailToChucUpdate ? vm.emailToChucUpdate : vm.userLogin.email
            }
          }
          vm.$store.dispatch('collectionFilter', filter).then(function (response) {
            vm.thongTinToChuc = response && response.length ? response[0] : ''
            if (vm.thongTinToChuc) {
              vm.getThongTinDoanThi()
            } else {
              toastr.error("Chưa có thông tin tổ chức. Vui lòng kiểm tra lại.")
            }
          }).catch(function () {
          })
        } else {
          let filter = {
            collectionName: 'tochucs',
            id: vm.toChucUpdate,
            data: {}
          }
          vm.$store.dispatch('collectionDetail', filter).then(function (response) {
            vm.thongTinToChuc = response
            if (vm.thongTinToChuc) {
              vm.getThongTinDoanThi()
            } else {
              toastr.error("Chưa có thông tin tổ chức. Vui lòng kiểm tra lại.")
            }
          }).catch(function () {
          })
        }
      },
      getDanhSachThiSinhSuggest () {
        let vm = this
        let filter = {
          collectionName: 'thisinhs',
          toChucId: vm.toChucUpdate ? vm.toChucUpdate : vm.userLogin.id,
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterDaGhiDanh', filter).then(function (response) {
          let contentUpdate = ''
          vm.danhSachKhoiThi.forEach(function (element, index) {
            contentUpdate = Object.assign(element, {
              danhSachThiSinhSuggest: [].concat(response),
              thiSinhSuggest: ''
            })
            vm.$set(vm.danhSachKhoiThi, index, contentUpdate)
          })
        }).catch(function () {
        })
      },
      changeSuggest () {
        let vm = this
        if (vm.thiSinhSuggested && vm.thiSinhSuggested.hasOwnProperty('hoTen')) {
          vm.thongTinThiSinh = vm.thiSinhSuggested
          vm.ngaySinhCreate = vm.thiSinhSuggested.ngaySinh ? vm.convertDate(vm.thiSinhSuggested.ngaySinh) : ''
          if (vm.thiSinhSuggested.doiTuongThi) {
            vm.doiTuongSuggested = vm.thiSinhSuggested.doiTuongThi
          }
          if (vm.thiSinhSuggested.nganhDaoTao) {
            vm.nganhDaoTaoSuggested = vm.thiSinhSuggested.nganhDaoTao
          }
        }
      },
      changeSuggestNganhDaoTao () {
        let vm = this
        if (vm.nganhDaoTaoSuggested && vm.nganhDaoTaoSuggested.hasOwnProperty('giaTri')) {
          vm.thongTinThiSinh.nganhDaoTao = vm.nganhDaoTaoSuggested.giaTri
        }
      },
      changeSuggestDoiTuong () {
        let vm = this
        if (vm.doiTuongSuggested && vm.doiTuongSuggested.hasOwnProperty('giaTri')) {
          vm.thongTinThiSinh.doiTuongThi = vm.doiTuongSuggested.giaTri
        }
      },
      addThiSinhSuggest (item, index) {
        let vm = this
        if (!item.thiSinhSuggest) {
          return
        }
        
        let thongTinThiSinh = {
          "hoTen": item.thiSinhSuggest.hoTen,
          "gioiTinh": item.thiSinhSuggest.gioiTinh,
          "doanThiId": vm.thongTinDoanThi.id,
          "ngaySinh": item.thiSinhSuggest.ngaySinh,
          "email": item.thiSinhSuggest.email,
          "soDienThoai": item.thiSinhSuggest.soDienThoai,
          "doiTuongThi": item.thiSinhSuggest.doiTuongThi,
          "nganhDaoTao": item.thiSinhSuggest.nganhDaoTao,
          "datGiaiThuong": item.thiSinhSuggest.datGiaiThuong
        }
        console.log('vm.thongTinThiSinh', thongTinThiSinh)
        if (vm.loading) {
          return
        }
        vm.loading = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionChildName: 'thisinhs',
          data: thongTinThiSinh
        }
        vm.$store.dispatch('collectionCreateChild', filter).then(function (result) {
          vm.loading = false
          vm.addDanhSachThi(result.id, item)
        }).catch(function (response) {
          vm.loading = false
        })
        
      },
      exportDoanThi() {
        let vm = this
        if (vm.loadingExport) {
          return
        }
        vm.loadingExport = true
        let filter = {
          collectionName: 'doanthis',
          id: vm.thongTinDoanThi.id,
          tenGoi: vm.thongTinDoanThi.tenGoi
        }
        vm.$store.dispatch('exportDoanThi', filter). then(function (response) {
          vm.loadingExport = false
        }).catch(function() {
          vm.loadingExport = false
        })
      },
      addThiSinhSuggestThiTapThe () {
        let vm = this
        let thongTinThiSinh = {
          "hoTen": vm.thiSinhSuggested.hoTen,
          "gioiTinh": vm.thiSinhSuggested.gioiTinh,
          "doanThiId": vm.thongTinDoanThi.id,
          "ngaySinh": vm.thiSinhSuggested.ngaySinh,
          "email": vm.thiSinhSuggested.email,
          "soDienThoai": vm.thiSinhSuggested.soDienThoai,
          "doiTuongThi": vm.thiSinhSuggested.doiTuongThi,
          "nganhDaoTao": vm.thiSinhSuggested.nganhDaoTao,
          "datGiaiThuong": vm.thiSinhSuggested.datGiaiThuong
        }
        console.log('vm.thongTinThiSinh', thongTinThiSinh)
        if (vm.loading || !vm.doiThiSelected) {
          return
        }
        vm.loading = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionChildName: 'thisinhs',
          data: thongTinThiSinh
        }
        vm.$store.dispatch('collectionCreateChild', filter).then(function (result) {
          vm.loading = false
          vm.addDanhSachThi(result.id, vm.khoiThiSelected, vm.doiThiSelected)
        }).catch(function (response) {
          vm.loading = false
        })
        
      },
      showChonDoiThi (khoiThi, thiSinh) {
        let vm = this
        if (!thiSinh) return
        vm.getDanhSachDoiThi()
        vm.khoiThiSelected = khoiThi
        vm.dialogChonDoiThi = true
        vm.thiSinhSuggested = thiSinh
      },
      addDanhSachThi (thiDinhId, khoiThi, doiThiId) {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionChildName: 'danhsachthis',
          data: {
            "thiSinhId": thiDinhId,
            "khoiThiId": khoiThi['id']
          }
        }
        if (doiThiId) {
          filter.data = Object.assign(filter.data, {"doiThiId": doiThiId})
        }
        vm.$store.dispatch('collectionCreateChild', filter).then(function () {
          vm.dialogChonDoiThi = false
          vm.getDanhSachThiSinh()
          vm.tongHopThamDu()
        }).catch(function () {
        })
      },
      getThongTinDoanThi () {
        let vm = this
        let filter = {
          collectionName: 'doanthis',
          data: {
            cuocThiId: vm.id,
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.soDoanThiThamDu = response.length
          vm.thongTinDoanThi = ''
          if (!vm.toChucUpdate) {
            try {
              let doanthi = response && response.length ? response.filter(function (item) {
                return item.cuocThiId == vm.id && item.toChucId == vm.userLogin.id
              }) : ''
              vm.thongTinDoanThi = doanthi ? doanthi[doanthi.length - 1] : ''
            } catch (error) {
            }
          } else {
            try {
              let doanthi = response && response.length ? response.filter(function (item) {
                return item.cuocThiId == vm.id && item.toChucId == vm.toChucUpdate
              }) : ''
              vm.thongTinDoanThi = doanthi ? doanthi[doanthi.length - 1] : ''
            } catch (error) {
            }
          }
          
          if (vm.thongTinDoanThi) {
            vm.getDanhSachThiSinh()
            vm.getDanhSachHlv()
            vm.tongHopThamDu()
          } else {
            vm.tenDoanThi = vm.thongTinToChuc.tenGoi
            vm.dialogTaoDoanThi = true
          }
        }).catch(function () {
        })
      },
      taoDoanThi () {
        let vm = this
        let filter = {
          collectionName: 'doanthis',
          data: {
            "tenGoi": vm.tenDoanThi,
            "toChucId": vm.thongTinToChuc.id,
            "cuocThiId": vm.id,
            "email": vm.thongTinToChuc.email ? vm.thongTinToChuc.email : ''
          }
        }
        vm.loading = true
        vm.$store.dispatch('collectionCreate', filter).then(function (result) {
          vm.loading = false
          vm.thongTinDoanThi = result
          vm.dialogTaoDoanThi = false
        }).catch(function (response) {
          vm.loading = false
        })
      },
      getDanhSachThiSinh (type) {
        let vm = this
        if (type === 'reset') {
          vm.totalDanhSachThiSinh = 0
          vm.pageCountDanhSachThiSinh = 0
          vm.pageDanhSachThiSinh = 0
        }
        vm.loadingDataDanhSachThiSinh = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: vm.thongTinDoanThi.id,
          collectionNameChild2: 'thisinhs',
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.danhSachThiSinh = response
          vm.loadingDataDanhSachThiSinh = false
          let dsNoiDungDaDangKy = []
          for (let index = 0; index < vm.danhSachThiSinh.length; index++) {
            const element = vm.danhSachThiSinh[index]
            if (element && element['noiDungThi'].length) {
              dsNoiDungDaDangKy = dsNoiDungDaDangKy.concat(element['noiDungThi'])
            }
          }
          if (dsNoiDungDaDangKy.length) {
            vm.danhSachKhoiThi.forEach(element => {
              let counter = dsNoiDungDaDangKy.filter(function (item) {
                return item.id == element.id
              }).length
              element['countThiSinh'] = counter
            })
          }
          // 
          let filter = {
            collectionName: 'danhsachthis',
            data: {
              cuocThiId: vm.id,
              doanThiId: vm.thongTinDoanThi.id,
              page: 1,
              size: 10000
            }
          }
          vm.$store.dispatch('collectionFilter', filter).then(function (response) {
            vm.danhSachDangKyThi = response.filter(function (item) {
              return item.khoiThiId
            })

            vm.danhSachKhoiThi.forEach((khoiThi, index) => {
              let thisinhArr = []
              vm.danhSachThiSinh.forEach(thisinh => {
                let thisinhdk = Object.assign({}, thisinh)
                if (thisinhdk.noiDungThi && thisinhdk.noiDungThi.length) {
                  let exits = thisinhdk.noiDungThi.find(function (item) {
                    return item.id == khoiThi.id
                  })
                  if (exits) {
                    if (exits.thiTapThe) {
                      // console.log('khoiThiId', exits.id)
                      // console.log('thiSinhId', thisinhdk.id)
                      // console.log('dsthi', vm.danhSachDangKyThi)
                      
                      let dsthi = vm.danhSachDangKyThi.find(function (item) {
                        return item.khoiThiId == exits.id && item.thiSinhId == thisinhdk.id
                      })
                      if (dsthi) {
                        thisinhdk['danhSachThiId'] = dsthi.danhSachThiId
                        // console.log('dsthi111111', dsthi)
                        let doiThi = vm.danhSachDoiThi.find(function (item) {
                          return item.id == dsthi.doiThiId
                        })
                        // console.log('doiThi', doiThi)
                        if (doiThi) {
                          thisinhdk['Đội thi'] = doiThi.tenGoi
                        }
                      }
                    } else {
                      let dsthi = vm.danhSachDangKyThi.find(function (item) {
                        return item.khoiThiId == exits.id && item.thiSinhId == thisinhdk.id
                      })
                      if (dsthi) {
                        thisinhdk['danhSachThiId'] = dsthi.danhSachThiId
                      }
                    }
                    thisinhArr.push(thisinhdk)
                  }
                }
              });
              khoiThi.thiSinhs = thisinhArr
            })
          })
          
          // 
          console.log('danhSachThiSinh5555', vm.danhSachThiSinh)
          console.log('danhSachKhoiThi5555', vm.danhSachKhoiThi)
        }).catch(function () {
          vm.loadingDataDanhSachThiSinh = false
        })
        vm.getDanhSachThi()
      },
      getDanhSachHlv (type) {
        let vm = this
        if (type === 'reset') {
          vm.totalDanhSachHlv = 0
          vm.pageCountDanhSachHlv = 0
          vm.pageDanhSachHlv = 0
        }
        if (vm.loadingDataDanhSachHlv) {
          return
        }
        vm.loadingDataDanhSachHlv = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: vm.thongTinDoanThi.id,
          collectionNameChild2: 'huanluyenviens',
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.danhSachHlv = response
          vm.loadingDataDanhSachHlv = false
        }).catch(function () {
          vm.loadingDataDanhSachHlv = false
        })
      },
      getDanhSachThi () {
        let vm = this
        let filter = {
          collectionName: 'danhsachthis',
          data: {
            cuocThiId: vm.id,
            doanThiId: vm.thongTinDoanThi.id,
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          vm.danhSachDangKyThi = response.filter(function (item) {
            return item.khoiThiId
          })
          // let filter = {
          //   collectionName: 'doithis',
          //   data: {
          //     doanThiId: vm.thongTinDoanThi.id,
          //     cuocThiId: vm.id
          //   }
          // }
          // vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          //   let doiThis = response.filter(function (item) {
          //     return item.khoiThiId
          //   })
          //   vm.danhSachDangKyThi.forEach(function (item) {
          //     let doiThi = doiThis.find(function (i) {
          //       i.id == item.doiThiId
          //     })
          //     item['tenDoiThi'] = doiThi ? doiThi.tenGoi : ''
          //   })
          // })
        }).catch(function () {
        })
      },
      getDanhSachDoiThi () {
        let vm = this
        let filter = {
          collectionName: 'doithis',
          data: {
            doanThiId: vm.doanThiUpdate ? vm.doanThiUpdate : vm.thongTinDoanThi.id,
            cuocThiId: vm.id,
            page: 1,
            size: 10000
          }
        }
        console.log('filtergetDanhSachDoiThi', filter)
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          response.forEach(element => {
            element['doiThiId'] = element.id
          });
          vm.danhSachDoiThi = response.filter(function (item) {
            return item.khoiThiId
          })
          // 
          if (vm.danhSachDoiThi.length) {
            vm.danhSachKhoiThi.forEach(element => {
              let counter = vm.danhSachDoiThi.filter(function (item) {
                return item.khoiThiId == element.id
              }).length
              element['countDoiThi'] = counter
            })
          }
          //
          if (vm.danhSachDangKyThi.length) {
            vm.danhSachDoiThi.forEach(element => {
              let counter = vm.danhSachDangKyThi.filter(function (item) {
                return item.doiThiId == element.id
              }).length
              element['countThiSinh'] = counter
            })
          }
          // 
          console.log('danhSachDoiThi2', vm.danhSachDoiThi)
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
      statusContest (status) {
        if (status == 1) {
          return 'Mở đăng kí'
        } else if (status == 2) {
          return 'Đóng đăng kí'
        } else if (status == 3) {
          return 'Đóng đăng kí'
        }else {
          return '0'
        }
      },
      showEditThiSinh (item) {
        let vm = this
        vm.typeAction = 'update'
        vm.dialogAddThiSinh = true
        vm.danhSachNoiDungThiThiSinh = []
        setTimeout(function () {
          vm.thongTinThiSinh = Object.assign({}, item)
          if (vm.thongTinThiSinh.noiDungThi) {
            for (let index = 0; index < vm.thongTinThiSinh.noiDungThi.length; index++) {
              let el = vm.thongTinThiSinh.noiDungThi[index]
              let doiThiId = ''
              if (el.thiTapThe) {
                doiThiId = vm.danhSachDoiThi.find(function (item2) {
                  return item2.id == el.id
                })
              }
              let item3 = {
                tenNoiDung: el.noiDungThi,
                khoiThiId: el.id,
                thiTapThe: el.thiTapThe,
                doiThiId: doiThiId,
                tenDoiThi: '',
                tenKhoiThi: el.tenGoi,
                maxDangKi: el.maxDangKi,
                maxThiSinh: el.maxThiSinh
              }
              vm.danhSachNoiDungThiThiSinh.push(item3)
            }
          }
          vm.ngaySinhCreate = vm.convertDate(vm.thongTinThiSinh.ngaySinh)
          vm.$refs.formAddThiSinh.resetValidation()
        }, 100)
      },
      showCreateThiSinh (khoiThi, suggest) {
        let vm = this
        vm.khoiThiSelected = khoiThi
        // if (vm.khoiThiSelected.cuocThiTruocId) {
        //   let vm = this
        //   let filter = {
        //     collectionName: 'cuocthis',
        //     collectionId: vm.khoiThiSelected.cuocThiTruocId,
        //     collectionNameChild: 'thisinhs',
        //     data: {
        //       page: 1,
        //       size: 10000
        //     }
        //   }
        //   vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
        //     let dsThiSinh = response.filter(function (item) {
        //       return item.doanThiId
        //     })
        //     let filter = {
        //       collectionName: 'doanthis',
        //       data: {
        //         page: 1,
        //         size: 10000,
        //         cuocThiId: vm.khoiThiSelected.cuocThiTruocId
        //       }
        //     }
        //     vm.$store.dispatch('collectionFilter', filter).then(function (response) {
        //       let emailDoanThi = vm.emailToChucUpdate ? vm.emailToChucUpdate : vm.userLogin.email
        //       let doanThi = response.find(function (item) {
        //         return String(item.email).trim() == String(emailDoanThi).trim()
        //       })
        //       if (doanThi) {
        //         vm.danhSachThiSinhSuggest = dsThiSinh.filter(function(item) {
        //           return item.doanThiId == doanThi.id
        //         })
        //       } else {
        //         vm.danhSachThiSinhSuggest = dsThiSinh
        //       }
        //     }).catch(function () {})
        //   }).catch(function () {})
        // } else {
          vm.danhSachThiSinhSuggest = suggest
        // }
        vm.typeAction = 'create'
        vm.getDanhSachDoiThi()
        vm.danhSachNoiDungThiThiSinh = []
        vm.dialogAddThiSinh = true
        setTimeout(function () {
          vm.thongTinThiSinh = {
            "hoTen": "",
            "gioiTinh": "",
            "ngaySinh": "",
            "email": "",
            "soDienThoai": "",
            "doiTuongThi": "",
            "nganhDaoTao": "",
            "datGiaiThuong": ""
          }
          vm.$refs.formAddThiSinh.reset()
          vm.$refs.formAddThiSinh.resetValidation()
        }, 100)
      },
      showCreateThiSinhTapThe () {
        let vm = this
        vm.typeAction = 'create'
        vm.danhSachNoiDungThiThiSinh = []
        vm.dialogAddThiSinh = true
        setTimeout(function () {
          vm.thongTinThiSinh = {
            "hoTen": "",
            "gioiTinh": "",
            "ngaySinh": "",
            "email": "",
            "soDienThoai": "",
            "doiTuongThi": "",
            "nganhDaoTao": "",
            "datGiaiThuong": ""
          }
          vm.$refs.formAddThiSinh.reset()
          vm.$refs.formAddThiSinh.resetValidation()
        }, 100)
      },
      submitCreateThiSinh () {
        let vm = this
        setTimeout(() => {
          try {
            if (!vm.thiSinhSuggested.hasOwnProperty('hoTen')) {
              vm.thongTinThiSinh['hoTen'] = vm.thiSinhSuggested
              vm.thongTinThiSinh['id'] = null
            }
          } catch (error) {
          }
          try {
            if (!vm.doiTuongSuggested.hasOwnProperty('giaTri')) {
              vm.thongTinThiSinh['doiTuongThi'] = vm.doiTuongSuggested
            }
          } catch (error) {
          }
          try {
            if (!vm.nganhDaoTaoSuggested.hasOwnProperty('giaTri')) {
              vm.thongTinThiSinh['nganhDaoTao'] = vm.nganhDaoTaoSuggested
            }
          } catch (error) {
          }
          try {
            if (!vm.thiSinhSuggested.hasOwnProperty('hoTen')) {
              vm.thongTinThiSinh['hoTen'] = vm.thiSinhSuggested
            }
          } catch (error) {
          }
          let giaiThuongCuocThi = ''
          let giaiThuongNamThi = ''
          let giaiThuong = ''
          try {
            if (!vm.cuocThiSuggested.hasOwnProperty('giaTri')) {
              giaiThuongCuocThi = vm.cuocThiSuggested
            } else {
              giaiThuongCuocThi = vm.cuocThiSuggested.giaTri
            }
          } catch (error) {
          }
          try {
            if (!vm.namThiSuggested.hasOwnProperty('giaTri')) {
              giaiThuongNamThi = vm.namThiSuggested
            } else {
              giaiThuongNamThi = vm.namThiSuggested.giaTri
            }
          } catch (error) {
          }
          try {
            if (!vm.giaiThuongSuggested.hasOwnProperty('giaTri')) {
              giaiThuong = vm.giaiThuongSuggested
            } else {
              giaiThuong = vm.giaiThuongSuggested.giaTri
            }
          } catch (error) {
          }
          vm.thongTinThiSinh['datGiaiThuong'] = giaiThuong + ' ' + giaiThuongCuocThi
          if (vm.namThiSuggested) {
            vm.thongTinThiSinh['datGiaiThuong'] = vm.thongTinThiSinh['datGiaiThuong'] + ' năm ' + giaiThuongNamThi
          }

          if (vm.loading) {
            return
          }
          
          if (vm.$refs.formAddThiSinh.validate()) {
            // if (!vm.danhSachNoiDungThiThiSinh.length) {
            //   toastr.error('Vui lòng chọn nội dung đăng ký dự thi')
            //   return
            // }
            vm.thongTinThiSinh.ngaySinh = vm.formatDateInput(vm.ngaySinhCreate)
            vm.thongTinThiSinh.doanThiId = vm.thongTinDoanThi.id
            console.log('thongTinThiSinh', vm.thongTinThiSinh)
            let filter = {
              collectionName: 'cuocthis',
              collectionId: vm.id,
              collectionChildName: 'thisinhs',
              data: vm.thongTinThiSinh
            }
            vm.loading = true
            vm.$store.dispatch('collectionCreateChild', filter).then(function (result) {
              vm.loading = false
              toastr.remove()
              toastr.success('Thêm mới thành công')
              vm.dialogAddThiSinh = false
              if (vm.khoiThiSelected.thiTapThe) {
                vm.addDanhSachThi(result.id, vm.khoiThiSelected, vm.doiThiSelected)
              } else {
                vm.addDanhSachThi(result.id, vm.khoiThiSelected)
              }
              vm.getDanhSachThiSinhSuggest()
            }).catch(function (response) {
              vm.loading = false
              toastr.remove()
              toastr.error('Thêm mới thất bại')
            })
          } else {
            vm.loading = false
          }
        }, 100);
      },
      taoDanhSachThi (thiDinhId) {
        let vm = this
        var arrNoiDungThi = []
        for (let index = 0; index < vm.danhSachNoiDungThiThiSinh.length; index++) {
          let filter = {
            collectionName: 'cuocthis',
            collectionId: vm.id,
            collectionChildName: 'danhsachthis',
            data: {
              "thiSinhId": thiDinhId,
              "khoiThiId": vm.danhSachNoiDungThiThiSinh[index]['khoiThiId']
            }
          }
          if (vm.danhSachNoiDungThiThiSinh[index]['doiThiId']) {
            filter.data = Object.assign(filter.data, {"doiThiId": vm.danhSachNoiDungThiThiSinh[index]['doiThiId']})
          }
          arrNoiDungThi.push(vm.$store.dispatch('collectionCreateChild', filter))
        }
        Promise.all(arrNoiDungThi).then(values => {
          vm.getDanhSachThiSinh()
        }).catch(function () {
        })
      },
      addNoiDungThi () {
        let vm = this
        if (vm.noiDungDuThiThiSinh) {
          let exits = vm.danhSachNoiDungThiThiSinh.find(function(item) {
            return item.khoiThiId == vm.noiDungDuThiThiSinh.id
          })
          if (exits) {
            toastr.error('Nội dung thi đã đăng ký')
            return
          }
          // 
          if (!vm.noiDungDuThiThiSinh.thiTapThe && vm.noiDungDuThiThiSinh.maxDangKi == vm.noiDungDuThiThiSinh.countThiSinh) {
            toastr.error('Nội dung thi chỉ được đăng ký tối đa ' + vm.noiDungDuThiThiSinh.maxDangKi + ' thí sinh')
            return
          }
          // 
          let item = {
            tenNoiDung: vm.noiDungDuThiThiSinh.noiDungThi,
            khoiThiId: vm.noiDungDuThiThiSinh.id,
            thiTapThe: vm.noiDungDuThiThiSinh.thiTapThe,
            doiThiId: '',
            tenDoiThi: '',
            tenKhoiThi: vm.noiDungDuThiThiSinh.tenGoi,
            maxThiSinh: vm.noiDungDuThiThiSinh.maxThiSinh,
            maxDangKi: vm.noiDungDuThiThiSinh.maxDangKi
          }
          vm.danhSachNoiDungThiThiSinh.push(item)
          vm.$refs.formAddThiSinh.validate()
          setTimeout(function () {
            vm.noiDungDuThiThiSinh = ''
          }, 100)
        }
      },
      deleteNoiDungThiThiSinh (item, index) {
        let vm = this
        vm.danhSachNoiDungThiThiSinh.splice(index, 1)
      },
      createDoiThi (item, index) {
        let vm = this
        vm.indexNoiDungThiUpDate = index
        vm.noiDungThiUpDate = item
        vm.tenDoiThiTaoMoi = ''
        vm.dialogAddDoiThi = true
      },
      submitCreateDoiThi () {
        let vm = this
        if (vm.$refs.formAddDoiThi.validate()) {
          let filter = {
            collectionName: 'cuocthis',
            collectionId: vm.id,
            collectionChildName: 'doithis',
            data: {
              "tenGoi": vm.tenDoiThiTaoMoi,
              "ketQuaSoLoai": '',
              "thuTuXepHang": '',
              "doanThiId": vm.thongTinDoanThi.id,
              "khoiThiId": vm.khoiThiSelected.id
            }
          }
          vm.$store.dispatch('collectionCreateChild', filter).then(function (result) {
            vm.doiThiSelected = result.id
            vm.loading = false
            toastr.remove()
            toastr.success('Thêm mới thành công')
            vm.dialogAddDoiThi = false
            vm.getDanhSachDoiThi()
          }).catch(function (response) {
            toastr.remove()
            toastr.error('Thêm mới thất bại')
          })
        }
      },
      submitUpdateThiSinh () {
        let vm = this
        if (vm.loading) {
          return
        }
        vm.loading = true
        if (vm.$refs.formAddThiSinh.validate()) {
          vm.thongTinThiSinh.ngaySinh = vm.formatDateInput(vm.ngaySinhCreate)
          let filter = {
            collectionName: 'thisinhs',
            id: vm.thongTinThiSinh['id'],
            data: vm.thongTinThiSinh
          }
          vm.$store.dispatch('collectionUpdate', filter).then(function (result) {
            vm.loading = false
            toastr.remove()
            toastr.success('Cập nhật thông tin thành công')
            vm.dialogAddThiSinh = false
            vm.getDanhSachThiSinh()
          }).catch(function (response) {
            vm.loading = false
            toastr.remove()
            toastr.error('Cập nhật thông tin thất bại')
          })
        } else {
          vm.loading = false
        }
      },
      getDanhSachHlvSuggest () {
        let vm = this
        let filter = {
          collectionName: 'huanluyenviens',
          toChucId: vm.toChucUpdate ? vm.toChucUpdate : vm.userLogin.id,
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterDaGhiDanh', filter).then(function (response) {
          vm.danhSachHlvSuggest = response
        }).catch(function () {
        })
      },
      changeSuggestHlv () {
        let vm = this
        if (vm.hlvSuggested && vm.hlvSuggested.hasOwnProperty('hoTen')) {
          vm.thongTinHlv = vm.hlvSuggested
        }
      },
      showCreateHlv () {
        let vm = this
        vm.getDanhSachHlvSuggest()
        vm.typeAction = 'create'
        vm.noiDungDuThiHlv = []
        vm.dialogAddHlv = true
        setTimeout(function () {
          vm.thongTinHlv = {
            "hoTen": "",
            "email": "",
            "soDienThoai": "",
            "truongPhoDoan": "",
            "doanThiId": "",
            "khoiThiId": "",
          }
          vm.$refs.formAddHlv.reset()
          vm.$refs.formAddHlv.resetValidation()
        }, 100)
      },
      showEditHlv (item) {
        let vm = this
        vm.typeAction = 'update'
        vm.dialogAddHlv = true
        setTimeout(function () {
          vm.thongTinHlv = Object.assign({}, item)
          // vm.noiDungDuThiHlv = vm.thongTinHlv.noiDungThi && vm.thongTinHlv.noiDungThi.length ? vm.thongTinHlv.noiDungThi : ''
          vm.$refs.formAddHlv.resetValidation()
        }, 100)
      },
      submitCreateHlv () {
        let vm = this
        try {
          if (!vm.hlvSuggested.hasOwnProperty('hoTen')) {
            vm.thongTinHlv['hoTen'] = vm.hlvSuggested
            vm.thongTinHlv['id'] = null
          }
        } catch (error) {
        }
        console.log('vm.thongTinHlv', vm.thongTinHlv)
        console.log('noiDungThi', vm.noiDungDuThiHlv)
        if (vm.loading) {
          return
        }
        if (vm.$refs.formAddHlv.validate()) {
          // if (!vm.noiDungDuThiHlv.length) {
          //   toastr.error('Vui lòng chọn nội dung thi phụ trách')
          //   return
          // }
          let khoiThiIds = ''
          try {
            khoiThiIds = Array.from(vm.noiDungDuThiHlv, function (item) {
              return item.id
            }).toString()
          } catch (error) {
          }
          vm.thongTinHlv.doanThiId = vm.thongTinDoanThi.id
          vm.thongTinHlv.khoiThiId = khoiThiIds ? khoiThiIds : ''
          let filter = {
            collectionName: 'cuocthis',
            collectionId: vm.id,
            collectionChildName: 'huanluyenviens',
            data: vm.thongTinHlv
          }
          vm.loading = true
          vm.$store.dispatch('collectionCreateChild', filter).then(function (result) {
            vm.loading = false
            toastr.remove()
            toastr.success('Thêm mới thành công')
            vm.dialogAddHlv = false
            vm.getDanhSachHlv()
          }).catch(function (response) {
            vm.loading = false
            toastr.remove()
            toastr.error('Thêm mới thất bại')
          })
        } else {
          vm.loading = false
        }
      },
      submitUpdateHlv () {
        let vm = this
        if (vm.loading) {
          return
        }
        vm.loading = true
        if (vm.$refs.formAddHlv.validate()) {
          let filter = {
            collectionName: 'huanluyenviens',
            id: vm.thongTinHlv['id'],
            data: vm.thongTinHlv
          }
          vm.$store.dispatch('collectionUpdate', filter).then(function (result) {
            vm.loading = false
            toastr.remove()
            toastr.success('Cập nhật thông tin thành công')
            vm.dialogAddHlv = false
            vm.getDanhSachHlv()
          }).catch(function (response) {
            vm.loading = false
            toastr.remove()
            toastr.error('Cập nhật thông tin thất bại')
          })
        } else {
          vm.loading = false
        }
      },
      deleteThiSinh (item) {
        let vm = this
        let danhSachThi = []
        danhSachThi = vm.danhSachDangKyThi ? vm.danhSachDangKyThi.filter(function (item2) {
          return item2.thiSinhId == item.id
        }) : []
        vm.$store.commit('SET_SHOWCONFIRM', true)
        let confirm = {
          auth: false,
          title: 'Xóa thí sinh',
          message: 'Bạn có chắc chắn muốn xóa đăng ký thí sinh "' + item.hoTen + '"',
          button: {
            yes: 'Có',
            no: 'Không'
          },
          callback: () => {
            console.log('danhSachThi', danhSachThi)
            console.log('danhSachThi2', item)
            // -----------------
            let filter = {
              collectionName: 'danhsachthis',
              id: item['danhSachThiId']
            }
            vm.$store.dispatch('collectionDelete', filter).then(function (result) {
              vm.loading = false
              toastr.remove()
              toastr.success('Xóa thí sinh thành công')
              vm.getDanhSachThiSinh()
            }).catch(function (err) {
              vm.loading = false
              toastr.remove()
              toastr.error('Xóa thí sinh thất bại')
            })
            // -----------------
            // if (danhSachThi && danhSachThi.length) {
            //   let arrDsThi = []
            //   for (let index = 0; index < danhSachThi.length; index++) {
            //     let filter = {
            //       collectionName: 'danhsachthis',
            //       id: danhSachThi[index]['danhSachThiId']
            //     }
            //     arrDsThi.push(vm.$store.dispatch('collectionDelete', filter).then(function (result) {}))
            //   }
            //   Promise.all(arrDsThi).then(values => {
            //     vm.xoaThiSinh(item.id)
            //     vm.loading = false
            //     toastr.remove()
            //     toastr.success('Xóa thí sinh thành công')
            //     vm.getDanhSachThiSinh()
            //   }).catch(function () {
            //   })
            // } else {
            //   vm.xoaThiSinh(item.id)
            // }
          }
        }
        vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
      },
      xoaThiSinh (thisinhid) {
        let vm = this
        let filter = {
          collectionName: 'thisinhs',
          id: thisinhid
        }
        vm.loading = true
        vm.$store.dispatch('collectionDelete', filter).then(function (result) {
          vm.loading = false
          toastr.remove()
          toastr.success('Xóa thí sinh thành công')
          vm.getDanhSachThiSinh()
        }).catch(function (response) {
          vm.loading = false
          toastr.remove()
          toastr.error('Xóa thí sinh thất bại')
        })
      },
      deleteHlv (item) {
        let vm = this
        vm.$store.commit('SET_SHOWCONFIRM', true)
        let confirm = {
          auth: false,
          title: 'Xóa huấn luyện viên',
          message: 'Bạn có chắc chắn muốn xóa "' + item.hoTen + '"',
          button: {
            yes: 'Có',
            no: 'Không'
          },
          callback: () => {
            let filter = {
              collectionName: 'huanluyenviens',
              id: item.id
            }
            vm.loading = true
            vm.$store.dispatch('collectionDelete', filter).then(function (result) {
              vm.loading = false
              toastr.remove()
              toastr.success('Xóa huấn luyện viên thành công')
              vm.getDanhSachHlv()
            }).catch(function (response) {
              vm.loading = false
              toastr.remove()
              toastr.error('Xóa huấn luyện viên thất bại')
            })
          }
        }
        vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
      },
      filterDoiThiTheoKhoi (doithis, noidungthi) {
        if (!doithis || !doithis.length) {
          return []
        } else {
          let doiThiKhoi = doithis.filter(function (item) {
            return item.khoiThiId == noidungthi.id
          })
          if (noidungthi.thiTapThe && noidungthi.maxThiSinh) {
            // console.log('23123123123AA', doithis, noidungthi)
            doiThiKhoi = doithis.filter(function (item) {
              return item.khoiThiId == noidungthi.id && (!item.countThiSinh || item.countThiSinh < noidungthi.maxThiSinh)
            })
          }
          return doiThiKhoi
        }
      },
      tongHopThamDu () {
        let vm = this
        vm.getDanhSachDoanThi()
        // vm.getDanhSachDoiThiTongHop()
        // vm.getDanhSachThiSinhTongHop()
      },
      getDanhSachDoanThi (type) {
        let vm = this
        if (vm.loadingDataTongHopDangKy) {
          return
        }
        vm.loadingDataTongHopDangKy = true
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'thongke',
          data: {}
        }
        vm.$store.dispatch('collectionFilterLevel2', filter).then(function (response) {
          let data = response.filter(function (item) {
            return item.soThiSinh
          })
          let current = data.find(function (item) {
            return item.doanThi.id == vm.thongTinDoanThi.id
          })
          if (current) {
            vm.soThiSinhThamDu = current.soThiSinh
            vm.soKhoiThiThamDu = current.noiDungThi.filter(function (item) {
              return item.soThiSinh
            }).length
            let soDoi = 0
            current.noiDungThi.forEach(function (item) {
              if (item.soDoi && item.soThiSinh) {
                soDoi += item.soDoi
              }
            })
            vm.soDoiThiThamDu = soDoi
          }
          
        }).catch(function () {
        })
      },
      getDanhSachThiSinhTongHop () {
        let vm = this
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: vm.thongTinDoanThi.id,
          collectionNameChild2: 'thisinhs',
          data: {
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.soThiSinhThamDu = response.length
        }).catch(function () {})
      },
      getDanhSachDoiThiTongHop () {
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
          let data = response.filter(function (item) {
            return item.khoiThiId
          })
          vm.soDoiThiThamDu = data.length
        }).catch(function () {})
      },
      exportExcel() {
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
        axios.post('/api/doanthis/' + vm.thongTinDoanThi.id + '/export', dataPost, param).then(function (response) {
          vm.loadingExport = false
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          let url = window.URL.createObjectURL(response.data)
          a.href = url
          a.download = 'DanhSachThiSinh.xlsx'
          a.click()
          window.URL.revokeObjectURL(url)
        }).catch(xhr => {
          vm.loadingExport = false
        })
      },
      exportDangKy () {
        let vm = this
        let doanThi = vm.thongTinDoanThi.tenGoi
        let diaChi = vm.thongTinToChuc.diaChiHoatDong
        let truongDoan = ''
        let phoDoan = ''
        let emailTruongDoan = ''
        let emailPhoDoan = ''
        let soDienThoaiTruongDoan = ''
        let soDienThoaiPhoDoan = ''
        if (vm.danhSachHlv.length) {
          let tp = vm.danhSachHlv.find(function (item) {
            return item.truongPhoDoan == 1
          })
          if (tp) {
            truongDoan = tp.hoTen
            emailTruongDoan = tp.email
            soDienThoaiTruongDoan = tp.soDienThoai
          }
          let pd = vm.danhSachHlv.find(function (item) {
            return item.truongPhoDoan == 2
          })
          if (pd) {
            phoDoan = pd.hoTen
            emailPhoDoan = pd.email
            soDienThoaiPhoDoan = pd.soDienThoai
          }
        }
        let dsthi1 = [].concat(vm.danhSachKhoiThi)
        let sortItems = function (items) {
          function compare(a, b) {
            if (a.countThiSinh > b.countThiSinh)
              return -1
            if (a.countThiSinh < b.countThiSinh)
              return 1
            return 0
          }
          return items.sort(compare)
        }
        dsthi1 = sortItems(dsthi1)
        dsthi1.forEach(element => {
            if (element.thiTapThe && element.thiSinhs && element.thiSinhs.length) {
                let doiThiArr = []
                element.thiSinhs.forEach(element => {
                    let doiThiIndex = doiThiArr.findIndex(function (item) {
                        return item.tenDoi == element["Đội thi"]
                    })
                    if (doiThiIndex >= 0) {
                        doiThiArr[doiThiIndex]['thiSinhs'].push(element)
                    } else {
                        doiThiArr.push(
                            {
                                tenDoi: element["Đội thi"],
                                thiSinhs: [element]
                            }
                        )
                    }
                });
                element['doiThis'] = doiThiArr
            }
        });
        console.log('dsthi1', dsthi1)
        let dataExport = []
        let stt = 0
        dsthi1.forEach(element => {
            let khoiThi = {
                "index": "",
                "hoTen": element.tenGoi,
                "doiTuongThi": "",
                "email": "",
                "soDienThoai": "",
                "nganhDaoTao": "",
                "ngaySinh": "",
                "nam": "",
                "nu": "",
                "k1": "",
                "k2": "",
                "k3": "",
                "k4": "",
                "k5": "",
                "k6": "",
                "k7": "",
                "k8": ""
            }
            dataExport.push(khoiThi)
            if (element.thiTapThe && element.doiThis && element.doiThis.length) {
                element.doiThis.forEach(elementDt => {
                    stt += 1
                    dataExport.push(
                        {
                            "index": stt,
                            "hoTen": elementDt.tenDoi,
                            "doiTuongThi": "",
                            "email": "",
                            "soDienThoai": "",
                            "nganhDaoTao": "",
                            "ngaySinh": "",
                            "nam": '',
                            "nu": '',
                            "k1": "",
                            "k2": "",
                            "k3": "",
                            "k4": "",
                            "k5": "",
                            "k6": "",
                            "k7": "",
                            "k8": ""
                        }
                    )
                    elementDt.thiSinhs.forEach(elementTs => {
                        dataExport.push(
                            {
                                "index": "",
                                "hoTen": elementTs.hoTen,
                                "doiTuongThi": elementTs.doiTuongThi ? elementTs.doiTuongThi : '',
                                "email": elementTs.email ? elementTs.email : '',
                                "soDienThoai": elementTs.soDienThoai ? elementTs.soDienThoai : '',
                                "nganhDaoTao": elementTs.nganhDaoTao ? elementTs.nganhDaoTao : '',
                                "ngaySinh": elementTs.ngaySinh ? elementTs.ngaySinh : '',
                                "nam": elementTs.gioiTinh == 0 ? 'X' : '',
                                "nu": elementTs.gioiTinh == 1 ? 'X' : '',
                                "k1": element.tenGoi == 'Khối siêu CUP' ? 'X' : '',
                                "k2": element.tenGoi == 'Khối chuyên tin' ? 'X' : '',
                                "k3": element.tenGoi == 'Khối không chuyên tin' ? 'X' : '',
                                "k4": element.tenGoi == 'Khối ICPC không chuyên tin' ? 'X' : '',
                                "k5": element.tenGoi == 'Khối phần mềm nguồn mở' ? 'X' : '',
                                "k6": element.tenGoi == 'Khối cao đẳng' ? 'X' : '',
                                "k7": element.tenGoi == 'Khối PROCON' ? 'X' : '',
                                "k8": element.tenGoi == 'Khối ICPC chuyên tin' ? 'X' : ''
                            }
                        )
                    })
                });
            } else {
                if (element.thiSinhs && element.thiSinhs.length) {
                    element.thiSinhs.forEach(elementTs => {
                        stt += 1
                        dataExport.push(
                            {
                                "index": stt,
                                "hoTen": elementTs.hoTen,
                                "doiTuongThi": elementTs.doiTuongThi ? elementTs.doiTuongThi : '',
                                "email": elementTs.email ? elementTs.email : '',
                                "soDienThoai": elementTs.soDienThoai ? elementTs.soDienThoai : '',
                                "nganhDaoTao": elementTs.nganhDaoTao ? elementTs.nganhDaoTao : '',
                                "ngaySinh": elementTs.ngaySinh ? elementTs.ngaySinh : '',
                                "nam": elementTs.gioiTinh == 0 ? 'X' : '',
                                "nu": elementTs.gioiTinh == 1 ? 'X' : '',
                                "k1": element.tenGoi == 'Khối siêu CUP' ? 'X' : '',
                                "k2": element.tenGoi == 'Khối chuyên tin' ? 'X' : '',
                                "k3": element.tenGoi == 'Khối không chuyên tin' ? 'X' : '',
                                "k4": element.tenGoi == 'Khối ICPC không chuyên tin' ? 'X' : '',
                                "k5": element.tenGoi == 'Khối phần mềm nguồn mở' ? 'X' : '',
                                "k6": element.tenGoi == 'Khối cao đẳng' ? 'X' : '',
                                "k7": element.tenGoi == 'Khối PROCON' ? 'X' : '',
                                "k8": element.tenGoi == 'Khối ICPC chuyên tin' ? 'X' : ''
                            }
                        )
                    });
                }
            }
        });
        
        let dataDoc = {
          "doanThi": doanThi,
          "diaChi": diaChi,
          "truongDoan": truongDoan,
          "soDienThoaiTruongDoan": soDienThoaiTruongDoan,
          "emailTruongDoan": emailTruongDoan,
          "phoDoan": phoDoan,
          "soDienThoaiPhoDoan": soDienThoaiPhoDoan,
          "emailPhoDoan": emailPhoDoan,
          "dsthi": dataExport
        }
        console.log('dataDoc', dataDoc)
        loadFile("http://127.0.0.1:8887/danhsachthisinh.docx", function(
          error,
          content
        ) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
          doc.setData(dataDoc);
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
            console.log(JSON.stringify({ error: error }, replaceErrors));
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
          saveAs(out, "DanhSachDuThi.docx");
        });
      },
      exportQrCode () {
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
        axios.post('/api/thisinhs/' + vm.id + '/doanthis/' + vm.thongTinDoanThi.id + '/export', dataPost, param).then(function (response) {
          vm.loadingExport = false
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          let url = window.URL.createObjectURL(response.data)
          a.href = url
          a.download = 'QrCodeThiSinh.xlsx'
          a.click()
          window.URL.revokeObjectURL(url)
        }).catch(xhr => {
          vm.loadingExport = false
        })
      },
      showThiSinhXoa () {
        let vm = this
        vm.danhSachThiSinhXoa = []
        let filter = {
          collectionName: 'cuocthis',
          collectionId: vm.id,
          collectionNameChild: 'doanthis',
          collectionChildId: vm.thongTinDoanThi.id,
          collectionNameChild2: 'thisinhs',
          data: {
            page: 1,
            size: 1000
          }
        }
        vm.$store.dispatch('collectionFilterLevel3', filter).then(function (response) {
          vm.danhSachThiSinhXoa = response.filter(function (item) {
            return !item.noiDungThi || (item.noiDungThi && item.noiDungThi.length == 0)
          })
          if (vm.danhSachThiSinhXoa.length) {
            vm.dialogDsThiSinh = true
          } else {
            toastr.success('KHÔNG CÓ THÍ SINH NÀO')
          }
        })
      },
      xoaThiSinhKhongThi () {
        let vm = this
        let arrDsThi = []
        for (let index = 0; index < vm.danhSachThiSinhXoa.length; index++) {
          let filter = {
            collectionName: 'thisinhs',
            id: vm.danhSachThiSinhXoa[index]['id']
          }
          arrDsThi.push(vm.$store.dispatch('collectionDelete', filter).then(function (result) {}))
        }
        vm.loading = true
        Promise.all(arrDsThi).then(values => {
          vm.loading = false
          toastr.remove()
          toastr.success('Xóa thí sinh thành công')
          vm.dialogDsThiSinh = false
        }).catch(function () {
          vm.loading = false
          toastr.remove()
          toastr.error('Xóa thí sinh thất bại')
        })
      },
      showDoiThiXoa () {
        let vm = this
        let filter = {
          collectionName: 'doithis',
          data: {
            doanThiId: vm.doanThiUpdate ? vm.doanThiUpdate : vm.thongTinDoanThi.id,
            cuocThiId: vm.id,
            page: 1,
            size: 10000
          }
        }
        vm.$store.dispatch('collectionFilter', filter).then(function (response) {
          let dsDoiThi = response
          if (dsDoiThi && dsDoiThi.length) {
            let filter = {
              collectionName: 'danhsachthis',
              data: {
                cuocThiId: vm.id,
                doanThiId: vm.doanThiUpdate ? vm.doanThiUpdate : vm.thongTinDoanThi.id,
                page: 1,
                size: 10000
              }
            }
            vm.$store.dispatch('collectionFilter', filter).then(function (response2) {
              let dsDangKyThi = response2
              let doiThiXoa = []
              if (dsDangKyThi && dsDangKyThi.length) {
                dsDoiThi.forEach(element => {
                  let exits = dsDangKyThi.find(function (item) {
                    return item.doiThiId == element.id
                  })
                  if (!exits) {
                    doiThiXoa.push(element)
                  }
                });
              }
              if (doiThiXoa.length) {
                vm.danhSachDoiThiXoa = doiThiXoa
                vm.dialogDoiThiXoa = true
              } else {
                toastr.success('KHÔNG CÓ ĐỘI THI NÀO')
              }
            })
          } else {
            toastr.success('KHÔNG CÓ ĐỘI THI NÀO')
          }
        })
      },
      xoaDoiThiKhongThiSinh () {
        let vm = this
        let arrDsThi = []
        for (let index = 0; index < vm.danhSachDoiThiXoa.length; index++) {
          let filter = {
            collectionName: 'doithis',
            id: vm.danhSachDoiThiXoa[index]['id']
          }
          arrDsThi.push(vm.$store.dispatch('collectionDelete', filter).then(function (result) {}))
        }
        vm.loading = true
        Promise.all(arrDsThi).then(values => {
          vm.loading = false
          toastr.remove()
          toastr.success('Xóa đội thi thành công')
          vm.dialogDoiThiXoa = false
        }).catch(function () {
          vm.loading = false
          toastr.remove()
          toastr.error('Xóa đội thi thất bại')
        })
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
      formatBirthDate () {
        let vm = this
        let lengthDate = String(vm.ngaySinhCreate).trim().length
        let splitDate = String(vm.ngaySinhCreate).split('/')
        if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
          vm.ngaySinhCreate = vm.translateDate(vm.ngaySinhCreate)
        } else if (lengthDate && lengthDate === 8) {
          let date = String(vm.ngaySinhCreate)
          vm.ngaySinhCreate = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
        } else {
          vm.ngaySinhCreate = ''
        }
      },
      convertDate (date) {
        if (!date) return ''
        const [day, month, year] = date.split('-')
        let ddd = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
        return ddd
      },
      formatDateInput (date) {
        if (!date) return ''
        const [day, month, year] = date.split('/')
        let ddd = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
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
        vm.pageDanhSachThiSinh = config.page
      },
      changePageDanhSachHlv (config) {
        let vm = this
        vm.pageDanhSachHlv = config.page
        vm.getDanhSachHlv()
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
      goToCuocThi () {
        let vm = this
        vm.$router.push({ path: '/cuoc-thi/' + vm.id})
      }
    }
  }
</script>
<style lang="scss">
  .select-thisinh .v-input__append-inner{
    display: none !important;
  }
  .nav-content {
    border-right: 1px solid #DDDDDD;
    box-sizing: border-box;
    // border-radius: 7px;
    height: 100%;
  }
  .wrap-noidung-thi .v-expansion-panel-header__icon, .table-thisinh tbody {
    display: none;
  }
  .wrap-noidung-thi .v-expansion-panel {
    border: 1px solid #dedede;
    border-radius: 0px !important;
    border-top: 0;
  }
  .wrap-noidung-thi .v-expansion-panel-header {
    background: #ebebeb;
    font-size: 14px;
    border-bottom: 1px solid #dedede;
    padding: 8px 16px;
    min-height: 48px !important;
  }
  .wrap-noidung-thi .v-expansion-panel-header .text-header {
    font-weight: 600;
    color: #2161b1;
  }
  .wrap-noidung-thi .v-expansion-panel--active + .v-expansion-panel {
    margin-top: 0px !important;
  }
  .wrap-noidung-thi .v-expansion-panel-content__wrap {
    // padding: 8px 16px;
    padding: 0px;
  }
  .wrap-noidung-thi .v-expansion-panel--active {
    margin-top: 0px !important;
  }
  .table-group-thisinh td {
    font-weight: bold;
  }
  .table-group-thisinh tbody  tr  td:nth-child(1){
    width: 5% !important;
  }
  .table-group-thisinh tbody tr td:nth-child(2){
    width: 20% !important;
  }
  .table-group-thisinh tbody > tr > td:nth-child(3){
    width: 10%;
  }
  .table-group-thisinh tbody > tr > td:nth-child(4){
    width: 10%;
  }
  .table-group-thisinh tbody > tr > td:nth-child(5){
    width: 10%;
  }
  
  .table-group-thisinh tbody > tr > td:nth-child(7){
    width: 10%;
  }
  .table-group-thisinh tbody > tr > td:nth-child(8){
    width: 15%;
  }
  .table-group-thisinh tbody > tr > td:nth-child(9){
    width: 7%;
  }
  .table-group-thisinh .v-row-group__header button {
    display: none
  }
  .table-group-thisinh .v-row-group__header .text-start {
    padding-left: 15px !important
  }
</style>