// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScrollTop = scrollTop
  })

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const navHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetSection.offsetTop - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Scrollspy for active navigation
  const sections = document.querySelectorAll("section[id]")
  const navLinksArray = Array.from(document.querySelectorAll(".nav-link"))

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksArray.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
  updateActiveNav() // Initial call

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe sections for animations
  const animatedElements = document.querySelectorAll("section, .book-content, .about-content")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Dropdown functionality
  const dropdown = document.querySelector(".nav-dropdown")
  const dropdownBtn = document.querySelector(".nav-dropdown-btn")
  const dropdownContent = document.querySelector(".nav-dropdown-content")

  if (dropdown && dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true"
      dropdownBtn.setAttribute("aria-expanded", !isExpanded)
      dropdownContent.style.display = isExpanded ? "none" : "block"
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownBtn.setAttribute("aria-expanded", "false")
        dropdownContent.style.display = "none"
      }
    })

    // Handle keyboard navigation
    dropdownBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  }

  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.src // Trigger loading
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    // Disable animations
    const style = document.createElement("style")
    style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `
    document.head.appendChild(style)
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })

  // Mobile hamburger menu behavior
  const navToggle = document.querySelector('.nav-toggle')
  const navMenu = document.querySelector('.nav-menu')

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      const isOpen = navMenu.classList.toggle('mobile-open')
      navToggle.setAttribute('aria-expanded', isOpen)
      // update aria-label for clarity
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú')
      // prevent body scroll when open
      document.body.style.overflow = isOpen ? 'hidden' : ''
    })

    // Close when clicking a link inside the mobile menu
    navMenu.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('a[href^="#"]')) {
        navMenu.classList.remove('mobile-open')
        navToggle.setAttribute('aria-expanded', 'false')
  navToggle.setAttribute('aria-label', 'Abrir menú')
  document.body.style.overflow = ''
      }
    })

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open')
        navToggle.setAttribute('aria-expanded', 'false')
        navToggle.setAttribute('aria-label', 'Abrir menú')
        document.body.style.overflow = ''
      }
    })

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open')
        navToggle.setAttribute('aria-expanded', 'false')
        navToggle.setAttribute('aria-label', 'Abrir menú')
        document.body.style.overflow = ''
      }
    })
  }
})

// Sample toggle functionality
function toggleSample(bookId, event) {
  const sampleElement = document.getElementById(`${bookId}-sample`)
  const button = event.target

  if (sampleElement.style.display === "none" || sampleElement.style.display === "") {
    sampleElement.style.display = "block"
    button.textContent = "Ocultar muestra"
    button.setAttribute("aria-expanded", "true")

    // Smooth scroll to sample
    setTimeout(() => {
      sampleElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }, 100)
  } else {
  sampleElement.style.display = "none"
  button.textContent = "Leer muestra"
  button.setAttribute("aria-expanded", "false")
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
  // Any heavy scroll operations can go here
}, 16) // ~60fps

window.addEventListener("scroll", debouncedScrollHandler)

// Error handling for missing elements
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector)
  } catch (error) {
    console.warn(`Element not found: ${selector}`)
    return null
  }
}

// Accessibility improvements
function improveAccessibility() {
  // Improve button accessibility
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    if (!button.getAttribute("aria-label") && !button.textContent.trim()) {
      button.setAttribute("aria-label", "Botón")
    }
  })

  // Add proper ARIA labels to social links
  const socialLinks = document.querySelectorAll(".social-icons a, .footer-social a")
  socialLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href && !link.getAttribute("aria-label")) {
      if (href.includes("instagram")) link.setAttribute("aria-label", "Seguir en Instagram")
      else if (href.includes("facebook")) link.setAttribute("aria-label", "Seguir en Facebook")
      else if (href.includes("tiktok")) link.setAttribute("aria-label", "Seguir en TikTok")
      else if (href.includes("youtube")) link.setAttribute("aria-label", "Seguir en YouTube")
    }
  })
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveAccessibility)

// Service Worker registration for better performance (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment if you want to add a service worker
    // navigator.serviceWorker.register('/sw.js');
  })
}
