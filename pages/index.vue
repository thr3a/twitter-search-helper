<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-2 is-12-mobile has-text-centered">
            <figure class="image is-64x64 is-inline-block">
              <img src="/icon.png" alt="">
            </figure>
          </div>
          <div class="column is-10">
            <h1 class="title">
              {{ title }}
            </h1>
            <h2 class="subtitle">
              Twitterの高度な検索を、より簡単に行えるツールです。
            </h2>
          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="content">
          <div class="field">
            <label class="label">検索ワード</label>
            <div class="control">
              <input v-model="form.keyword" class="input" type="text">
            </div>
          </div>

          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <a @click="insertDoubleQuotation" class="button">""挿入</a>
            </div>
            <div class="control">
              <a @click="insertAnd" class="button">AND挿入</a>
            </div>
            <div v-for="(h, index) in histories" :key="index" class="control">
              <a
                v-hammer:press="()=> deleteItem(index)"
                @click="setWord(h)"
                class="button is-light"
              >{{ h }}</a>
            </div>
            <a @click="deleteAllItems" class="button is-warning">検索履歴全削除</a>
          </div>

          <div class="field">
            <label class="label">除外ワード</label>
            <div class="control">
              <input v-model="form.exclude_keyword" class="input" type="text">
            </div>
          </div>

          <div class="field">
            <label class="label">特定ユーザーからのみ</label>
          </div>

          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                @
              </a>
            </p>
            <p class="control">
              <input v-model="form.from" class="input" type="text">
            </p>
          </div>

          <div class="field">
            <label class="radio">
              <input v-model="form.media_filter" type="radio" value="media">
              画像/動画つきのみ
            </label>
          </div>
          <div class="field">
            <label class="radio">
              <input v-model="form.media_filter" type="radio" value="url">
              URLつきのみ
            </label>
          </div>
          <div class="field">
            <label class="radio">
              <input v-model="form.media_filter" type="radio" value="exclude_url">
              URLつき除外
            </label>
          </div>

          <div class="field">
            <label class="checkbox">
              <input v-model="form.follow_flag" type="checkbox">
              フォローしているユーザーのみ
            </label>
          </div>

          <div class="field">
            <label class="checkbox">
              <input v-model="form.japan_flag" type="checkbox">
              日本語ツイートのみ
            </label>
          </div>

          <div class="field">
            <label class="checkbox">
              <input v-model="form.buzzed_flag" type="checkbox">
              5いいね以上のみ
            </label>
          </div>

          <div class="control">
            <button @click="open" class="button is-info">
              検索
            </button>
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        author:
        <a href="https://twitter.com/amanekey" target="_blank">@amanekey</a>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data () {
    return {
      form: {
        keyword: '',
        from: '',
        exclude_keyword: '',
        media_filter: '',
        follow_flag: false,
        japan_flag: true,
        buzzed_flag: false,
        link_flag: false
      },
      title: 'Twitter検索ヘルパー',
      histories: []
    }
  },
  mounted () {
    this.histories = JSON.parse(localStorage.getItem('items')) || []
  },
  methods: {
    open () {
      window.open(this.searchURL())
    },
    searchURL () {
      const query = []
      this.addItem(this.form.keyword)
      query.push(
        `${encodeURIComponent(this.form.keyword)} OR @DoNotUseUNAME`
      )
      if (this.form.exclude_keyword) {
        query.push(`-${encodeURIComponent(this.form.exclude_keyword)}`)
      }
      if (this.form.from) {
        query.push(`from:${this.form.from}`)
      }
      if (this.form.media_filter === 'media') {
        query.push('filter:media')
      }
      if (this.form.japan_flag) {
        query.push('lang:ja')
      }
      if (this.form.buzzed_flag) {
        query.push('min_faves:5')
      }
      if (this.form.media_filter === 'url') {
        query.push(encodeURIComponent('filter:links -filter:media'))
      }
      if (this.form.media_filter === 'exclude_url') {
        query.push('-filter:links')
      }
      if (this.form.follow_flag) {
        query.push('filter:follows')
      }
      return `https://twitter.com/search?f=live&q=${query.join(' ')}`
    },
    addItem (word) {
      if (word.length > 1) {
        this.histories.push(word)
        this.histories = Array.from(new Set(this.histories))
        this.setItems()
      }
    },
    deleteAllItems () {
      if (window.confirm('全削除しますか？(キーワード長押しで個別削除できます)')) {
        this.histories = []
        this.setItems()
        this.form.keyword = ''
      }
    },
    deleteItem (index) {
      this.histories.splice(index, 1)
      this.setItems()
    },
    setItems () {
      localStorage.setItem('items', JSON.stringify(this.histories))
    },
    setWord (word) {
      this.form.keyword = word
    },
    insertDoubleQuotation () {
      this.form.keyword += ' ""'
    },
    insertAnd () {
      this.form.keyword += ' AND '
    }
  }
}
</script>
