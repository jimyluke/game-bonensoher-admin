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
        prop="id" width="80">
        <template slot-scope="scope">
          <router-link :to="`/games/${scope.row.id}`">#{{ scope.row.id }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Game Data">
        <template slot-scope="scope">
          <span>NoRakePrizePool</span>: <strong>{{ scope.row.data.NoRakePrizePool | currency }}</strong>,
          <span>PostRakePrizePool</span>: <strong>{{ scope.row.data.PostRakePrizePool | currency }}</strong>,
          <span>entry_total</span>: <strong>{{ scope.row.data.entry_total }}</strong>,
          <span>ticket_total</span>: <strong>{{ scope.row.data.ticket_total }}</strong>,
          <span>user_total</span>: <strong>{{ scope.row.data.user_total }}</strong>,
          <span>EstUsers</span>: <strong>{{ scope.row.data.EstUsers }}</strong>,
          <span>EstRakePerDay</span>: <strong>{{ scope.row.data.EstRakePerDay | currency}}</strong>
        </template>
      </el-table-column>
      <el-table-column
        label="Result"
        prop="result" width="80">
      </el-table-column>
      <el-table-column
        label="Raked"
        prop="raked" width="100">
        <template slot-scope="scope">
          {{ scope.row.raked? scope.row.raked: 0 | currency }}
        </template>
      </el-table-column>
      <el-table-column
        label="Back pot"
        prop="back_pot" width="120">
        <template slot-scope="scope">
          {{ scope.row.back_pot? scope.row.back_pot: 0 | currency }}
        </template>
      </el-table-column>
      <el-table-column
        label="Thieves count"
        prop="thieves_count" width="130">
        <template slot-scope="scope">
          {{ scope.row.thieves_count? scope.row.thieves_count: 0 }}
        </template>
      </el-table-column>
      <el-table-column
        label="Status"
        prop="end" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.end?'danger':'success'">{{ scope.row.end? 'Ended': 'Running' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="120">
        <template slot-scope="scope">
          <el-button icon="el-icon-refresh" circle size="small" @click="checkGame(scope.row.id)" v-if="!scope.row.end"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Created At (UTC)"
        prop="created_at" width="165">
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
      loadHistory: 'game/loadHistory',
      checkCurrentGame: 'game/checkGame'
    }),

    load(){
      this.loadHistory();
    },

    checkGame(game_id){
      game_id = parseInt(game_id);
      this.checkCurrentGame(game_id).then( res => {
        this.load();
        this.$message({
          message: 'Refreshed results..',
          type: 'success'
        });
      }).catch( error => {

      });
    }
  }
}
</script>
