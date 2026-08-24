'use strict'

const pageDimensions = [
  [628, 903], [1121, 1607], [1133, 1613], [1125, 1599],
  [1142, 1617], [1127, 1609], [1130, 1611], [1126, 1615],
  [1130, 1617], [1135, 1609], [1133, 1616], [1131, 1615],
  [1138, 1614], [1128, 1620], [1128, 1615], [1130, 1611]
]

const pageFiles = [
  'menu-01-civi-kerdzebi.jpeg',
  'menu-02-civi-kerdzebi.jpeg',
  'menu-03-salatebi.jpeg',
  'menu-04-khinkali.jpeg',
  'menu-05-tsomeuli.jpeg',
  'menu-06-tsomeuli.jpeg',
  'menu-07-tskheli-kerdzebi.jpeg',
  'menu-08-tskheli-kerdzebi.jpeg',
  'menu-09-tskheli-kerdzebi.jpeg',
  'menu-10-tevzis-kerdzebi.jpeg',
  'menu-11-khortsis-kerdzebi.jpeg',
  'menu-12-garniri-da-deserti.jpeg',
  'menu-13-sousebi.jpeg',
  'menu-14-desertebi.jpeg',
  'menu-15-ualkoholo-sasmelebi.jpeg',
  'menu-16-alkoholuri-sasmelebi.jpeg'
]

const translations = {
  ka: {
    menuOpen: 'მენიუს გახსნა',
    menuClose: 'მენიუს დახურვა',
    menuImagePrefix: 'რესტორან „კერიას“ მენიუ',
    pageWord: 'გვერდი',
    pageLabels: [
      'ცივი კერძები', 'ცივი კერძები', 'სალათები', 'ხინკალი',
      'ცომეული', 'ცომეული', 'ცხელი კერძები', 'ცხელი კერძები',
      'ცხელი კერძები', 'თევზის კერძები', 'ხორცის კერძები',
      'გარნირი და დესერტი', 'სოუსები', 'დესერტები',
      'უალკოჰოლო სასმელები', 'ალკოჰოლური სასმელები'
    ]
  },
  en: {
    menuOpen: 'Open navigation',
    menuClose: 'Close navigation',
    menuImagePrefix: 'Keria Restaurant menu',
    pageWord: 'page',
    pageLabels: [
      'Cold dishes', 'Cold dishes', 'Salads', 'Khinkali',
      'Dough dishes', 'Dough dishes', 'Hot dishes', 'Hot dishes',
      'Hot dishes', 'Fish dishes', 'Meat dishes',
      'Side dishes and dessert', 'Sauces', 'Desserts',
      'Non-alcoholic drinks', 'Alcoholic drinks'
    ]
  }
}

const language = document.documentElement.lang.split('-')[0]
const copy = translations[language] || translations.ka
const assetRoot = document.body.dataset.assetRoot || ''

const header = document.querySelector('[data-header]')
const navToggle = document.querySelector('.nav-toggle')
const navigation = document.querySelector('#primary-nav')
const navLinks = [...document.querySelectorAll('.primary-nav a')]
const sectionNavLinks = navLinks.filter(link => link.hash)
const openButton = document.querySelector('[data-menu-open]')
const dialog = document.querySelector('[data-menu-dialog]')
const closeButton = document.querySelector('[data-menu-close]')
const previousButton = document.querySelector('[data-previous]')
const nextButton = document.querySelector('[data-next]')
const activePageContainer = document.querySelector('.active-page')
const activeImage = document.querySelector('[data-menu-image]')
const status = document.querySelector('[data-status]')
const pageButtons = [...document.querySelectorAll('[data-page]')]
const pageSelect = document.querySelector('[data-page-select]')
const revealGroups = [...document.querySelectorAll('[data-reveal]')]

let activePage = 0

function getPagePath(index) {
  return `${assetRoot}images/menu/${pageFiles[index]}`
}

function closeNavigation() {
  if (!navigation || !navToggle) return

  navigation.classList.remove('is-open')
  header?.classList.remove('menu-open')
  navToggle.setAttribute('aria-expanded', 'false')
  navToggle.querySelector('.sr-only').textContent = copy.menuOpen
}

function toggleNavigation() {
  if (!navigation || !navToggle) return

  const isOpening = !navigation.classList.contains('is-open')
  navigation.classList.toggle('is-open', isOpening)
  header?.classList.toggle('menu-open', isOpening)
  navToggle.setAttribute('aria-expanded', String(isOpening))
  navToggle.querySelector('.sr-only').textContent = isOpening
    ? copy.menuClose
    : copy.menuOpen
}

