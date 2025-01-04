<script setup lang="ts">
import { toRefs } from 'vue'

interface OutputProps {
  output: TermiBox.OutputContent
}

const props = defineProps<OutputProps>()
const { output } = toRefs(props)
</script>

<template>
  <div class="command-output">
    <component :is="{ ...output.component }" v-bind="output.props ?? {}" />
  </div>
</template>

<style scoped>
.command-output {
  font-size: 14px;
  font-family: monospace;
  color: white;
}
</style>
