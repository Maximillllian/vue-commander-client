<template>
  <div v-if="isOpen" class="backdrop" @click.self="cancel">
    <div class="popup">
      <header>
        <h3><slot name="title"></slot></h3>
        <hr />
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer>
        <hr />
        <slot name="footer" :confirm="confirm" :cancel="cancel">
          <div class="controls">
            <button @click="confirm">Ок</button>
            <button @click="cancel">Отмена</button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: false,
      default: "copy",
    },
  },

  popupControllers: null,

  data() {
    return {
      path: "",
      isOpen: false,
    };
  },

  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });
      this.$options.popupControllers = { resolve, reject };
      this.isOpen = true;
      return popupPromise;
    },

    confirm(value=true) {
      this.$options.popupControllers.resolve(value);
      this.isOpen = false;
    },

    cancel() {
      this.$options.popupControllers.resolve(false);
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100500;
  backdrop-filter: blur(5px);
}

.popup {
  // width: 200px;
  // height: 200px;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 2px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  footer {
    .controls {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
