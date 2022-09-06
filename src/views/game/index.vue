<template>
  <div class="app-container">
    <div>Game History <el-button icon="el-icon-refresh" round size="mini" @click="load" :loading="loading">Reload</el-button></div>

    <el-table
      :data="history"
      style="width: 100%"
      v-loading="loading">
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
          <el-tooltip content="Main Pot"><strong>${{ scope.row.pot_data.main_pot.toFixed(2) }}</strong></el-tooltip> / <el-tooltip content="Bonus"><strong>${{ scope.row.pot_data.bonus.toFixed(2) }}</strong></el-tooltip>
          <!-- <span>NoRakePrizePool</span>: <strong>{{ scope.row.data.NoRakePrizePool | currency }}</strong>,
          <span>PostRakePrizePool</span>: <strong>{{ scope.row.data.PostRakePrizePool | currency }}</strong>,
          <span>entry_total</span>: <strong>{{ scope.row.data.entry_total }}</strong>,
          <span>ticket_total</span>: <strong>{{ scope.row.data.ticket_total }}</strong>,
          <span>user_total</span>: <strong>{{ scope.row.data.user_total }}</strong>,
          <span>EstUsers</span>: <strong>{{ scope.row.data.EstUsers }}</strong>,
          <span>EstRakePerDay</span>: <strong>{{ scope.row.data.EstRakePerDay | currency}}</strong> -->
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
      <el-table-column label="Action" width="150" class-name="game-actions">
        <template slot-scope="scope">
          <el-tooltip content="Check to see temporary results">
            <el-button icon="el-icon-refresh" circle size="small" @click="checkGame(scope.row.id)" v-if="!scope.row.end"></el-button>
          </el-tooltip>
          <el-tooltip content="End This Game" placement="top">
            <el-popconfirm title="Are you sure to end this game?" @confirm="endGame(scope.row.id)">
              <el-button slot="reference" icon="el-icon-cpu" round size="small" v-if="!scope.row.end">End</el-button>
            </el-popconfirm>
          </el-tooltip>
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
      loading: false
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
      checkCurrentGame: 'game/checkGame',
      endCurrentGame: 'game/endGame'
    }),

    load(){
      let self = this;
      this.loading = true;
      this.loadHistory().then( () => {
        self.loading = false;
      });
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
    },

    endGame(game_id){
      game_id = parseInt(game_id);
      this.endCurrentGame(game_id).then( res => {
        this.load();
        this.$message({
          message: 'Game Ended',
          type: 'success'
        });
      }).catch( error => {

      });
    }
  }
}
</script>
