<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 class="subtitle">
          Twitterの高度な検索を、より簡単に行えるツールです。
        </h2>
      </div>
      <hr>
      <div class="container">
        <div class="content">
          <div class="field">
            <label class="label">検索ワード</label>
            <div class="control">
              <input v-model="form.keyword" class="input" type="text">
              <div class="buttons">
                <a
                  v-for="(h, index) in histories"
                  :key="index"
                  v-hammer:press="()=> deleteItem(index)"
                  class="button is-light"
                  @click="setWord(h)"
                >{{ h }}</a>
                <a class="button is-warning" @click="deleteAllItems">検索履歴全削除</a>
              </div>
              <div>
                <label class="checkbox">
                  <input v-model="form.strict_flag" type="checkbox">
                  検索ワードを""で囲む
                </label>
              </div>
            </div>
          </div>

            <div class="control">
              <a @click="insertDoubleQuotation" class="button">""挿入</a>
            </div>
            <div class="control">
              <a @click="insertAnd" class="button">AND挿入</a>
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
            <label class="checkbox">
              <input v-model="form.media_flag" type="checkbox">
              画像/動画つきのみ
            </label>
          </div>

          <div class="field">
            <label class="checkbox">
              <input v-model="form.link_flag" type="checkbox">
              URLつきのみ
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
        media_flag: false,
        follow_flag: false,
        japan_flag: true,
        buzzed_flag: false,
        strict_flag: false,
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
      if (this.form.strict_flag) {
        query.push(
          `${encodeURIComponent(
            '"' + this.form.keyword + '"'
          )} OR @DoNotUseUNAME`
        )
      } else {
        query.push(
          `${encodeURIComponent(this.form.keyword)} OR @DoNotUseUNAME`
        )
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
        query.push('filter:follows')
      }
      return `https://twitter.com/search?f=live&q=${query.join(' ')}`
    },
    addItem (word) {
      this.histories.push(word)
      this.histories = Array.from(new Set(this.histories))
      this.setItems()
    },
    deleteAllItems () {
      if (window.confirm('全削除しますか？(キーワード長押しで個別削除できます)')) {
        this.histories = []
        this.setItems()
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
