import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

const ImageRevealInHover = () => {
  const [isHovered, setIsHovered] = useState(false)
  const revealWrapper = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    const sizes = {
      initial: 30,
      hover: 150,
    }

    let circleAnimation;

    const handleMouseMove = (e) => {
      if (!revealWrapper.current || !circleRef.current) return

      const rect = revealWrapper.current.getBoundingClientRect()
      const size = isHovered ? sizes.hover : sizes.initial
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (circleAnimation) {
        circleAnimation.kill()
      }

      circleAnimation = gsap.to(circleRef.current, {
        clipPath: `circle(${size}px at ${x}px ${y}px)`,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      if (!circleRef.current) return
      gsap.to(circleRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = (e) => {
      if (!revealWrapper.current || !circleRef.current) return;

      const rect = revealWrapper.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(circleRef.current, {
        clipPath: `circle(0px at ${x}px ${y}px)`,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    document.addEventListener("mousemove", handleMouseMove)
    revealWrapper.current?.addEventListener("mouseenter", handleMouseEnter)
    revealWrapper.current?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      revealWrapper.current?.removeEventListener("mouseenter", handleMouseEnter)
      revealWrapper.current?.removeEventListener("mouseleave", handleMouseLeave)
      if (circleAnimation) {
        circleAnimation.kill()
      }
    }
  }, [isHovered])

  return (
    <section className="image-reveal-main mx-auto h-screen overflow-hidden relative p-4 sm:p-8 flex justify-center items-center">
      <div
        ref={revealWrapper}
        className="reveal-wrapper mx-auto relative w-[98%] h-[34rem] max-w-[100rem] max-h-5xl aspect-video overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://i.pinimg.com/736x/f4/d9/a4/f4d9a47c6b62117d22701ec06a233055.jpg"
          alt="Base image"
          className="w-full h-full object-cover"
        />

        {/* Hide Image */}
        <div
          ref={circleRef}
          className="absolute mx-auto inset-0 opacity-0 pointer-events-none"
          style={{
            clipPath: "circle(0px at 50% 50%)",
          }}
        >
          <img
            src="https://i.pinimg.com/736x/42/31/b7/4231b7338608728bda8ed5abed7a0dac.jpg"
            alt="Revealed image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default ImageRevealInHover
