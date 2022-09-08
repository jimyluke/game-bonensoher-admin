<template>
  <div class="app-container">
    <h3>Transaction List <el-button icon="el-icon-refresh" round size="mini" @click="loadData" :loading="loading">Reload</el-button></h3>
    <div class="transaction-list">
      <el-table
      :data="transactions_list"
      style="width: 100%"
      v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <json-viewer :value="scope.row.data"></json-viewer>
          </template>
        </el-table-column>
        <el-table-column
          label="#"
          prop="id" width="80">
          <template slot-scope="scope">
            <span>#{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Type" prop="type"></el-table-column>
        <el-table-column label="Amout SOL" prop="amount">
          <template slot-scope="scope">
            <strong class="money" :class="{'money-out': scope.row.type == 'prize'}">
              <span>{{ scope.row.type == 'prize'? '-': '+' }}</span>{{ scope.row.amount }}
            </strong>
          </template>
        </el-table-column>
        <el-table-column label="Description" prop="description"></el-table-column>
        <el-table-column label="Wallet Address" prop="wallet_address"></el-table-column>
        <el-table-column label="Game Playing ID" prop="game_playing_id"></el-table-column>
        <el-table-column label="Signature" prop="signature"></el-table-column>
      </el-table>
    </div>
    <div class="paging-section">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="page"
        :total="total"
        @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import JsonViewer from 'vue-json-viewer'
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer);
Vue.use(require('vue-moment'));

export default {
  data(){
    return {
      loading: false
    }
  },

  computed: {
    ...mapState({
      transactions_list: state => state.transaction.list,
      total: state => state.transaction.total,
      dataSend: state => state.transaction.dataSend,
    }),

    pageSize(){
      return this.dataSend.limit
    },

    page(){
      return this.dataSend.page
    }
  },

  mounted(){
    this.loadData();
  },

  methods: {
    ...mapActions({
      loadTransactionsData: 'transaction/loadData'
    }),

    loadData(){
      this.loading = true;
      this.loadTransactionsData().then( res => {
        this.loading = false;
      }).catch( error => {
        console.log(error)
        this.loading = false;
      });
    },

    changePage(page){
      this.$store.commit('transaction/SET_PAGE', page);
      this.loadData();
    }
  }
}
</script>
