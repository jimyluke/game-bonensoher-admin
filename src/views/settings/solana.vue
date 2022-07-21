<template>
  <div class="app-container solana">
    <h1>Solana</h1>
    <div class="settings-wrapper">
      <el-row class="basic-settings" :gutter="20">
        <el-col :span="12">
          <label>Node Type</label>
          <el-select v-model="solana_settings.node_type" placeholder="Select" size="small" @change="updateSettings">
            <el-option
              v-for="type in node_types"
              :key="type"
              :label="type"
              :value="type">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <label>Exchange rate (1Sol = )</label>
          <el-input
            class="ex-rate"
            placeholder="Please input rate"
            v-model="solana_settings.sol_usd_rate" size="small"
            :readonly="solana_settings.auto_update_rate">
            <template slot="prepend">$</template>
          </el-input>
          <el-checkbox v-model="solana_settings.auto_update_rate" @change="updateSettings">Auto Update</el-checkbox>
          <span class="description" v-if="solana_settings.auto_update_rate">(Updated every minute)</span>
        </el-col>
      </el-row>

      <el-row class="wallets">
        <h3>
          <span>Wallets</span>
          <SolanaAddWalletDrawer @on-success="load" />
          <el-popconfirm
            confirm-button-text='OK'
            cancel-button-text='No, Thanks'
            icon="el-icon-info"
            icon-color="green"
            title="Are you sure to create a wallet?"
            @confirm="generateWallet"
          >
            <el-button class="generate-wallet-button" slot="reference" type="text" icon="el-icon-refresh">Generate Wallet</el-button>
          </el-popconfirm>
        </h3>
        <div class="wallets-list" v-loading="loading">
          <el-table
            :data="wallets_data_bl"
            stripe
            style="width: 100%">
            <el-table-column
              prop="wallet_address"
              label="Wallet Address">
              <template slot-scope="scope">
                <span class="wallet-address">{{ scope.row.wallet_address }}</span>
                <el-button type="text" @click="makePrimary(scope.row.id)" size="small" v-if="!scope.row.is_primary">Make Primary</el-button>
                <el-tag v-else>Primary</el-tag>
              </template>
            </el-table-column>

            <el-table-column
              label="Balance (Sol)" width="150">
              <template slot-scope="scope">
                <span v-if="checking"><i class="el-icon-loading"></i></span><span v-else>{{ scope.row.balance }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="Pravate Key" width="180">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  title="Wallet Private Information"
                  width="460"
                  trigger="click">
                  <json-viewer :value="walletInfo(scope.row)"></json-viewer>
                  <el-button slot="reference" type="text">
                    <img src="@/assets/images/eyes.svg" />
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column
              label="Created At (UTC)"
              prop="created_at" width="185">
              <template slot-scope="scope">
                {{ scope.row.created_at | moment("YYYY-MM-DD HH:MM:SS") }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import JsonViewer from 'vue-json-viewer';
Vue.use(JsonViewer);
Vue.use(require('vue-moment'));
import { mapActions, mapState, mapGetters } from 'vuex';
import SolanaAddWalletDrawer from './components/SolanaAddWalletDrawer.vue';

export default {
  data(){
    return {
      node_types: ['mainnet-beta', 'testnet', 'devnet'],
      solana_settings: {
        node_type: 'testnet',
        sol_usd_rate: '',
        auto_update_rate: true
      },
      checking: false,
      loading: false,
      generating: false,
      setting_primary: false
    }
  },

  filters: {
    private_info(val){
      if(!_.isEmpty(val)){
        return {
          mnemonic: val.mnemonic,
          private_key: val.private_key,
          private_key_arr: val.private_key_arr
        }
      }
      return val;
    }
  },

  components: {
    SolanaAddWalletDrawer
  },

  computed: {
    ...mapState({
      wallets_data: state => state.settings.solana.wallets
    }),

    ...mapGetters({
      wallets_data_bl: 'settings/solanaWallets'
    })
  },

  mounted(){
    this.load();
    this.checkBalanceWallets();
  },

  methods: {
    ...mapActions({
      updateSolanaSettings: 'settings/updateSolanaSettings',
      generateSolanaWallet: 'settings/generateSolanaWallet',
      loadWallets: 'settings/loadSolanaWallets',
      getBalanceWallets: 'settings/getSolanaBalanceWallets',
      setPrimaryWallet: 'settings/setPrimaryWallet',
    }),

    checkBalanceWallets(){
      this.checking = true;
      this.getBalanceWallets().then( resp => {
        this.checking = false;
      }).catch( error => {
        this.checking = false;
      });
    },

    updateSettings(){
      if(!this.solana_settings.auto_update_rate && this.solana_settings.sol_usd_rate === ''){
        return;
      }

      this.updateSolanaSettings(this.solana_settings).then( resp => {
        //console.log(resp);
        this.$notify({
          title: 'Success',
          message: 'Settings updated!',
          type: 'success'
        });

        this.load();
        this.checkBalanceWallets();
      }).catch( error => {
        console.log(error);
      });
    },

    walletInfo(item){
      return this.$options.filters.private_info(item);
    },

    generateWallet(){
      this.generating = true;
      this.generateSolanaWallet().then(resp => {
        console.log(resp);
        this.generating = false;
        this.load();
      }).catch( error => {
        console.log(error);
        this.generating = false;
      })
    },

    load(){
      this.loading = true;
      this.loadWallets().then( resp => {
        //console.log(resp.settings);
        if(resp.settings){
          this.solana_settings = resp.settings;
        }
        this.loading = false;
      }).catch(error => {
        console.log(error);
        this.loading = false;
      })
    },

    makePrimary(id){
      id = parseInt(id);
      this.setting_primary = true;
      this.setPrimaryWallet(id).then( resp => {
        console.log(resp)
        this.setting_primary = false;
        this.load();
      }).catch( error => {
        console.log(error)
        this.setting_primary = false;
      })
    }
  }
}
</script>

<style lang="scss">
.solana{
  .basic-settings{
    label{
      margin-right: 10px;
    }
  }

  .ex-rate{
    width: 135px;
    margin-right: 10px;
  }

  .description{
    color: #999;
    font-size: 13px;
  }

  .add-new-wallet-button{
    margin-left: 10px;
  }

  .generate-wallet-button{
    margin-left: 20px;
  }

  span.wallet-address{
    display: inline-block;
    margin-right: 10px;

    &+.el-button{
      margin: 0;
      padding: 0;
    }
  }
}
</style>
