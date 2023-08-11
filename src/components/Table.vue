<template>
  <v-table
    fixed-header
  >
    <thead >
      <tr>
        <th class="text-left  text-h6">
          Nom du fichier
        </th>
        <th class="text-left  text-h6">
          Type
        </th>
        <th class="text-left  text-h6">
          Date
        </th>
        <th class="text-left  text-h6">
          Taille
        </th>
        <th class="text-right text-h6">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="file in files"
        :key="file.name"
      >
        <td>{{ file.name }}</td>
        <td>{{ file.type }}</td>
        <td>{{ file.date }}</td>
        <td>{{ file.size || '0kb' }}</td>
        <td class="actions text-right">
    
          <div style="display:inline-block" class="iconTelechargement icons">
                <v-tooltip open-delay="1000" activator="parent" location="top"
                  >Telecharger</v-tooltip
                >
            <v-icon class="mr-2" size="large" icon="mdi-arrow-down"></v-icon>
          </div>
          <div style="display:inline-block" class="iconTelechargement icons">
                <v-tooltip open-delay="1000" activator="parent" location="top"
                  >Supprimer</v-tooltip
                >
            <v-icon class="icons deleteIcon" size="large" style="color:rgb(190, 2, 2)" icon="mdi-delete"></v-icon>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { FileInterface } from '@/interfaces/fileInterface'

const files = inject<FileInterface[]>('files')

</script>

<style scoped>
.icons{
  cursor:pointer;
}
.deleteIcon:hover{
  color:rgb(247, 43, 43) !important;
}

.iconTelechargement:hover{
  color:gray
}

</style>