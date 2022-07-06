<template>
  <div class="app-container">
    Game History
    <el-table
      :data="history"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <json-viewer :value="props.row.data"></json-viewer>
        </template>
      </el-table-column>
      <el-table-column
        label="#"
        prop="id">
        <template slot-scope="scope">
          <router-link :to="`/games/${scope.row.id}`">#{{ scope.row.id }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Result"
        prop="result">
      </el-table-column>
      <el-table-column
        label="Raked"
        prop="raked">
        <template slot-scope="scope">
          {{ scope.row.raked? scope.row.raked: 0 | currency }}
        </template>
      </el-table-column>
      <el-table-column
        label="Back pot"
        prop="back_pot">
        <template slot-scope="scope">
          {{ scope.row.back_pot? scope.row.back_pot: 0 | currency }}
        </template>
      </el-table-column>
      <el-table-column
        label="Thieves count"
        prop="thieves_count">
        <template slot-scope="scope">
          {{ scope.row.thieves_count? scope.row.thieves_count: 0 }}
        </template>
      </el-table-column>
      <el-table-column
        label="Status"
        prop="end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.end?'danger':'success'">{{ scope.row.end? 'Ended': 'Running' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button icon="el-icon-refresh" circle size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Created At (UTC)"
        prop="created_at">
        <template slot-scope="scope">
          {{ scope.row.created_at | moment("YYYY-MM-DD HH:MM:SS") }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from 'vuex';
import JsonViewer from 'vue-json-viewer'
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer);
Vue.use(require('vue-moment'));

export default {
  data(){
    return {

    }
  },

  computed: {
    ...mapState({
      history: state => state.game.history
    })
  },

  mounted(){
    this.load();
  },

  methods: {
    ...mapActions({
      loadHistory: 'game/loadHistory'
    }),

    load(){
      this.loadHistory();
    }
  }
}
</script>
