<script setup lang="ts">
import type { Command } from '@/commands/command'
import { getOptionStr, getUsageStr } from '@/commands/utils.ts'
import { toRefs } from 'vue'

interface Props {
  command: Command
}

const props = defineProps<Props>()
const { command } = toRefs(props)
</script>

<template>
  <div>
    <div>Command: {{ command.key }}</div>
    <div>Description: {{ command.desc }}</div>
    <div v-if="command.alias && command.alias.length > 0">
      Alias: {{ command.alias.join(', ') }}
    </div>
    <div>Usage: {{ getUsageStr(command) }}</div>
    <div v-if="command.params && command.params.length > 0">
      <div>Parameters:</div>
      <ul>
        <li v-for="(param, index) in command.params" :key="index">
          <a-row>
            <a-col :span="2">
              <span>{{ param.key }}:</span>
            </a-col>
            <a-col>
              <span>{{ param.desc }}</span>
            </a-col>
          </a-row>
        </li>
      </ul>
    </div>
    <div>
      <div>Options:</div>
      <ul>
        <li>
          <a-row>
            <a-col :span="3">
              <span>-h --help:</span>
            </a-col>
            <a-col>
              <span>Display help information.</span>
            </a-col>
          </a-row>
        </li>
        <template v-if="command.options && command.options.length > 0">
          <li v-for="(option, index) in command.options" :key="index">
            <a-row>
              <a-col :span="3">
                <span>{{ getOptionStr(option) }}:</span>
              </a-col>
              <a-col>
                <span>{{ option.desc }}</span>
              </a-col>
            </a-row>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
span {
  font-family: monospace;
}
</style>
