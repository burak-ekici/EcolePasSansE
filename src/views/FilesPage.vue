<template>
  <div class="FilesPageContainer pa-8" style="width:calc(100vw - 72px) ; min-height:100vh">
    <h2 class="mb-16">Mes Fichiers</h2>
    <Table />
  </div>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue'
import { reactive } from 'vue';
import { provide } from 'vue'
import { FileInterface } from '@/interfaces/fileInterface'

const files : FileInterface[] = reactive<FileInterface[]>([
  { name: "name1", type: "mp4", date: "14/07/2023" },
  { name: "name2", type: "docx", date: "17/07/2023" },
  { name: "name3", type: "pdf", date: "23/07/2023" },
  { name: "name4", type: "pdf", date: "14/06/2023" },
  { name: "name5", type: "pdf", date: "14/06/2023" },
  { name: "name6", type: "pdf", date: "14/06/2023" },
  { name: "name7", type: "pdf", date: "14/06/2023" },
  { name: "name8", type: "pdf", date: "14/06/2023" },
  { name: "name9", type: "pdf", date: "14/06/2023" },
  { name: "name10", type: "pdf", date: "14/06/2023" },
])

provide(/* key */ 'files', /* value */ files )
</script>