import { View } from '@tarojs/components'

import './positionItem.less'
import { ITouchEvent } from '@tarojs/components/types/common'

interface PositionItemProps {
  top?: string
  bottom?: string
  left?: string
  right?: string
  onClick?: (event: ITouchEvent) => any
}

export const PositionItem: Taro.FC<PositionItemProps> = props => {
  const { children, onClick, ...style } = props
  const { top, bottom, left, right } = style
  const onBtnClick = onClick || (() => {})
  return (
    <View className="position-item" style={{ bottom, left, right, top }}>
      <View className="btn" onClick={onBtnClick}>
        {children}
      </View>
    </View>
  )
}
