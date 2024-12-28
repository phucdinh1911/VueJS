<script setup>

</script>

<template>
      <div class="development">
        <div class="development-notice">
          <p>Tính năng đang được phát triển. Vui lòng quay lại sau!</p>
        </div>
      </div>
    
</template>

<style scoped>
.development {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.development-notice {
  background: rgba(255, 165, 0, 0.2);
  border: 2px dashed orange;
  padding: 20px;
  border-radius: 10px;
  color: #ff4500;
  font-size: 1.2rem;
  font-weight: bold;
  animation: fade-in 1.5s ease-in-out infinite;
}
@keyframes fade-in {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
