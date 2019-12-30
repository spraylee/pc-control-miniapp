import { useState } from '@tarojs/taro'
import { combinePath } from '../utils/path'
import { baseServicePath } from '../config'
import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()

export const useService = () => {
  const [loading, setLoading] = useState(false)
  const method = (type: 'post' | 'get', path: string, data?: any) => {
    setLoading(true)
    return flyMethod(type, path, data)
      .then(e => {
        setLoading(false)
        return e.data
      })
      .catch(e => {
        setLoading(false)
        throw e
      })
  }
  const service = {
    post: (path: string, data?: any) => method('post', path, data),
    get: (path: string, data?: any) => method('get', path, data),
  }
  return { service, loading }
}

const flyMethod = async (type: 'post' | 'get', path: string, data?: any) => {
  return fly[type](combinePath(baseServicePath, path), data)
}
