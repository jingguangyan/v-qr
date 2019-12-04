# v-qr
QR code with logo component for Vue.js.

带logo二维码组件. 基于 [node-qrcode](https://github.com/soldair/node-qrcode)

## Examples
[Online Examples](https://jingguangyan.github.io/v-qr/)

<img src="https://jingguangyan.github.io/example-images/v-qr-example.png" width="300">

## Installation
**install with NPM**
```bash
npm i -S v-qr
```

## Usage
**Import**
```js
import Vqr from 'v-qr'
Vue.ues(Vqr)
```

**In template**
```html
<v-qr
  text=" "
  :logo="logo"
  qrcodeColor="#000000ff"
  backgroundColor="#ffffffff"
  :size="300"
  :logoSize="50"
  :margin="10"
  :ratio="1"
  level="M"
/>
```
**Props**

| Props | Description | type | Default |
| --- | --- | --- | ---- |
| text | 二维码内容 | String | " " |
| logo | 二维码中间的logo，可以传图片url和base64 | String | "" |
| size | 二维码的大小（单位： px） | Number | 300 |
| logoSize | logo的大小（单位： px） | Number | 50 |
| margin | 二维码的外边距（单位： px） | Number | 10 |
| ratio | 通过放大解决logo原图尺寸过大导致模糊的问题（1 - 3） | Number | 1 |
| qrcodeColor |  二维码的颜色，只支持16进制 | String | #000000ff |
| backgroundColor |  二维码的背景颜色，只支持16进制 | String | #ffffffff |
| level |  容错级别 ("L" \| "M" \| "Q" \| "H") | String | "M" |

**Events**

| Event name | Description | Res |
| --- | --- | --- |
| on-finish | 完成二维码生成时触发 | Image(base64) |