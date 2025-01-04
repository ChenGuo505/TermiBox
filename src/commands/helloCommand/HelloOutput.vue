<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Props {
  color: string
}
const props = defineProps<Props>()
const { color } = toRefs(props)
const style = computed(() => {
  return {
    lineHeight: '14px',
    color: color.value
  }
})
</script>

<template>
  <div>
    <pre :style="style">
    __  __          __    __               _       __                   __       __    __
   / / / /  ___    / /   / /  ____        | |     / /  ____    _____   / /  ____/ /   / /
  / /_/ /  / _ \  / /   / /  / __ \       | | /| / /  / __ \  / ___/  / /  / __  /   / /
 / __  /  /  __/ / /   / /  / /_/ /       | |/ |/ /  / /_/ / / /     / /  / /_/ /   /_/
/_/ /_/   \___/ /_/   /_/   \____/        |__/|__/   \____/ /_/     /_/   \__,_/   (_)
    </pre>
  </div>
</template>

<style scoped></style>
