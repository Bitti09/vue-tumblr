<template>
  <a-card style="width: 100%" title="Tags" v-if="tags.length > 0">
    <span v-for="tag in tags" :key="tag.index">
      <a-tag color="blue">{{ tag }}</a-tag>
    </span>
    <a-tag v-if="tags.length == 0" color="red">No tags</a-tag>
  </a-card>
</template>
<style scoped></style>
<script>
export default {
  props: ["tags"],
};
</script>
