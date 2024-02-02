import { defineStore } from 'pinia'

export interface IError {
  message: string | null
  visible?: boolean
  color?: string
  direction?: string
}

export const useErrorStore = defineStore('error', {
  state: () =>
    ({
      color: 'danger',
      direction: 'right',
      visible: false,
      message: null
    }) as IError,
  actions: {
    setError(error: IError) {
      this.visible = true
      this.message = error.message
    },

    clearError() {
      this.message = ''
      this.visible = false
    }
  }
})
