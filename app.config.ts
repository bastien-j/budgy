export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'not-disabled:cursor-pointer',
      },
    },
    modal: {
      slots: {
        description: 'hidden',
      },
    },
  },
})
