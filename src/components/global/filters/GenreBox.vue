<script setup>
const props = defineProps({
    data: {
        type: Object
    },
    active: {
        type: Boolean
    }
})

const emits = defineEmits([
    'action'
])
</script>
<template>
    <span @click="emits('action', props.data)" :class="`border-[1px] hover:bg-[#FBDA58] border-[#FBDA58] cursor-pointer select-none flex min-w-28 justify-center items-center py-[2px] text-[15px] rounded-lg duration-200 text-white hover:border-1 ${props.active ? 'bg-[#FBDA58]' : 'bg-none'}`">
        <p>{{ props.data?.name }}</p>
    </span>
</template>