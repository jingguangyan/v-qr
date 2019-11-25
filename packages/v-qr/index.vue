<template>
  <div class="v-qrcode-warp" :style="styles">
    <img ref="qr" :src="qrcodeImg" class="v-qrcode"/>
  </div>
</template>

<script>
import QRCode from 'qrcode'
const util = {
  downLoadImg (src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = src
      img.onload = () => {
        resolve(img)
      }
      img.onerror = error => {
        reject(error)
      }
    })
  }
}
export default {
  name: 'v-qr',
  props: {
    // type: {
    //   type: String,
    //   default: 'img',
    //   validator (value) {
    //     return ['img', 'canvas'].includes(value)
    //   }
    // },
    // imgType: {
    //   type: String
    // },
    text: {
      required: true,
      type: String,
      default: ''
    },
    logo: {
      type: String
    },
    qrcodeColor: {
      type: String,
      default: '#000000ff',
      validator (value) {
        const reg = /^#(?:[0-9a-fA-f]){3,8}$/
        return reg.test(value)
      }
    },
    backgroundColor: {
      type: String,
      default: '#ffffffff',
      validator (value) {
        const reg = /^#(?:[0-9a-fA-f]){3,8}$/
        return reg.test(value)
      }
    },
    margin: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 300
    },
    logoSize: {
      type: Number,
      default: 50
    },
    ratio: {
      type: Number,
      default: 1
    },
    level: {
      type: String,
      default: 'M',
      validator (value) {
        return ['low', 'medium', 'quartile', 'high', 'L', 'M', 'Q', 'H'].includes(value)
      }
    }
  },
  data () {
    return {
      qrcodeImg: ''
    }
  },
  computed: {
    styles () {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    },
    ratioSize () {
      return this.size * this.ratio
    },
    ratioMargin () { // margin 如果大于 size 的 1/2 则取 size 的 1/2
      return Math.min(this.ratioSize / 2, this.ratio * this.margin)
    },
    ratioQrcodeSize () {
      return (this.ratioSize - (2 * this.ratioMargin))
    },
    ratioLogoSize () {
      return Math.min(this.logoSize * this.ratio, this.ratioSize)
    },
    qrcodeDrawStringPoint () {
      return this.ratioMargin
    },
    logoDrawStringPoint () {
      return (this.ratioSize - this.ratioLogoSize) / 2
    }
  },
  watch: {
    $props: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.drawQrcode(!!this.logo)
      })
    },
    async drawQrcode (hasLogo) {
      try {
        const qrcodeUrl = await QRCode.toDataURL(this.text, {
          width: this.ratioQrcodeSize,
          margin: 0,
          scale: 1,
          level: this.level,
          color: {
            dark: this.qrcodeColor,
            light: this.backgroundColor
          }
        })
        const qrcode = await util.downLoadImg(qrcodeUrl)

        const canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.width = this.ratioSize
        canvas.height = this.ratioSize

        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(0, 0, this.ratioSize, this.ratioSize)

        ctx.drawImage(qrcode, this.qrcodeDrawStringPoint, this.qrcodeDrawStringPoint, this.ratioQrcodeSize, this.ratioQrcodeSize)
        if (hasLogo) {
          const logo = await util.downLoadImg(this.logo)
          ctx.drawImage(logo, this.logoDrawStringPoint, this.logoDrawStringPoint, this.ratioLogoSize, this.ratioLogoSize)
        }
        this.qrcodeImg = canvas.toDataURL()
      } catch (error) {
        throw error
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-qrcode-warp {
  display: inline-block;
}
.v-qrcode-warp .v-qrcode {
  display: block;
  width: 100%;
}
</style>
