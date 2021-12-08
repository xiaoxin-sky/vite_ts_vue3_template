<script setup lang="ts">
import { get } from '@/util/request'
import { ref } from 'vue'

const name = ref('gkoudai')
const fetchData = async () => {
  console.log('发起请求')
  try {
    const res = await get<string>({ url: '/api', params: { a: 1 } })
    console.log(res)
  } catch (error) {
    console.log('获取数据错误', error as Error)
  }
}
</script>

<template>
  <h1>hello {{ name }}-vite!</h1>
  <button @click="fetchData">获取数据</button>
</template>

<style lang="scss"></style>
