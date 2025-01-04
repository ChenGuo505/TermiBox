<script setup lang="ts">

import { aliases } from '@/commands/gotoCommand/gotoUtils.ts'
</script>

<template>
  <div>
    Supported aliases 👇 (just for now):
    <div class="list-goto-output">
      <a-row :gutter="16">
        <a-col :span="2">Alias</a-col>
        <a-col>URL</a-col>
      </a-row>
    </div>
    <div class="list-goto-output" v-for="(url, alias) in aliases" :key="alias">
      <a-row :gutter="16">
        <a-col :span="2">{{ alias }}</a-col>
        <a-col>{{ url }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.list-goto-output :deep(div) {
  font-family: monospace;
  color: white;
  font-size: 14px;
}
</style>
