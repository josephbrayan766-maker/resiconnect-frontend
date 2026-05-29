import { useEffect } from 'react'

function CustomCursor() {
    useEffect(() => {
        const style = document.createElement('style')
        style.textContent = `
      * { cursor: none !important; }
      
      .cursor-arrow {
        width: 20px; height: 20px;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        transition: all 0.1s ease;
      }

      .cursor-arrow svg {
        filter: drop-shadow(0 0 6px #d4af37) drop-shadow(0 0 12px #d4af37);
      }

      @keyframes bubbleFloat {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.3; }
        100% { transform: translateY(-150px) scale(1); opacity: 0; }
      }

      .bubble {
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05));
        border: 1px solid rgba(212,175,55,0.2);
        pointer-events: none;
        z-index: 0;
        animation: bubbleFloat linear infinite;
      }
    `
        document.head.appendChild(style)

        // Curseur flèche
        const arrow = document.createElement('div')
        arrow.className = 'cursor-arrow'
        arrow.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 2L2 16L7 11L10 18L12 17L9 10L16 10L2 2Z" fill="#d4af37" stroke="#d4af37" stroke-width="0.5"/>
      </svg>
    `
        document.body.appendChild(arrow)

        // Curseur main
        const handArrow = document.createElement('div')
        handArrow.className = 'cursor-arrow'
        handArrow.style.display = 'none'
        handArrow.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 11V6a2 2 0 0 1 4 0v5M9 11a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0M9 11h4" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
        document.body.appendChild(handArrow)

        // Bulles
        const bubbles = []
        for (let i = 0; i < 18; i++) {
            const b = document.createElement('div')
            b.className = 'bubble'
            const size = Math.random() * 60 + 20
            b.style.width = size + 'px'
            b.style.height = size + 'px'
            b.style.left = Math.random() * 100 + 'vw'
            b.style.animationDuration = (Math.random() * 15 + 10) + 's'
            b.style.animationDelay = (Math.random() * 10) + 's'
            document.body.appendChild(b)
            bubbles.push(b)
        }

        // Curseur disparaît après inactivité
        let timeout
        const hideCursor = () => {
            arrow.style.opacity = '0'
            handArrow.style.opacity = '0'
        }
        const showCursor = () => {
            arrow.style.opacity = '1'
            handArrow.style.opacity = '1'
            clearTimeout(timeout)
            timeout = setTimeout(hideCursor, 3000)
        }

        const move = (e) => {
            showCursor()
            arrow.style.left = e.clientX - 2 + 'px'
            arrow.style.top = e.clientY - 2 + 'px'
            handArrow.style.left = e.clientX - 4 + 'px'
            handArrow.style.top = e.clientY - 2 + 'px'

            const el = document.elementFromPoint(e.clientX, e.clientY)
            const isClickable = el && (
                el.tagName === 'BUTTON' ||
                el.tagName === 'A' ||
                el.tagName === 'INPUT' ||
                el.closest('button') ||
                el.closest('a')
            )

            if (isClickable) {
                arrow.style.display = 'none'
                handArrow.style.display = 'block'
            } else {
                arrow.style.display = 'block'
                handArrow.style.display = 'none'
            }
        }

        window.addEventListener('mousemove', move)

        return () => {
            window.removeEventListener('mousemove', move)
            clearTimeout(timeout)
            document.body.removeChild(arrow)
            document.body.removeChild(handArrow)
            bubbles.forEach(b => document.body.removeChild(b))
            document.head.removeChild(style)
        }
    }, [])

    return null
}

export default CustomCursor