<template>
  <div class="app-container" v-loading="loading">
    <div class="heading display-flex">
      <h3>Game Info</h3>
      <el-button icon="el-icon-refresh" size="small" @click="checkGame()" v-if="!current_game.end">Refresh Results</el-button>
    </div>

    <div class="game-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <span>NoRakePrizePool</span>: <strong>{{ current_game.data.NoRakePrizePool | currency }}</strong><br />
          <span>PostRakePrizePool</span>: <strong>{{ current_game.data.PostRakePrizePool | currency }}</strong><br />
          <span>entry_total</span>: <strong>{{ current_game.data.entry_total }}</strong><br />
          <span>ticket_total</span>: <strong>{{ current_game.data.ticket_total }}</strong><br />
          <span>user_total</span>: <strong>{{ current_game.data.user_total }}</strong><br />
          <span>EstUsers</span>: <strong>{{ current_game.data.EstUsers }}</strong><br />
          <span>EstRakePerDay</span>: <strong>{{ current_game.data.EstRakePerDay | currency}}</strong>
        </el-col>
        <el-col :span="12">
          Status: <el-tag :type="current_game.end?'danger':'success'">{{ current_game.end? 'Ended': 'Running' }}</el-tag><br />
          Created At: {{ current_game.created_at | moment("YYYY-MM-DD HH:MM:SS") }}
        </el-col>
      </el-row>
    </div>

    <!-- <json-viewer :value="current_game"></json-viewer> -->
    <!-- {{current_game}} -->
    <!-- {{game_player}} -->

    <h3>Player List</h3>
    <el-table
      :data="game_player"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <json-viewer :value="props.row.data"></json-viewer>
        </template>
      </el-table-column>

      <el-table-column
        label="User ID"
        prop="user_id">
        <template slot-scope="scope">
          #{{ scope.row.user_id }}
        </template>
      </el-table-column>

      <el-table-column
        label="Total Spent">
        <template slot-scope="scope">
          {{ scope.row.data.TotalSpent? scope.row.data.TotalSpent: 0 | currency }}
        </template>
      </el-table-column>

      <el-table-column
        label="Entries">
        <template slot-scope="scope">
          {{ scope.row.data.entry_total? scope.row.data.entry_total: 0 }}
        </template>
      </el-table-column>

      <el-table-column
        label="Tickets">
        <template slot-scope="scope">
          {{ scope.row.data.ticket_total? scope.row.data.ticket_total: 0 }}
        </template>
      </el-table-column>

      <el-table-column
        label="Chance Of Winning">
        <template slot-scope="scope">
          {{ scope.row.data.ChanceOfWinning? scope.row.data.ChanceOfWinning: 0+'%' }}
        </template>
      </el-table-column>

      <el-table-column
        label="Chance Not Win">
        <template slot-scope="scope">
          {{ scope.row.data.ChanceNotWin? scope.row.data.ChanceNotWin: 0+'%' }}
        </template>
      </el-table-column>

      <el-table-column
        label="NoRakeEV">
        <template slot-scope="scope">
          {{ scope.row.data.NoRakeEV? scope.row.data.NoRakeEV: 0 }}
        </template>
      </el-table-column>

      <el-table-column
        label="PostRakeEV">
        <template slot-scope="scope">
          {{ scope.row.data.PostRakeEV? scope.row.data.PostRakeEV: 0 }}
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
import JsonViewer from 'vue-json-viewer';
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
      current_game: state => state.game.current_game,
      game_player: state => state.game.game_player
    }),

    gameId(){
      let id = this.$router.history.current.params.game_id || 0;
      return parseInt(id) || 0;
    }
  },

  mounted(){
    console.log(this.gameId)
    this.load();
  },

  methods: {
    ...mapActions({
      loadGameInfo: 'game/loadGameInfo',
      checkCurrentGame: 'game/checkGame'
    }),

    load(){
      this.loading = true;
      this.loadGameInfo(this.gameId).then( res => {
        this.loading = false;
      }).catch( error => {
        this.loading = false;
      })
    },

    checkGame(){
      let game_id = parseInt(this.gameId);
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
