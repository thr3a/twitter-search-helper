<template>
  <div class="container">
    <div>
      <h1>{{ message }}</h1>
    </div>
      <label for="">検索キーワード</label>
      <input type="text" v-model="form.keyword">
      <label for="">誰から</label>
      @<input type="text" v-model="form.keyword">
      <button v-on:click='open'>検索</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data: function () {
    return {
      form: {
        keyword: 'nyaa',
        from: 'amanekey'
      },
      message: 'hello'
    }
  },
  methods: {
    open: function () {
      console.log(1)
      const k = `${encodeURIComponent(this.form.keyword)} from:${encodeURIComponent(this.form.from)}`
      const url = `https://twitter.com/search?q=${k}`
      window.open(url)
    }
  }
}
</script>

<style>
</style>
