import { UseToastOptions } from '@chakra-ui/react'
import ky from 'ky'

export type ToastCaller = (props: UseToastOptions) => void
export type ToastStatus = 'error' | 'success' | 'warning' | 'info'

export const errorHander = (data: string | Error, caller?: ToastCaller, status: ToastStatus = 'warning'): void => {
  let title = data as string

  if (data instanceof Error) {
    title = data.message
    if ((data as ky.HTTPError).response?.status === 401) {
      // title = "认证失败"
      window.location.href = '/login'
      return
    }
    status = 'error'
    console.error(data)
  }

  if (caller) {
    caller({
      title,
      status,
      isClosable: true,
      position: 'top',
    })
  } else {
    alert(data)
  }
}

export const botErrorHander = (data: string | Error, caller?: ToastCaller, status: ToastStatus = 'warning'): void => {
  let title = data as string

  if (data instanceof Error) {
    title = data.message
    if ((data as ky.HTTPError).response?.status === 401) {
      // title = "认证失败"
      window.location.href = '/loginbot'
      return
    }
    status = 'error'
    console.error(data)
  }

  if (caller) {
    caller({
      title,
      status,
      isClosable: true,
      position: 'top',
    })
  } else {
    alert(data)
  }
}
