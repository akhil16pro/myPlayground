const section = document.querySelector('section')
const main = document.querySelector('main')
let aimX = 0.5
let aimY = 0.5
let currentX = 0.5
let currentY = 0.5

const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

const move = (event) => {
  if (isTouchDevice()) {
    if (event.changedTouches[0] != undefined) {
      aimX = event.changedTouches[0].pageX / main.clientWidth
      aimY = event.changedTouches[0].pageY / main.clientHeight
    }
  } else {
    aimX = event.pageX / main.clientWidth
    aimY = event.pageY / main.clientHeight
  }
}

const tween = (event) => {
  currentX = currentX + (aimX - currentX) * 0.05
  currentY = currentY + (aimY - currentY) * 0.05

  const sw = section.clientWidth - main.clientWidth
  const sh = section.clientHeight - main.clientHeight
  if (isTouchDevice()) {
    section.style.transform = `translate(${-1 * sw * currentX}px,${
      -1 * sh * currentY
    }px)`
  } else {
    section.style.transform = `translate(${-1 * sw * currentX}px,${
      -1 * sh * currentY
    }px)`
  }

  // mousetrack
  const rightEl = document.querySelector('.mContain.side'),
    bottomEl = document.querySelector('.mContain.bottom')

  rightEl.querySelector('.lineText').innerHTML =
    10000 + Math.floor(sw * currentX) * 2
  bottomEl.querySelector('.lineText').innerHTML =
    5000 + Math.floor(sw * currentY) * 2

  const msh =
    rightEl.querySelector('.inner').clientHeight - rightEl.clientHeight
  const msw =
    bottomEl.querySelector('.inner').clientWidth - bottomEl.clientWidth

  rightEl.querySelector('.inner').style.transform = `translateY(${
    -1 * msh * currentY
  }px)`

  bottomEl.querySelector('.inner').style.transform = `translateX(${
    -1 * msw * currentX
  }px)`

  requestAnimationFrame(tween)
}

const init = () => {
  if (window.outerWidth > 1024) {
    tween()
    document.removeEventListener('mousemove', move)
    document.removeEventListener('touchstart', move)
    setTimeout(() => {
      document.addEventListener('touchstart', move)
      if (!isTouchDevice()) {
        document.addEventListener('mousemove', move)
      }
    }, 100)
  }
  setTimeout(() => {
    document.body.classList.add('domLoaded')
  }, 100)
}

window.onresize = init

init()
