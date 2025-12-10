"use client";

import DNKLogo from "@/public/assets/logo/dnklogo_1.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import { WWURL } from "@/url/axios";

const SplashScreen = ({ logoData }) => {
    
    const imageUrl = logoData && logoData.image ? `${WWURL}${logoData.image}` : DNKLogo;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="fade-out-bg splash-screen z-[999] fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center ">
                <Image
                    src={imageUrl}
                    alt="DNK Logo"
                    width={800}
                    height={400}
                    priority 
                    quality={80}    
                    formats={["image/webp", "image/avif"]}  
                    className="logo-animation"
                />
            </div>
        </motion.div>
    );
};

export default SplashScreen;
