<template>
  <div class="app-container">
    <div class="gs-fixed">
      <h3>Game Settings</h3>

      <el-form ref="form" :model="settings" label-width="180px" label-position="left">
        <el-form-item label="Game Lock">
          <el-switch v-model="settings.game_lock"></el-switch>
        </el-form-item>
        <el-form-item label="Wake percent">
          <el-input v-model="settings.wake_percent"></el-input>
        </el-form-item>
        <el-form-item label="Sleep percent">
          <el-input v-model="settings.sleep_percent"></el-input>
        </el-form-item>
        <el-form-item label="Raw rake percent">
          <el-input v-model="settings.raw_rake_percent"></el-input>
        </el-form-item>
        <el-form-item label="Percent of user paid">
          <el-input v-model="settings.percent_of_user_paid"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveChange">Save Change</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return {
      loading: false,
      settings: {
        game_lock: false,
        wake_percent: 66,
        sleep_percent: 33,
        raw_rake_percent: 33,
        percent_of_user_paid: 25,
      }
    }
  },

  mounted() {
    this.loadGameSettings();
  },

  methods: {
    ...mapActions({
      loadSettings: 'settings/loadSettings',
      updateSettings: 'settings/updateSettings'
    }),

    loadGameSettings(){
      this.loadSettings();
    },

    saveChange(){
      this.loading = true;
      this.updateSettings(this.settings).then( res => {
        this.loading = false;
      }).catch( error => {
        this.loading = false;
      });
    }
  }
}
</script>
