---
tags: [SOP, 微信小程序, 模板代码, 导航栏, 交互]
date: 2026-05-10
---

# SOP｜自定义导航栏 + 滚动透明效果

## 痛点背景

微信小程序默认导航栏无法自定义样式，无法实现"Hero 区透明、下滑后带背景"的沉浸式效果。品牌展示类小程序需要这种高级感设计。

---

## 优化前后对比

| 项目 | 优化前 | 优化后 |
|------|--------|--------|
| 导航栏样式 | 系统默认灰色标题栏 | 自定义：左搜索、中 logo、右胶囊占位 |
| Hero 区效果 | 导航栏挡住图片 | 透明浮层，与全屏大图融合 |
| 滚动效果 | 无变化 | 下滑后渐变为毛玻璃实色背景 |
| 跨页面 | 每页单独写 | 一个组件全站复用 |

---

## 核心可复用代码

### 1. `components/nav-bar/nav-bar.js`
```js
const app = getApp()
Component({
  properties: {
    transparent: { type: Boolean, value: false },
    showBack:    { type: Boolean, value: false }
  },
  data: { statusBarHeight: 0, navbarHeight: 88, rowHeight: 44, capsuleWidth: 94 },
  lifetimes: {
    attached() {
      const g = app.globalData
      this.setData({
        statusBarHeight: g.statusBarHeight,
        navbarHeight:    g.navbarHeight,
        rowHeight:       g.navbarRowHeight,
        capsuleWidth:    g.capsuleWidth
      })
    }
  },
  methods: {
    onLeftTap() {
      if (this.properties.showBack) wx.navigateBack()
      else this.triggerEvent('search')
    }
  }
})
```

### 2. `components/nav-bar/nav-bar.wxml`
```xml
<view class="nav-wrap {{transparent ? 'nav-transparent' : 'nav-solid'}}"
  style="height: {{navbarHeight}}px; padding-top: {{statusBarHeight}}px;">
  <view class="nav-inner" style="height: {{rowHeight}}px; padding-right: {{capsuleWidth}}px;">
    <view class="nav-left" bindtap="onLeftTap">
      <view wx:if="{{showBack}}" class="back-icon {{transparent ? 'icon-light' : 'icon-dark'}}"></view>
      <block wx:else>
        <view class="search-lens {{transparent ? 'icon-light' : 'icon-dark'}}"></view>
        <view class="search-stick {{transparent ? 'stick-light' : 'stick-dark'}}"></view>
      </block>
    </view>
    <image class="nav-logo" src="/assets/logo-divider.png" mode="aspectFit"
      style="filter: {{transparent ? 'invert(1)' : 'none'}};" />
  </view>
</view>
```

### 3. 关键 CSS（`nav-bar.wxss`）
```css
.nav-transparent { background: transparent; }
.nav-solid {
  background: rgba(247, 243, 239, 0.96);
  backdrop-filter: saturate(180%) blur(40rpx);
  border-bottom: 1rpx solid rgba(0,0,0,0.06);
}
/* transition 让透明↔实色有过渡 */
.nav-wrap { transition: background 0.3s ease; }
```

### 4. 首页滚动监听（`index.js`）
```js
data: { navTransparent: true },

onPageScroll({ scrollTop }) {
  const threshold = app.globalData.windowHeight * 0.3
  const shouldTransparent = scrollTop < threshold
  if (this.data.navTransparent !== shouldTransparent) {
    this.setData({ navTransparent: shouldTransparent })
  }
}
```

### 5. 页面引用（JSON 注册 + WXML 使用）
```json
// page.json
{ "navigationStyle": "custom", "usingComponents": { "nav-bar": "/components/nav-bar/nav-bar" } }
```
```xml
<!-- 首页（透明模式）-->
<nav-bar transparent="{{navTransparent}}" bind:search="goSearch" />

<!-- 详情页（有返回按钮）-->
<nav-bar show-back="{{true}}" transparent="{{navTransparent}}" />

<!-- 普通页（实色+占位）-->
<nav-bar />
<view style="height: {{navbarHeight}}px;"></view>
```

### 6. `app.js` 全局尺寸计算
```js
onLaunch() {
  const sysInfo = wx.getWindowInfo()
  const menuBtn = wx.getMenuButtonBoundingClientRect()
  const rowH = menuBtn.height + (menuBtn.top - sysInfo.statusBarHeight) * 2
  this.globalData.navbarRowHeight = rowH
  this.globalData.navbarHeight    = sysInfo.statusBarHeight + rowH
  this.globalData.capsuleWidth    = sysInfo.windowWidth - menuBtn.left
}
```

---

## 避坑记录

> ⚠️ **iOS WebKit 致命 Bug**：`display: flex` + `overflow: hidden` 的容器会裁切内部 `position: fixed` 子元素，导致导航栏消失。
>
> **解法**：`overflow-x: hidden` 只加在 `page` 根选择器，页面容器 `.page-xxx` 不加。

```css
/* ✅ 正确 */
page { overflow-x: hidden; }

/* ❌ 错误（flex容器 + overflow 会裁切fixed导航栏） */
.page-category { display: flex; overflow-x: hidden; }
```

---

## 交付 Checklist

- [ ] 真机测试：首页 Hero 区导航栏透明，下滑后背景出现
- [ ] 真机测试：详情页沉浸式图片区透明，下滑后出现实色背景
- [ ] 真机测试：所有页面导航栏左按钮（搜索/返回）可正常点击
