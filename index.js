const glide = new Glide('.glide')
const captionsEl = document.querySelectorAll('.slide-caption')
// 监听事件：
glide.on(['mount.after', 'run.after'], () => {
  // 获取对应得轮播图item
  const caption = captionsEl[glide.index]
  // 调用动画
  anime({
    targets: caption.children, // 调用目标
    opacity: [0, 1],
    duration: 400,
    easing: 'linear',
    delay: anime.stagger(400, { start: 300 }), // 参数1： 第一个元素出现后400ms再出现第二个元素，以此类推。参数2： 第一个元素出现前等待300ms
    translateY: [anime.stagger([40, 10]), 0], // 这里就是：h1从40到0，h3从25到0，button从10到0
  })
})

glide.on('run.before', () => {
  document.querySelectorAll('.slide-caption > *').forEach((el) => {
    el.style.opacity = 0
  })
})

glide.mount()
