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
        <el-form label-position="left" label-width="150px" :model="new_wallet">
          <el-form-item label="Wallet Address">
            <el-input v-model="new_wallet.wallet_address" placeholder="Enter wallet address"></el-input>
          </el-form-item>
          <el-form-item label="Mnemonic">
            <el-input type="textarea" v-model="new_wallet.mnemonic" placeholder="Enter Mnemonic"></el-input>
          </el-form-item>
          <el-form-item label="Private Key">
            <el-input v-model="new_wallet.private_key" placeholder="Enter Private Key"></el-input>
          </el-form-item>
          <el-form-item label="Private key array">
            <el-input type="textarea" v-model="new_wallet.private_key_arr" placeholder="Enter Private Key Array"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addWallet">Add Wallet</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      drawer: false,
      new_wallet: {
        wallet_address: '',
        mnemonic: '',
        private_key: '',
        private_key_arr: '',
      }
    };
  },

  methods: {
    addWallet(){
      console.log(this.new_wallet)
    }
  }
};
</script>
