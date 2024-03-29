import { Api } from '@/axios_instance'
import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export interface AuthState {
  user: IUser | null
  isAuth: boolean
  isToken: boolean
  redirectUrl: string | null
  loading: false
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  password: string
  confirmPassword: string
  mobile: string
}

let timer: ReturnType<typeof setTimeout>
export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: null,
      loading: false,
      isAuth: false,
      isToken: false,
      redirectUrl: null
    }) as AuthState,
  getters: {
    //isAuth:(state)=> state.users.accessToken,
    errorStore() {
      const errorStore = useErrorStore()
      return errorStore
    }
  },
  actions: {
    async login(paylod: ILogin) {
      try {
        const { data, status } = await Api.post('/auth', paylod)
        console.log('data', data, status)
        if (status === 200) {
          const expirationDate = new Date().getTime() + data.expireIn * 1000
          localStorage.setItem('token', data.accessToken)
          localStorage.setItem('expireIn', expirationDate)
          localStorage.setItem('user', JSON.stringify(data))
          this.isAuth = !!data.accessToken
          this.isToken = data.accessToken
          this.redirectUrl = '/users'
          this.autoLogout(data.expireIn * 1000)
          //   this.checkAuth()
        }
        return data
      } catch (error) {
        console.log('error', error)
      }
    },
    register(paylod: IRegister) {
      try {
      } catch (error) {
        if (error instanceof Error) {
          this.errorStore.setError({ message: error.message })
        }
      }
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('expireIn')
      localStorage.removeItem('user')
      clearTimeout(timer)
      this.$reset()
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      const expireIn = localStorage.getItem('expireIn')
      const expiresTime = expireIn - new Date().getTime()
      if (!token) {
        this.logout()
      }
      this.isAuth = !!token
      this.user = JSON.parse(localStorage.getItem('user') as string)

      this.autoLogout(expiresTime)
    },
    autoLogout(time: number) {
      timer = setTimeout(() => {
        console.log('hi')
        this.logout()
      }, time)
    }
  }
})
