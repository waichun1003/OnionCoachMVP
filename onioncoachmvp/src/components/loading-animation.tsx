import { motion } from "framer-motion"

export function LoadingAnimation() {
    return (
        <div className="flex justify-center items-center h-24">
            <motion.div
                className="w-4 h-4 bg-[#6B46C1] rounded-full mr-1"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0,
                }}
            />
            <motion.div
                className="w-4 h-4 bg-[#6B46C1] rounded-full mr-1"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.2,
                }}
            />
            <motion.div
                className="w-4 h-4 bg-[#6B46C1] rounded-full"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.4,
                }}
            />
        </div>
    )
}

