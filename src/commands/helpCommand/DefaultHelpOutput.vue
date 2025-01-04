<script setup lang="ts">
import { commandList } from '@/commands/register.js'
</script>

<template>
  <div>
    Supported commands 👇 (just for now):
  </div>
  <div class="help-output">
    <a-row :gutter="16">
      <a-col :span="2">Command</a-col>
      <a-col>Description</a-col>
    </a-row>
  </div>
  <div class="help-output" v-for="(command, index) in commandList" :key="index">
    <a-row :gutter="16">
      <a-col :span="2">{{ command.key }}</a-col>
      <a-col>{{ command.desc }}</a-col>
    </a-row>
  </div>
  <div>
    Type
    <span style="color: lime">help [xxx]</span>
     or
    <span style="color: lime">xxx --help</span>
     to get more information.
  </div>
</template>

<style scoped>
.help-output :deep(div) {
  font-family: monospace;
  color: white;
  font-size: 14px;
}
</style>
