
import store from './store'

let handlers: any = {}

handlers._history = []

handlers['make-factorial'] = async ({ num }: Record<string, number>) => {
  handlers._history.push(num)

  function fact(n: number): number {
    if (n === 1) {
      return 1
    }
    return n * fact(n - 1)
  }

  console.log('making factorial')
  return fact(num)
}

handlers['ring-ring'] = async () => {
  console.log('picking up the phone')
  return 'hello!'
}

handlers['getStore'] = async ({ key }: Record<string, string>) => {
  handlers._history.push(store.get(key))
  return store.get(key)
}

handlers['setStore'] = async ({ key, value }: Record<string, string>) => {
  console.log(key, value)
  store.set(key, value)
}

module.exports = handlers
