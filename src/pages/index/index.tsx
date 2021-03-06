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
import { PositionItem } from './common/positionItem'

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
  const pressKey = (key: string) => async () => {
    await service.post('pressKey', { key })
  }
  const toggleVolume = async () => {
    const data = await service.post('volume/toggle')
    console.log(data)
  }
  const increment = async () => {
    const data = await service.post('volume/up')
    console.log(data)
  }
  const decrement = async () => {
    const data = await service.post('volume/down')
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
      {/* {Loading} */}
      <PositionItem top="60px" left="80px" onClick={pressKey('audio_mute')}>
        <MaterialIcons className="icon" size={28} color="#333" name="volume-off" />
      </PositionItem>
      <PositionItem top="60px" right="160px" onClick={pressKey('audio_vol_down')}>
        <MaterialIcons className="icon" size={28} color="#333" name="volume-down" />
      </PositionItem>
      <PositionItem top="60px" right="80px" onClick={pressKey('audio_vol_up')}>
        <MaterialIcons className="icon" size={28} color="#333" name="volume-up" />
      </PositionItem>

      <PositionItem top="50%" left="calc(50% - 80px)" onClick={pressKey('audio_prev')}>
        <MaterialIcons className="icon" size={28} color="#333" name="skip-previous" />
      </PositionItem>
      <PositionItem top="50%" left="50%" onClick={pressKey('audio_play')}>
        <MaterialIcons className="icon" size={28} color="#333" name="pause-circle-filled" />
      </PositionItem>
      <PositionItem top="50%" left="calc(50% + 80px)" onClick={pressKey('audio_next')}>
        <MaterialIcons className="icon" size={28} color="#333" name="skip-next" />
      </PositionItem>
    </View>
  )
}

export default observer(IndexPage) as ComponentType

IndexPage.config = {
  navigationBarTitleText: '电脑遥控器',
}
