<template>
  <div class="app-container" v-loading="loading">
    <h3>Game Info</h3>
    <json-viewer :value="current_game"></json-viewer>
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
      loadGameInfo: 'game/loadGameInfo'
    }),

    load(){
      this.loading = true;
      this.loadGameInfo(this.gameId).then( res => {
        this.loading = false;
      }).catch( error => {
        this.loading = false;
      })
    }
  }
}
</script>
