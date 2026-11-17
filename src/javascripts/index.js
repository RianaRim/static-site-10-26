console.log('Стрим от Захарстеллар')

checkElements()
headerScroll()
moveMarquee()
HighlightWords()

function headerScroll() {
  let header = document.querySelector('.header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('header-scrolled')
    } else {
      header.classList.remove('header-scrolled')
    }
    if (scroll > 100 && scroll > lastScroll) {
      header.classList.add('header-hidden')
    } else {
      header.classList.remove('header-hidden')
    }

    lastScroll = scroll
  })
}

function checkElements() {
  let elements = document.querySelectorAll('.reveal')

  elements.forEach((element) => {
    let rect = element.getBoundingClientRect()

    if (rect.top < window.innerHeight * 0.9) {
      if (element.classList.contains('reveal')) {
        element.classList.add('reveal-visible')
      }
    }
  })
}

// бегущие строки
function moveMarquee() {
  let marquee = document.querySelector('.marquee')
  let rows = marquee.querySelectorAll('.marquee__row')
  let position = 0
  let direction = -1
  let speed = 1
  let lastScroll = window.scrollY
  let timer

  window.addEventListener('scroll', () => {
    let delta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    if (delta > 0) {
      direction = 1
    } else {
      direction = -1
    }

    speed = 1 + Math.min(Math.abs(delta) / 10, 4)

    let skew = Math.max(-8, delta * 0.6)
    marquee.style.transform = `skewX(${skew}deg)`

    clearTimeout(timer)
    timer = setTimeout(() => {
      marquee.style.transform = `skewX(0)`
      speed = 1
    }, 150)
  })

  setInterval(() => {
    position = position - 0.05 * speed * direction

    if (position < -100) {
      position = position + 100
    }
    if (position > 0) {
      position = position - 100
    }

    rows.forEach((row) => {
      let tracks = row.querySelectorAll('.marquee__track')
      let x = position

      if (row.classList.contains('marquee__row-reverse')) {
        x = -100 - position
      }

      tracks.forEach((track) => {
        track.style.transform = `translateX(${x}%)`
      })
    })
  }, 15)
}

// перекрашиваем слова по скроллу в секции о нас
function HighlightWords() {
  let lead = document.querySelector('.about_lead')
  let words = lead.innerText.split(' ')
  let html = ''

  words.forEach((word) => {
    if (word.toLowerCase().includes('цветоч')) {
      html += `<span class="about_word about_word-accent">${word}</span>`
    } else {
      html += `<span class="about_word>${word}</span> `
    }
  })

  lead.innerHTML = html
  let spans = lead.querySelectorAll('.about_word')

  window.addEventListener('scroll', () => {
    let rect = lead.getBoundingClientRect()
    let progress =
      (window.innerHeight * 0.85 - rect.top) /
      (rect.height + window.innerHeight * 0.3)

    let p = Math.max(0, Math.min(1, progress))
    let activeCount = Math.round(p * spans.length)

    spans.forEach((span, index) => {
      if (index < activeCount) {
        span.classList.add('about_word-active')
      } else {
        span.classList.remove('about_word-active')
      }
    })
  })

  console.log(lead, words, html)
}
