;(function(){

  const Tao = {

    _qq: 0,
    _name: '',
    _token: '',

    log(info) {
      console.log(`[TaoLog-${new Date().toLocaleString()}]`, info)
    },

    async get(token) {

      this._token = token

      this.log(`start fetching..`)

      const data = await this.fetchMsgListByPos(0)
      const { total, usrinfo: { name, uin } } = data

      this._qq = uin
      this._name = name

      let msgList = []
      let pos = 0

      do {
        const res = await this.fetchMsgListByPos(pos)
        msgList = msgList.concat([...res.msglist])
        pos = msgList.length
        this.log(`fetching.. [${pos}/${total}]`)
      } while (pos < 100)

      setTimeout(async () => {
        this.log(`fetching finished.`)
        this.log(msgList)
        // const likeData = await this.fetchLikeListByTid(msgList[0].tid)
        // this.log(likeData)
      }, 100)

    },

    async fetchMsgListByPos(pos) {
      return fetch(`https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?code_version=1&format=json&g_tk=${this._token}&pos=${pos}&num=40`)
        .then(res => res.json())
        .then(data => {
          return data
        })
    },

    async fetchLikeListByTid(tid) {
      return fetch(`https://user.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/user/qz_opcnt2?unikey=http://user.qzone.qq.com/${this._qq}/mood/${tid}&g_tk=${this._token}`)
        .then(res => res.text())
        .then(data => {
          try {
            return eval(data.match(/\([\s\S]*\)/)[0]).data[0].current || {}
          } catch (error) {
            this.log(`error: ${error}`)
            return {}
          }
        })
    },
  }

  window.Tao = Tao

}());

Tao.get(1611533239)

