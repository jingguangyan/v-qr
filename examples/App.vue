<template>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <div class="app">
    <v-qr
      style="border: 1px solid #ccc; margin: 0 auto;"
      :text="text"
      :logo="logo"
      :qrcodeColor="qrcodeColor"
      :backgroundColor="backgroundColor"
      :size="size"
      :logoSize="logoSize"
      :margin="margin"
      :ratio="ratio"
      :level="level"
      @on-finish="onFinish"
    />
    <ul class="qrcode-option-control">
      <li>
        <label><b>text:</b></label>
        <p>
          <input type="text" v-model="text">
        </p>
      </li>

      <li>
        <label><b>logo:</b></label>
        <p>
          <input type="checkbox" v-model="hasLogo"/>
        </p>
      </li>

      <li>
        <label><b>size:</b></label>
        <p>
          <input type="number" :min="0" v-model.number="size">
        </p>
      </li>

      <li>
        <label><b>logoSize:</b></label>
        <p>
          <input type="number" :min="0" v-model.number="logoSize">
        </p>
      </li>

      <li>
        <label><b>margin:</b></label>
        <p>
          <input type="number" :min="0" v-model.number="margin">
        </p>
      </li>

      <li>
        <label><b>ratio:</b></label>
        <p>
          <select v-model="ratio">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
          </select>
        </p>
      </li>

      <li>
        <label><b>level:</b></label>
        <p>
          <select v-model="level">
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </p>
      </li>

      <li>
        <label><b>qrcodeColor:</b></label>
        <p>
          <input type="color" v-model="qrcodeColor">
          {{qrcodeColor}}
        </p>
      </li>

      <li>
        <label><b>bgColor:</b></label>
        <p>
          <input type="color" v-model="backgroundColor">
          {{backgroundColor}}
        </p>
      </li>

    </ul>
  </div>
</template>
<script>
import logo from './assets/logo.png'
export default {
  data () {
    return {
      text: 'v-qr',
      logo: logo,
      qrcodeColor: '#000000',
      backgroundColor: '#ffffff',
      size: 300,
      logoSize: 50,
      margin: 20,
      ratio: 1,
      level: 'M',
      hasLogo: true
    }
  },
  watch: {
    hasLogo (val) {
      if (val) this.logo = logo
      else this.logo = ''
    }
  },
  methods: {
    onFinish (image) {
      console.log(image)
    }
  }
}
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .app {
    margin-top: 20px;
  }

  .qrcode-option-control {
    list-style: none;
    width: 300px;
    margin: 0 auto;
  }
  .qrcode-option-control li {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .qrcode-option-control li label{
    display: inline-block;
    width: 120px;
  }
  .qrcode-option-control li p {
    flex: 1;
  }

  .qrcode-option-control li input[type="text"],
  .qrcode-option-control li input[type="number"],
  .qrcode-option-control li select {
    width: 100%;
  }
</style>
