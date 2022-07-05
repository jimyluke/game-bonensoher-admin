<template>
  <div class="app-container">
    Game History
    <el-table
      :data="history"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>State: {{ props.row.data }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="#"
        prop="id">
      </el-table-column>
      <el-table-column
        label="Result"
        prop="result">
      </el-table-column>
      <el-table-column
        label="Raked"
        prop="raked">
      </el-table-column>
      <el-table-column
        label="Back pot"
        prop="back_pot">
      </el-table-column>
      <el-table-column
        label="Thieves count"
        prop="thieves_count">
      </el-table-column>
      <el-table-column
        label="Ended"
        prop="end">
      </el-table-column>
      <el-table-column
        label="Created At"
        prop="created_at">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
