;(function(){

  const pageSize = 40
  const boardPageSize = 20

  const Tao = {

    _qq: 0,
    _name: '',
    _token: '',
    _binary: [],
    _other: 0,
    _error: [],

    log(info) {
      console.log(`[TaoLog-${new Date().toLocaleString()}]`, info)
    },

    getGTK(str) {
      let hash = 5381
      for (let i = 0, len = str.length; i < len; ++i) {
        hash += (hash << 5) + str.charAt(i).charCodeAt()
      }
      return hash & 0x7fffffff
    },

    async get(other) {

      const p_skey = document.cookie.split(';').find(s => s.includes('p_skey'))
      const token = (p_skey && p_skey.includes('=')) ? this.getGTK(p_skey.split('=').reverse()[0]) : ''

      if (!token) {
        this.log('未检测到合法 g_tk 值，请联系开发者')
        return
      }

      this._token = token
      this._other = other

      this.log(`Init data..`)

      const data = await this.fetchMsgListByPos(0)
      const { total, usrinfo: { name, uin } } = data

      this.log(`Start fetching..`)

      this._qq = uin
      this._name = name

      let msgList = []
      let pos = 0

      const boardData = await this.fetchBoardListByPos(0)
      const { data: { total: boardTotal } } = boardData

      let boardList = []
      let boardPos = 0

      do {
        const res = await this.fetchMsgListByPos(pos)
        msgList = msgList.concat([...(res.msglist || [])])
        pos += pageSize
        this.log(`Fetching.. 【抓取说说记录】 [${msgList.length}/${total}]`)
      } while (pos < (total + pageSize))

      if (!msgList.length) this.log('未检测到说说记录')


      do {
        const res = await this.fetchBoardListByPos(boardPos)
        boardList = boardList.concat([...(res.data.commentList || [])])
        boardPos += boardPageSize
        this.log(`Fetching.. 【抓取留言板记录】 [${boardList.length}/${boardTotal}]`)
      } while (boardPos < (boardTotal + boardPageSize))

      if (!boardList.length) this.log('未检测到留言板记录')


      if (msgList.length + boardList.length === 0) return

      setTimeout(async () => {
        await this.handleMsgListAndBoardList(msgList, boardList)
      }, 100)

    },

    async fetchMsgListByPos(pos) {
      return fetch(`https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?code_version=1&format=json&g_tk=${this._token}&pos=${pos}&num=${pageSize}${this._other? `&uin=${this._other}` : ''}`)
        .then(res => res.json())
        .then(data => data)
    },

    async fetchBoardListByPos(pos) {
      return fetch(`https://user.qzone.qq.com/proxy/domain/m.qzone.qq.com/cgi-bin/new/get_msgb?hostUin=${(this._other || this._qq)}&num=${boardPageSize}&start=${pos}&inCharset=utf-8&outCharset=utf-8&format=json&g_tk=${this._token}`)
        .then(res => res.json())
        .then(data => data)
    },

    async fetchLikeListByTid(tid) {
      return fetch(`https://user.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/user/qz_opcnt2?unikey=http://user.qzone.qq.com/${this._other || this._qq}/mood/${tid}&g_tk=${this._token}`)
        .then(res => res.text())
        .then(data => {
          try {
            return eval(data.match(/\([\s\S]*\)/)[0]).data[0].current || {}
          } catch (error) {
            this.log(`${error}`)
            return {}
          }
        })
    },

    async fetchBinary(url) {
      return fetch(url)
        .then(res => res.arrayBuffer())
        .then((buffer) => {
          try {
            return window.btoa([].slice.call(new Uint8Array(buffer)).map(bin => String.fromCharCode(bin)).join(''))
          } catch (error) {
            this.log(`${error}`)
            return {}
          }
        })
    },

    async fetchAvatarBase64(qq) {
      const url = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`
      const size = 200

      return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.setAttribute('crossOrigin', 'Anonymous')
        img.src = url
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, size, size)
          const base64 = canvas.toDataURL('image/jpeg', 1).replace('data:image/jpeg;base64,', '')
          resolve(base64)
        }
        img.onerror = (error) => {
          reject(error)
        }
      })
    },

    handlePicOrVideo(list, tid) {
      return list.map((item, index) => {
        const { url1, url2, url3 } = item
        const url = (url3 || url2 || url1).replace('http://', 'https://')
        const suffix = url.includes('.mp4') ? '.mp4' : '.jpeg'
        const name = `${tid}-${index}${suffix}`
        this._binary.push({
          name,
          url,
        })
        return name
      })
    },

    async handleMsgListAndBoardList(msgList, boardList) {

      const taoList = []
      const friendMap = {}
      const all = msgList.length

      friendMap[this._qq] = this._name

      const boardListJSONStr = JSON.stringify(boardList)
      boardList.forEach(b => {
        const { uin, nickname, replyList } = b
        if (uin && nickname) friendMap[uin] = nickname
        ;(replyList || []).forEach(r => {
          const { _uin, _nick } = r
          if (_uin && _nick) friendMap[uin] = nickname
        })
      })

      if (msgList.length) {
        let msgIndex = 0
        do {
          const msg = msgList[msgIndex]
          const {
            tid,
            content,
            created_time,
            lbs,
            source_name,
            pic,
            video,
            commentlist,
            rt_con,
            rt_createTime,
            rt_source_name,
            rt_uin,
            rt_uinname,
          } = msg

          // qq in comment and subComment
          ;(commentlist || []).forEach(c => {
            if (!friendMap[c.uin]) friendMap[c.uin] = c.name
              ;(c.list_3 || []).forEach(({ uin, name }) => {
                if (uin && name && !friendMap[uin]) friendMap[uin] = name
              })
          })

          // qq in repost
          if (rt_uin && rt_uinname && !friendMap[rt_uin]) {
            friendMap[rt_uin] = rt_uinname
          }

          const likeList = []
          const like = await this.fetchLikeListByTid(tid)
          const { likedata, newdata } = like
          // qq in likeList
          if (likedata && likedata.list) {
            likedata.list.forEach(l => {
              const [qq, name] = l
              if (!friendMap[qq]) friendMap[qq] = name
              likeList.push(qq)
            })
          }

          if (!taoList.find(tao => tao.tid === tid)) {
            taoList.push({
              tid,
              content,
              created_time,
              lbs,
              source_name,
              pic: this.handlePicOrVideo(pic || [], tid),
              video: this.handlePicOrVideo(video || [], tid),
              commentlist,
              likeList,
              likeSelf: likedata ? Boolean(likedata.ilike) : false,
              likeCount: likedata ? likedata.cnt || 0 : 0,
              personRead: newdata ? (newdata.PRD || 0) : 0,
              repost: {
                content: rt_con ? (rt_con.content || '') : '',
                created_time: rt_createTime,
                source_name: rt_source_name,
                qq: rt_uin,
              }
            })
          }

          msgIndex++

          this.log(`Handling likeList.. 【抓取点赞记录】 [${msgIndex}/${all}]`)
        } while (msgIndex < all)
      }

      // qq in atString
      const taoListJSONStr = JSON.stringify(taoList)
      taoListJSONStr
        .split(/@\{|\}/)
        .filter(s => s.includes('uin:') && s.includes('nick:'))
        .forEach(s => {
          const qq = (s.match(/[0-9]*/g) || []).find(s => s !== '')
          const name = (s.split('nick:')[1] || '').split(',who')[0]
          if (qq && name && !friendMap[qq]) friendMap[qq] = name
        })

      const zip = new JSZip()
      const docName = `user_data_${this._other || this._qq}`
      const folder = zip.folder(docName)

      // zip pic and video
      if (this._binary.length) {
        let binaryIndex = 0
        do {
          const binary = this._binary[binaryIndex]
          const { name, url } = binary
          this.log(`Handling ${name.endsWith('.mp4') ? 'a video' : 'an image'}.. 【抓取图片、视频】 [${binaryIndex+1}/${this._binary.length}]`)
          try {
            const buff = await this.fetchBinary(url)
            await folder.file(`media/${name}`, buff, { base64: true })
          } catch(error) {
            this.log(`${error} - media/${name} fetch failed.`)
            this._error.push(`media/${name} => ${url}`)
          }
          binaryIndex++
        } while (binaryIndex < this._binary.length)
      }

      // zip avatar
      const qqList = Object.keys(friendMap)
      if (qqList.length) {
        let avatarIndex = 0

        do {
          const qq = qqList[avatarIndex]
          this.log(`Handling avatar of ${qq}.. 【抓取头像】 [${avatarIndex + 1}/${qqList.length}]`)
          try {
            const base64 = await this.fetchAvatarBase64(qq)
            await folder.file(`avatar/${qq}.jpeg`, base64, { base64: true })
          } catch(error) {
            this.log(`${error} - avatar/${name} fetch failed.`)
            this._error.push(`avatar/${qq}.jpeg => https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`)
          }
          avatarIndex++
        } while (avatarIndex < qqList.length)
      }

      // zip emoji
      let emojis = []
      const _emojis = (taoListJSONStr + boardListJSONStr).match(/\[em\]e[0-9]*\[\/em\]/gi)
      if (_emojis && _emojis.length) {
        _emojis.forEach(emoji => {
          const e = emoji.replace('[em]', '').replace('[/em]', '')
          if (!emojis.includes(e)) emojis.push(e)
        })
      }
      if (emojis.length) {
        let emojiIndex = 0
        do {
          const emoNo = emojis[emojiIndex]
          const url = `https://qzonestyle.gtimg.cn/qzone/em/${emoNo}@2x.gif`
          this.log(`Handling emoji of ${emoNo}.. 【抓取表情包】 [${emojiIndex + 1}/${emojis.length}]`)
          try {
            const buff = await this.fetchBinary(url)
            await folder.file(`emoji/${emoNo}.gif`, buff, { base64: true })
          } catch (error) {
            this.log(`${error} - emoji/${emoNo} fetch failed.`)
            this._error.push(`emoji/${emoNo}.gif => ${url}`)
          }
          emojiIndex++
        } while (emojiIndex < emojis.length)
      }

      const metaEl = document.querySelector('meta[name="description"]')
      const description = metaEl ? metaEl.getAttribute('content') : ''

      // zip data
      folder.file(`data/data.json`, JSON.stringify(msgList))
      folder.file(`data/data.board.json`, boardListJSONStr)
      folder.file(`data/boardList.js`, 'const boardList = ' + boardListJSONStr)
      folder.file(`data/taoList.js`, 'const taoList = ' + taoListJSONStr)
      folder.file(`data/friendMap.js`, 'const friendMap = ' + JSON.stringify(friendMap))
      folder.file(`data/error.txt`, this._error.join('\n'))
      folder.file(`data/config.js`, `
const config = {
  title: '${this._other || encodeURIComponent(document.title)}',
  description: '${this._other || encodeURIComponent(description)}',
  qq: ${this._other || this._qq},
  name: '${this._other || encodeURIComponent(this._name)}',
  hide: [
    '603******************700',
  ],
  alias: {
    '3210123456': '张三',
  },
  blacklist: [
    3210123456,
  ]
}
`)

      this.log(`Preparing to download, please wait a moment..`)

      zip
        .generateAsync({ type: 'blob' })
        .then((content) => {
          saveAs(content, `${docName}.zip`)
          this.log(`Congratulation! Dear ${this._name}, the file has been downloaded!`)

          this._qq = 0
          this._name = ''
          this._token = ''
          this._binary = []
          this._other = 0
          this._error = []
        })
    },
  }

  window.Tao = Tao
  console.clear()
  Tao.log('Tao is ready.')
  
}());
