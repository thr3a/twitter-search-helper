<template>
  <div class="container">
    <div class="header">
      <h2 class="u-align-text--center">{{ message }}</h2>
      <p>Twitterの高度な検索を、より簡単に行えるツールです。</p>
    </div>
    <fieldset>
      <label for>検索ワード</label>
      <input v-model="form.keyword" type="text" autofocus="true">
      <input id="strictFlag" v-model="form.strict_flag" type="checkbox">
      <label for="strictFlag">検索ワードを""で囲む</label>
      <label for>除外ワード</label>
      <input v-model="form.exclude_keyword" type="text">
      <label for>特定ユーザーからのみ(@不要)</label>
      <input v-model="form.from" type="text">
      <input id="mediaFlag" v-model="form.media_flag" type="checkbox">
      <label for="mediaFlag">画像/動画つきのみ</label>
      <input id="linkedFlag" v-model="form.link_flag" type="checkbox">
      <label for="linkedFlag">URLつきのみ</label>
      <input id="followFlag" v-model="form.follow_flag" type="checkbox">
      <label for="followFlag">フォロー中のユーザーのみ</label>
      <input id="japanFlag" v-model="form.japan_flag" type="checkbox">
      <label for="japanFlag">日本語ツイートのみ</label>
      <input id="buzzedFlag" v-model="form.buzzed_flag" type="checkbox">
      <label for="buzzedFlag">5いいね以上のツイートのみ</label>
      <button class="p-button--positive" @click="open">
        検索！
      </button>
    </fieldset>
    <p class="u-align-text--center">
      author: <a href="https://twitter.com/amanekey" target="_blank">@amanekey</a>
    </p>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data: function () {
    return {
      form: {
        keyword: '',
        from: '',
        exclude_keyword: '',
        media_flag: false,
        follow_flag: false,
        japan_flag: true,
        buzzed_flag: false,
        strict_flag: false,
        link_flag: false
      },
      message: 'Twitter検索ヘルパー'
    }
  },
  methods: {
    open: function () {
      window.open(this.searchURL())
    },
    searchURL: function () {
      const query = []
      if (this.form.strict_flag) {
        query.push(`${encodeURIComponent('"' + this.form.keyword + '"')} OR @DoNotUseUNAME`)
      } else {
        query.push(`${encodeURIComponent(this.form.keyword)} OR @DoNotUseUNAME`)
      }
      if (this.form.exclude_keyword) {
        query.push(`-${encodeURIComponent(this.form.exclude_keyword)}`)
      }
      if (this.form.from) {
        query.push(`from:${this.form.from}`)
      }
      if (this.form.media_flag) {
        query.push('filter:media')
      }
      if (this.form.japan_flag) {
        query.push('lang:ja')
      }
      if (this.form.buzzed_flag) {
        query.push('min_faves:5')
      }
      if (this.form.link_flag) {
        query.push(encodeURIComponent('filter:links -filter:media'))
      }
      if (this.form.follow_flag) {
        query.push(`filter:follows`)
      }
      return `https://twitter.com/search?q=${query.join(' ')}`
    }
  }
}
</script>

<style>
body {
  font-family: "Hiragino Kaku Gothic ProN","メイリオ", sans-serif;
}
.container {
  margin-top: 20px;
  margin-left: 3px;
  margin-right: 3px;
}
</style>
