"use client";

import Heading from "@/shared/Heading";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import clientSayMain from "@/images/clientSayMain.png";
import clientSay1 from "@/images/clientSay1.png";
import clientSay2 from "@/images/clientSay2.png";
import clientSay3 from "@/images/clientSay3.png";
import clientSay4 from "@/images/clientSay4.png";
import clientSay5 from "@/images/clientSay5.png";
import clientSay6 from "@/images/clientSay6.png";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { variants, sectionEntrance } from "@/utils/animationVariants";

export interface SectionClientSayProps {
  className?: string;
  data?: typeof DEMO_DATA;
}

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    clientAddress: "Malaysia",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    clientAddress: "London",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
  {
    id: 3,
    clientName: "Berta Emili",
    clientAddress: "Tokyo",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function changeItemId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < data?.length - 1) {
        changeItemId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeItemId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentItem = data[index];

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <Image
          className="absolute top-9 -left-20"
          src={clientSay1}
          alt="Customer testimonial photo 1"
        />
        <Image
          className="absolute bottom-[100px] right-full mr-40"
          src={clientSay2}
          alt="Customer testimonial photo 2"
        />
        <Image
          className="absolute top-full left-[140px]"
          src={clientSay3}
          alt="Customer testimonial photo 3"
        />
        <Image
          className="absolute -bottom-10 right-[140px]"
          src={clientSay4}
          alt="Customer testimonial photo 4"
        />
        <Image
          className="absolute left-full ml-32 bottom-[80px]"
          src={clientSay5}
          alt="Customer testimonial photo 5"
        />
        <Image
          className="absolute -right-10 top-10 "
          src={clientSay6}
          alt="Customer testimonial photo 6"
        />
      </div>
    );
  };

  return (
    <motion.div 
      className={`nc-SectionClientSay relative ${className} `} 
      id="testimonials"
      data-journey-path-waypoint="testimonials"
      role="region"
      aria-label="Customer testimonials"
      {...sectionEntrance}
    >
      <Heading desc="Let's see what people think of Chisfis" isCenter>
        Good news from far away
      </Heading>
      <motion.div 
        className="relative md:mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {renderBg()}
        <Image className="mx-auto" src={clientSayMain} alt="Featured customer testimonial illustration" />
        <div className={`mt-12 lg:mt-16 relative `}>
          <Image
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1 dark:opacity-70"
            src={quotationImg}
            alt=""
            aria-hidden="true"
          />
          <Image
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1 dark:opacity-70"
            src={quotationImg2}
            alt=""
            aria-hidden="true"
          />

          <MotionConfig
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div
              className={`relative whitespace-nowrap overflow-hidden`}
              {...handlers}
              role="region"
              aria-live="polite"
              aria-label="Testimonial carousel"
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants(200, 1)}
                  initial="enter"
                  animate="center"
                  // exit="exit"
                  className="inline-flex flex-col items-center text-center whitespace-normal"
                >
                  <>
                    <span className="block text-2xl text-neutral-900 dark:text-neutral-100">
                      {currentItem.content}
                    </span>
                    <span className="block mt-8 text-2xl font-semibold text-primary-700 dark:text-primary-400">
                      {currentItem.clientName}
                    </span>
                    <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-500 dark:text-neutral-400">
                      <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-500" />
                      <span>{currentItem.clientAddress}</span>
                    </div>
                  </>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-center space-x-2">
                {data.map((item, i) => (
                  <button
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === index 
                        ? "bg-primary-600 dark:bg-primary-500 scale-125" 
                        : "bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-400 dark:hover:bg-primary-600"
                    }`}
                    onClick={() => changeItemId(i)}
                    key={i}
                    aria-label={`Go to testimonial ${i + 1} from ${data[i].clientName}`}
                    aria-current={i === index ? "true" : "false"}
                  />
                ))}
              </div>
            </div>
          </MotionConfig>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectionClientSay;
