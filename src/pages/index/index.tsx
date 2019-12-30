import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { counterStore } from '../../store/counter'
import { useService } from '../../service'
import { MaterialIcons } from 'taro-icons'

import './index.less'
import './index.scss'
import { sleep } from '../../utils/sleep'

// type PageStateProps = {
//   counterStore: {
//     counter: number
//     increment: Function
//     decrement: Function
//     incrementAsync: Function
//   }
// }

const IndexPage: Taro.FC = props => {
  const { counter } = counterStore
  const { loading, service } = useService()
  const increment = async () => {
    const data = await service.post('volume/up')
    console.log(data)
  }
  const decrement = async () => {
    const data = await service.post('volume/down')
    console.log(data)
  }
  const incrementAsync = async () => {
    await sleep(500)
    const data = await service.post('volume/up')
    console.log(data)
  }
  const moveMouse = (offsetX: number, offsetY: number) => async () => {
    const data = await service.post('mouse/move', { offsetX, offsetY })
    console.log(data)
  }
  const clickMouse = async () => {
    const data = await service.post('mouse/click')
    console.log(data)
  }
  const Loading = loading ? (
    <View className="loading-icon">加载中...</View>
  ) : (
    <View className="loading-icon">加载完成</View>
  )
  return (
    <View className="index">
      {Loading}
      <Button onTouchStart={increment}></Button>
      <Button onTouchStart={increment}>+</Button>
      <Button onTouchStart={decrement}>-</Button>
      <Button onClick={incrementAsync}>Add Async</Button>
      <View className="move-mouse">
        <View className="row-center">
          <View className="btn" onTouchStart={moveMouse(0, -100)}>
            <MaterialIcons className="icon" size={28} color="#333" name="keyboard-arrow-up" />
          </View>
        </View>
        <View className="row-center">
          <View className="btn" onTouchStart={moveMouse(-100, 0)}>
            <MaterialIcons className="icon" size={28} color="#333" name="keyboard-arrow-left" />
          </View>
          <View className="btn" onTouchStart={clickMouse}>
            <MaterialIcons className="icon" size={28} color="#333" name="mouse" />
          </View>
          <View className="btn" onTouchStart={moveMouse(100, 0)}>
            <MaterialIcons className="icon" size={28} color="#333" name="keyboard-arrow-right" />
          </View>
        </View>
        <View className="row-center">
          <View className="btn" onTouchStart={moveMouse(0, 100)}>
            <MaterialIcons className="icon" size={28} color="#333" name="keyboard-arrow-down" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(IndexPage) as ComponentType

IndexPage.config = {
  navigationBarTitleText: '首页',
}
