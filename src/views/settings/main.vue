<template>
  <div class="app-container">
    <div class="gs-fixed">
      <h3>Game Settings</h3>

      <el-form ref="form" :model="settings" label-width="180px" label-position="left" v-loading="loading">
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
          <el-button type="primary" @click="saveChange" :loading="saving">Save Change</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import _ from 'lodash';

export default {
  data(){
    return {
      loading: false,
      saving: false,
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
      this.loading = true;
      this.loadSettings().then( res => {
        if(!_.isEmpty(res.game_settings)){
          this.settings = Object.assign({}, this.settings, res.game_settings);
        }
        this.loading = false;
      }).catch( error => {
        this.loading = false;
      });
    },

    saveChange(){
      this.saving = true;
      this.updateSettings(this.settings).then( res => {
        this.saving = false;
      }).catch( error => {
        this.saving = false;
      });
    }
  }
}
</script>
