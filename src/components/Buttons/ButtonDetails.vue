<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  postID: {
    type: String,
    required: true
  }
});
const emit = defineEmits();
const router = useRouter();

const goToPostDetail = () => {
  router.push(`/PostDetail/${props.postID}`);
};
</script>

<template>
  <button @click="goToPostDetail">
    Chi tiết
    <i class="fa-solid fa-check"></i>
  </button>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
button {
  position: relative;
  padding: 0px 35px;
  margin-left: 40px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border-radius: 15px;
  border: 2px solid var(--blue);
  background: none;
  color: var(--blue);
  cursor: pointer;
  outline: none;
  transition: 200ms;
}
</style>