export const history: any[] = []

export const factorial = async ({ num }: Record<string, number>) => {
  history.push(num)

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
