<template>
  <div class="loader">
    <img src="@/assets/img/logo.svg" alt="shiza kanye" class="logo" />
    <span>beat contest vol. 1</span>
    <img src="@/assets/img/spin.svg" alt="spinner" class="spin" />
  </div>
</template>

<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6em;
  background: #fff;
  z-index: 10;
  padding: 6em;
  box-sizing: border-box;
}

.loader span {
  font-size: 2em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
}

.loader .spin {
  animation: spin 1.5s ease-in-out infinite;
}
</style>
