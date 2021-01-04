import Store from 'electron-store'

export enum InterfaceLanguage {
  English = "en",
  中文 = "zh_CN",
}
  
const store = new Store({
  schema: {
    token: {
      type: 'string',
    },
    repositories: {
      type: 'array'
    },
    language: {
      type: 'string',
    }
  }
})

export default store