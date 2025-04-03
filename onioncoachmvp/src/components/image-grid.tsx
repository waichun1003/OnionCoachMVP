"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion"
import Image from "next/image"

export function ImageGrid() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollXProgress } = useScroll({
        container: containerRef,
    })

    const controls = useAnimation()

    const x = useSpring(useTransform(scrollXProgress, [0, 1], ["0%", "-50%"]), {
        stiffness: 100,
        damping: 30,
    })

    useEffect(() => {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } })
    }, [controls])

    const imageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div
            ref={containerRef}
            className="overflow-x-scroll overflow-y-hidden w-full cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            <motion.div
                className="flex items-center space-x-8 py-8"
                style={{ x }}
                drag="x"
                dragConstraints={containerRef}
                initial="hidden"
                animate={controls}
            >
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-[#FF5733] flex-shrink-0"
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="/images/coach2.png"
                        alt="Professional woman smiling"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
                <motion.div className="flex -space-x-4 z-10" variants={imageVariants}>
                    <motion.div
                        className="w-[200px] h-[400px] bg-[#6B46C1] rounded-l-full"
                        whileHover={{ scaleX: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.div
                        className="w-[200px] h-[400px] bg-[#805AD5] rounded-r-full transform -scale-x-100"
                        whileHover={{ scaleX: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </motion.div>
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-[#FDB347] flex-shrink-0 z-20"
                    variants={imageVariants}
                    whileHover={{ scale: 1.05, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Image
                        src="/images/coach1.png"
                        alt="Professional man smiling"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
                <motion.div
                    className="relative w-[400px] h-[200px] overflow-hidden flex-shrink-0"
                    variants={imageVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Team collaborating"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-[#FF5733] flex-shrink-0"
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Professional woman in office"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

