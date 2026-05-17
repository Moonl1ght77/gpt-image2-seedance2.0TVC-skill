Component({
  data: { visible: false },
  methods: {
    // 外部调用：显示遮罩，duration ms 后自动隐藏
    show(duration = 400) {
      this.setData({ visible: true })
      setTimeout(() => this.setData({ visible: false }), duration)
    }
  }
})
