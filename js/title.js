const title = document.querySelector('h1')

const links = document.querySelectorAll('section a')

const body = document.querySelector('body')
const color = ['#2a9d8f', '#ff8719', '#415a77', '#739500', '#5595cd', '#F45B69']

const APG = {
  textChange: (text) => {
    title.innerHTML = text

    let titleSplit = new SplitText(title, { type: 'chars' })
  },
  animation: (text) => {
    let tl = gsap.timeline()
    let titleTargets = gsap.utils.toArray('h1 div')

    tl.to(
      titleTargets,
      0.4,
      {
        yPercent: -90,
        stagger: 0.1,

        opacity: 0,
        stagger: {
          from: 'center',
          amount: 0.15,
        },
        onComplete: () => {
          const rI = Math.floor(Math.random() * 6)
          document.body.style.setProperty('--text-color', color[rI])

          // Text update
          APG.textChange(text)
          let title = gsap.utils.toArray('h1 div')

          tl.set(title, {
            yPercent: 110,
          })
          tl.add('start')

          tl.to(
            title,
            0.4,
            {
              yPercent: 0,
              stagger: 0.2,

              stagger: {
                from: 'center',
                amount: 0.2,
              },
              onComplete: () => {},
            },
            'start'
          )
        },
      },
      0.05
    )
  },
  cursor: () => {
    if (window.outerWidth > 1024) {
      /* Mouse pointer */
      var cursor = document.querySelector('#cursor')
      var link_list = document.querySelectorAll('.cLink')

      document.addEventListener('mousemove', function (e) {
        var x = e.clientX
        var y = e.clientY
        cursor.style.left = x + 'px'
        cursor.style.top = y + 'px'
      })

      link_list.forEach((link_) => {
        link_.onmouseover = function (event) {
          cursor.classList.remove('scroll')
          cursor.classList.remove('visit')
          cursor.classList.remove('arrow')

          document.body.classList.remove('h_cursor')

          if (link_.dataset.visit) {
            cursor.classList.add('visit')
          } else if (link_.dataset.read) {
            cursor.classList.add('read')
          } else if (link_.dataset.arrow) {
            cursor.classList.add('arrow_v')
          } else {
            cursor.classList.add('hover')
          }
          event.preventDefault()
        }

        link_.onmouseout = function () {
          cursor.classList.remove('arrow_v')
          cursor.classList.remove('visit')
          cursor.classList.remove('read')
          cursor.classList.remove('hover')
          document.body.classList.add('h_cursor')
        }
      })

      document.body.classList.add('cMenuEnabled')
    }
  },
}
links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    APG.animation(link.getAttribute('alt'))

    body.classList.add('hovered')
    link.classList.add('hovered')
  })

  link.addEventListener('mouseleave', () => {
    body.classList.remove('hovered')
    link.classList.remove('hovered')

    // title.removeAttribute('style')

    // APG.animation('My&nbsp;Playground')
  })
})

APG.cursor()
