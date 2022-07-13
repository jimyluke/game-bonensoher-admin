<template>
  <div class="inline-block">
    <el-button class="add-new-wallet-button" @click="drawer = true" type="text" icon="el-icon-postcard">Add New Wallet</el-button>
    <el-drawer
      custom-class="add-wallet-drawer"
      title="Add Wallet"
      size="95%"
      :visible.sync="drawer"
      :with-header="true"
      append-to-body>
      <div class="add-wallet-form">
        <el-form label-position="left" label-width="150px" :model="new_wallet" :rules="rules" ref="walletForm">
          <el-form-item label="Private Key" prop="private_key">
            <el-input v-model="new_wallet.private_key" placeholder="Enter Private Key" @input="checkPrivateKey" clearable></el-input>
          </el-form-item>
          <el-form-item label="Wallet Address" prop="wallet_address">
            <el-input v-model="new_wallet.wallet_address" placeholder="Enter wallet address" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="Mnemonic" prop="mnemonic">
            <el-input type="textarea" v-model="new_wallet.mnemonic" placeholder="Enter Mnemonic" @input="checkMnemonic"></el-input>
            <!-- <el-button class="check-wallet-info" type="text" v-if="new_wallet.mnemonic">Check Info</el-button> -->
          </el-form-item>
          <el-form-item label="Private key array" prop="private_key_arr">
            <el-input type="textarea" v-model="new_wallet.private_key_arr" placeholder="Enter Private Key Array" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addWallet" :loading="adding">Add Wallet</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      adding: false,
      drawer: false,
      new_wallet: {
        wallet_address: '',
        mnemonic: '',
        private_key: '',
        private_key_arr: '',
      },
      rules: {
        private_key: [
          { required: true, message: 'Please input private key', trigger: 'blur' },
          { min: 32, max: 64, message: 'Length should be 32 to 64', trigger: 'blur' }
        ],
        wallet_address: [
          { required: true, message: 'Please input wallet address', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    ...mapActions({
      checkSolanaWalletInfo: 'settings/checkSolanaWalletInfo',
      addSolanaWallet: 'settings/addSolanaWallet',
    }),


    submitAddWallet(){
      this.adding = true;
      this.addSolanaWallet({wallet_data: this.new_wallet}).then( resp => {
        console.log(resp);
        if(resp.success){
          this.$emit('on-success', true);
        }
        this.adding = false;
      }).catch( error => {
        console.log(error);
        this.adding = false;
      })
    },

    addWallet(){
      this.$refs['walletForm'].validate((valid) => {
        if (valid) {
          this.submitAddWallet();
        }
      });
    },

    checkPrivateKey: _.debounce(function(str){
      this.checkWalletInfo('private-key', str);
    },800),

    checkMnemonic: _.debounce(function(str){
      this.checkWalletInfo('mnemonic', str);
    },800),

    checkWalletInfo(type, value){
      if(value === '')
        return;

      this.checkSolanaWalletInfo({type: type, key_val: value}).then( resp => {
        const check = resp.check;
        this.new_wallet = {
          wallet_address: check.wallet || '',
          mnemonic: check.mnemonic || '',
          private_key: check.private_key || '',
          private_key_arr: check.private_key_arr || '',
        }

      }).catch( error => {
        console.log(error);
      })
    }
  }
};
</script>