function preloadPage(index) {
  if (index < 0 || index >= pageDimensions.length) return

  const image = new Image()
  image.src = getPagePath(index)
}

function showPage(index) {
  if (!activeImage || !status) return
  if (index < 0 || index >= pageDimensions.length) return

  activePage = index
  const pageNumber = index + 1
  const pagePath = getPagePath(index)
  const [width, height] = pageDimensions[index]

  activeImage.classList.add('is-changing')
  activeImage.src = pagePath
  activeImage.width = width
  activeImage.height = height
  activeImage.alt = `${copy.menuImagePrefix} — ${copy.pageLabels[index]}, ${copy.pageWord} ${pageNumber}`
  status.textContent = `${pageNumber} / ${pageDimensions.length}`
  previousButton.disabled = index === 0
  nextButton.disabled = index === pageDimensions.length - 1
  activePageContainer?.scrollTo(0, 0)
  if (pageSelect) pageSelect.value = String(index)

  pageButtons.forEach((button, buttonIndex) => {
    if (buttonIndex === index) {
      button.setAttribute('aria-current', 'page')
    } else {
      button.removeAttribute('aria-current')
    }
  })

  pageButtons[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  preloadPage(index - 1)
  preloadPage(index + 1)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => activeImage.classList.remove('is-changing'))
  })
}

function openDialog() {
  if (!dialog) return

  showPage(0)
  dialog.showModal()
  document.body.classList.add('dialog-open')
  closeButton?.focus()
}

function closeDialog() {
  if (dialog?.open) dialog.close()
}

function handleDialogClick(event) {
  if (event.target !== dialog) return

  const bounds = dialog.getBoundingClientRect()
  const isInside =
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right &&
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom

  if (!isInside) closeDialog()
}

function updateActiveNavigation(entries) {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

  if (!visible) return

  sectionNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${visible.target.id}`) {
      link.setAttribute('aria-current', 'true')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

navToggle?.addEventListener('click', toggleNavigation)

navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeNavigation()
})

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24)
}, { passive: true })

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
    closeNavigation()
    navToggle?.focus()
  }

  if (!dialog?.open) return

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPage(activePage - 1)
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showPage(activePage + 1)
  }
})

openButton?.addEventListener('click', openDialog)
closeButton?.addEventListener('click', closeDialog)
previousButton?.addEventListener('click', () => {
  showPage(Math.max(0, activePage - 1))
})

nextButton?.addEventListener('click', () => {
  showPage(Math.min(pageDimensions.length - 1, activePage + 1))
})
dialog?.addEventListener('click', handleDialogClick)

dialog?.querySelector('.page-controls')?.addEventListener('click', event => {
  const button = event.target.closest('[data-page]')
  if (button) showPage(Number(button.dataset.page))
})

pageSelect?.addEventListener('change', () => {
  showPage(Number(pageSelect.value))
})

dialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open')
  openButton?.focus()
})

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(updateActiveNavigation, {
    rootMargin: '-35% 0px -55%',
    threshold: [0, 0.25, 0.5]
  })

  sectionNavLinks
    .map(link => document.querySelector(link.hash))
    .filter(Boolean)
    .forEach(section => observer.observe(section))

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function revealGroup(group) {
    if (prefersReducedMotion || typeof group.animate !== 'function') {
      group.classList.remove('reveal-pending')
      group.classList.add('is-revealed')
      return
    }

    const animation = group.animate(
      [
        { opacity: 0, transform: 'translateY(32px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 700,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    )

    animation.addEventListener('finish', () => {
      group.classList.remove('reveal-pending')
      group.classList.add('is-revealed')
      animation.cancel()
    }, { once: true })
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      revealGroup(entry.target)
      revealObserver.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -5%', threshold: 0.05 })

  revealGroups.forEach(group => {
    const isInitiallyVisible = group.getBoundingClientRect().top < window.innerHeight * 0.9

    if (isInitiallyVisible) {
      group.classList.add('is-revealed')
      return
    }

    group.classList.add('reveal-pending')
    revealObserver.observe(group)
  })

} else {
  revealGroups.forEach(group => group.classList.add('is-revealed'))
}

const year = document.querySelector('[data-year]')
if (year) year.textContent = new Date().getFullYear()
