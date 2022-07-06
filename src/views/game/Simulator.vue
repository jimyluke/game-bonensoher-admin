<template>
  <div class="app-container">
    <el-button type="primary" @click="initNewGameAll" :loading="creating">Init New Game All User</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      creating: false
    }
  },

  methods: {
    initNewGameAll(){
      this.creating = true;
      this.$store.dispatch('game/initNewGameAll').then( res => {
        this.creating = false;
        this.$notify({
          title: 'Success',
          message: 'Create new game for all user success!',
          type: 'success'
        });
      }).catch( error => {
        this.creating = false;
      })
    }
  }
}
</script>
