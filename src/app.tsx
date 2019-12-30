import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import { counterStore } from './store/counter'

import './styles/index'

import 'taro-icons/scss/MaterialIcons.scss' // 112KB
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// import icon from './assets/音乐.png'
// import icon2 from './assets/音乐2.png'
// import icon3 from './assets/游戏.png'
// import icon4 from './assets/游戏2.png'

// console.log(icon4)

const store = {
  counterStore,
}

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ['pages/index/index', 'pages/mouse/index'],
    tabBar: {
      list: [
        {
          text: '播放',
          pagePath: 'pages/index/index',
          iconPath: './assets/音乐2.png',
          selectedIconPath: './assets/音乐.png',
        },
        {
          text: '鼠标',
          pagePath: 'pages/mouse/index',
          iconPath: './assets/游戏2.png',
          selectedIconPath: './assets/游戏.png',
        },
      ],
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
