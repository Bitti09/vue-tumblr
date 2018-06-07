<template>
<a-card
  hoverable
    style="width: 25rem">
  <img
    alt="example"
    v-img:name
    :src="imgSrc"
    slot="cover"
    style="height: 15rem"/>
      <small >Image  {{index1+1}} of {{index2}}</small>
</a-card>
</template>
<style scoped>
.card-body {
  padding: 0;
}
.card-body2 {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}
.card-footer2 {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.card-img-top {
  max-width: 25rem;
  max-height: 15rem;
  height: 15rem;
}
</style>
<script>
export default {
  props: ["img-src", "index2", "index1"]
};
</script>
