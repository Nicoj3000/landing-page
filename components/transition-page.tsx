"use client"

import { transitionVariantsPage } from "@/utils/motion-transitions";
import { AnimatePresence, motion } from "framer-motion";

const TransitionPage = () => {
    return (
        <AnimatePresence mode="wait">
            <div>
                <motion.div
                    className="pointer-events-none fixed inset-0 z-30 bg-black/25"
                    variants={transitionVariantsPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0.05, duration: 0.25, ease: "easeOut" }}
                ></motion.div>
            </div>
        </AnimatePresence>
    );
}

export default TransitionPage;