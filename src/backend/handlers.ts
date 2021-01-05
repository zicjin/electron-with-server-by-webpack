import store from './store'

export const factorial = async ({ num }: Record<string, number>) => {
  function fact(n: number): number {
    if (n === 1) {
      return 1
    }
    return n * fact(n - 1)
  }

  console.log('making factorial')
  return fact(num)
}

export const ring = async () => {
  console.log('picking up the phone')
  return 'hello!'
}

export const getStore = async (key: string) => {
  return store.get(key)
}

export const setStore = async (payload: Record<string, string>) => {
  store.set(payload)
}
