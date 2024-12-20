<script setup>
import { SearchBar } from '@/components';
import router from '@/router';
import { computed, onMounted, ref } from 'vue';

const search = ref('')

const emits = defineEmits([
  'search'
])
const getSearch = (data) => {
  search.value = data
  emits('search', search.value)
}
</script>
<template>
<header class="w-full flex justify-between p-5 absolute z-[99999]">
    <div @click="router.push('/')" class="w-44 h-16 relative cursor-pointer rounded-2xl">
  <img class="w-full h-full object-cover absolute" src="@/assets/images/icons/cinemapIcon.png" alt="">
</div>

   <SearchBar @search="getSearch" class="right-5" />

</header>
</template>
