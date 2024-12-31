<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isFullscreen = ref(false);
const domain = ref('')
function handleZoom() {
    // Implement zoom functionality
}

function handleClose() {
    // Implement close functionality
}

function handlePin() {
    // Implement pin functionality
}

function handleFullscreen() {
    isFullscreen.value = !isFullscreen.value;
    if (isFullscreen.value) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
</script>
<template>
    <div class="container">
         Hello world
    </div>
</template>

<style lang="scss" scoped>
   
  
</style>