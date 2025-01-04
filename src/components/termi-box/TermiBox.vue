<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { doExecute } from '@/commands/executor.ts'
import CommandOutput from '@/components/termi-box/CommandOutput.vue'

const input = ref('')
const outputList = ref<TermiBox.OutputContent[]>([])
const arrow = ref('❯❯')
const prompt = ref(' ~ $')
const termiBoxInnerRef = ref()
const termiBoxInputRef = ref()

const isRunning = ref(false)

/**
 * Get the style of a tag.
 * @param status The status of the tag.
 * @returns The style of the tag.
 */
const tagStyle = (status?: string) => {
  if (!status) {
    return { color: 'dodgerblue' }
  }
  switch (status) {
    case 'info':
      return { color: 'dodgerblue' }
    case 'success':
      return { color: 'lime' }
    case 'warning':
      return { color: 'yellow' }
    case 'error':
      return { color: 'red' }
    case 'system':
      return { color: 'purple' }
    default:
      return { color: 'dodgerblue' }
  }
}

/**
 * Execute a command.
 * @param text The command to be executed.
 * @returns void
 */
const executeCommand = async (text: string) => {
  if (!text) {
    return
  }
  await doExecute(text, terminal)
}

/**
 * Focus on the input.
 * @returns void
 */
const focus = () => {
  termiBoxInputRef.value.focus()
}

/**
 * Submit the command.
 * @returns void
 */
const submit = () => {
  isRunning.value = true
  const command = input.value
  input.value = ''
  outputList.value.push({ text: command, logText: [] })
  executeCommand(command)
  isRunning.value = false
  setTimeout(() => {
    termiBoxInnerRef.value.scrollTop = termiBoxInnerRef.value.scrollHeight
    focus()
  }, 50)
}

/**
 * Clear the terminal.
 * @returns void
 */
const clear = () => {
  outputList.value = []
}

/**
 * Output the result of a command.
 * @param outputComponent The component to be output.
 * @param props The props of the component.
 * @returns void
 */
const outputResult = (outputComponent: object, props?: object) => {
  outputList.value[outputList.value.length - 1].status = 'success'
  outputList.value[outputList.value.length - 1].props = props
  outputList.value[outputList.value.length - 1].component = outputComponent
}

/**
 * Output an info text.
 * @param text The text to be output.
 * @returns void
 */
const outputInfoText = (text: string) => {
  outputList.value[outputList.value.length - 1].status = 'success'
  outputList.value[outputList.value.length - 1].logText!.push({ status: 'info', text })
}

/**
 * Output a success text.
 * @param text The text to be output.
 * @returns void
 */
const outputSuccessText = (text: string) => {
  outputList.value[outputList.value.length - 1].status = 'success'
  outputList.value[outputList.value.length - 1].logText!.push({ status: 'success', text })
}

/**
 * Output a warning text.
 * @param text The text to be output.
 * @returns void
 */
const outputWarningText = (text: string) => {
  outputList.value[outputList.value.length - 1].status = 'success'
  outputList.value[outputList.value.length - 1].logText!.push({ status: 'warning', text })
}

/**
 * Output an error text.
 * @param text The text to be output.
 * @returns void
 */
const outputErrorText = (text: string) => {
  outputList.value[outputList.value.length - 1].status = 'error'
  outputList.value[outputList.value.length - 1].logText!.push({ status: 'error', text })
}

/**
 * Output a system text.
 * @param text The text to be output.
 * @returns void
 */
const outputSystemText = (text: string) => {
  outputList.value[outputList.value.length - 1].status = 'success'
  outputList.value[outputList.value.length - 1].logText!.push({ status: 'system', text })
}

const terminal: TermiBox.Terminal = {
  clear,
  outputResult,
  outputInfoText,
  outputSuccessText,
  outputWarningText,
  outputErrorText,
  outputSystemText,
}

onMounted(() => {
  outputList.value.push({
    component: defineAsyncComponent(() => import('@/components/termi-box/TermiBoxHeader.vue')),
  })
})
</script>

<template>
  <div class="termi-box-wrapper" @click="focus">
    <div ref="termiBoxInnerRef" class="termi-box">
      <div v-for="(output, outputIndex) in outputList" :key="outputIndex">
        <div class="termi-box-row command-output" v-if="output.text !== undefined">
          <span class="prefix">
            <span style="user-select: none; margin-right: 4px; color: cyan">
              <span style="color: lime">{{ arrow }}</span>
              {{ prompt }}&nbsp;
            </span>
          </span>
          <span>{{ output.text }}</span>
        </div>
        <div class="command-output" v-if="output.logText">
          <div class="termi-box-row" v-for="(text, index) in output.logText" :key="index">
            <span :style="tagStyle(text.status)">[{{ text.status }}]&nbsp;</span>
            <span>{{ text.text }}</span>
          </div>
        </div>
        <CommandOutput :output v-if="output.component" />
      </div>
      <div class="termi-box-row" v-if="!isRunning">
        <a-input
          v-model:value="input"
          style="width: 1200px"
          ref="termiBoxInputRef"
          class="command-input"
          :bordered="false"
          :autofocus="true"
          @pressEnter="submit"
        >
          <template #prefix>
            <span style="user-select: none; color: cyan">
              <span style="color: lime">{{ arrow }}</span>
              {{ prompt }}&nbsp;
            </span>
          </template>
        </a-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.termi-box-wrapper {
  background: #111111;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: monospace;
}

.termi-box {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
}

.termi-box-row {
  color: white;
  font-size: 14px;
  line-height: 14px;
  height: 30px;
  display: flex;
  align-items: center;
}

.command-input {
  padding: 0;
}

.command-input :deep(span) {
  color: white;
  font-family: monospace;
  font-size: 14px;
}

.command-input :deep(input) {
  color: white;
  font-family: monospace;
  font-size: 14px;
}
</style>
