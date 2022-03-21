const headerEl = document.querySelector('header')
const scrollToTop = document.querySelector('.scroll-to-top')

window.addEventListener('scroll', () => {
  // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
  let height = headerEl.getBoundingClientRect().height
  if (window.pageYOffset - height > 800) {
    // 滑动距离超过800
    if (!headerEl.classList.contains('sticky')) {
      headerEl.classList.add('sticky')
    }
  } else {
    headerEl.classList.remove('sticky')
  }

  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = 'block'
  } else {
    scrollToTop.style.display = 'none'
  }
})

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

const isotope = new Isotope('.cases', {
  // 行模式布局：一行占满后换行
  layoutMode: 'fitRows',
  // 指定item
  itemSelector: '.case-item',
})

const filterBtns = document.querySelector('.filter-btns')

// 事件委托、冒泡
filterBtns.addEventListener('click', (e) => {
  let { target } = e
  const filterOption = target.getAttribute('data-filter')
  if (filterOption) {
    document.querySelectorAll('.filter-btn.active').forEach((btn) => {
      btn.classList.remove('active') // 移除所有的active
      target.classList.add('active') // 给当前点击的添加上active

      isotope.arrange({ filter: filterOption })
    })
  }
})

// 滑动后元素动画出现的通用配置
const staggeringOption = {
  delay: 300,
  distance: '50px',
  duration: 500,
  easing: 'ease-in-out',
  origin: 'bottom',
}

ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 }) // 依次出现，间隔时间伪350ms
ScrollReveal().reveal('.service-item', { ...staggeringOption, interval: 350 }) // 依次出现，间隔时间伪350ms

const dataSectionEl = document.querySelector('.data-section')
ScrollReveal().reveal('.data-section', {
  beforeReveal: () => {
    anime({
      targets: '.data-piece .num',
      innerHTML: (el) => {
        return [0, el.innerHTML]
      },
      duration: 2000, // 2秒
      round: 1, // 间隔1
      easing: 'easeInExpo',
    })
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`
  },
})

window.addEventListener('scroll', () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom
  const top = dataSectionEl.getBoundingClientRect().top
  if (bottom >= 0 && top <= window.innerHeight) {
    // 下边已经出来，上边还没有出去
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
  }
})

// 属性选择器，nav下a元素中，href属性的值以#开头的
const scroll = new SmoothScroll('nav a[href*="#"], .scroll-to-top a[href*="#"]', {
  // 传入所有需要添加的节点
  header: 'header',
  offset: 80,
})

// 打开折叠菜单的情况下，点击一个菜单，开始滑动后隐藏白色背景菜单
document.addEventListener('scrollStart', () => {
  if (headerEl.classList.contains('open')) {
    headerEl.classList.remove('open')
  }
})

const exploreEls = document.querySelectorAll('.explore-btn')
exploreEls.forEach((el) => {
  el.addEventListener('click', () => {
    scroll.animateScroll(document.querySelector('#about-us'))
  })
})

// 折叠按钮
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', () => {
  headerEl.classList.toggle('open')
})
