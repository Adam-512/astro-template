<template>
  <div>
    <button @click="connect">{{ wallet.data.address||'连接钱包' }}</button>
  </div>
</template>
<script setup>
import { WalletInit } from "./connect.js";
const wallet = new WalletInit();
const connect = ()=>{
    wallet.connect()
}
</script>
