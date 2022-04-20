<template>
  <div>
    <button @click="connect">{{ wallet.data.address||'连接钱包' }}</button>
    <p class="text-center text-red-400">123</p>
  </div>
</template>
<script setup>
import { WalletInit } from "./connect.js";
const wallet = new WalletInit();
const connect = ()=>{
    wallet.connect()
}
</script>
