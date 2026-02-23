import React, { FC } from "react";
import { useThemeMode } from "@/utils/useThemeMode";
import { getThemeColors, rgbToString } from "@/styles/theme-colors";

export interface NcPlayIconProps {
  className?: string;
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = "" }) => {
  const { isDarkMode } = useThemeMode();
  const themeColors = getThemeColors(isDarkMode);
  const accentColor = rgbToString(themeColors.accent[500]);

  return (
    <div
      className={`nc-NcPlayIcon bg-white bg-opacity-30 backdrop-filter backdrop-blur rounded-full w-20 h-20 p-3 lg:w-52 lg:h-52 lg:p-12 ${className}`}
      data-nc-id="NcPlayIcon"
    >
      <div 
        className="w-full h-full rounded-full relative transition-colors duration-300"
        style={{ backgroundColor: accentColor }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-white">
          <svg
            className="w-8 h-8 md:w-12 md:h-12"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NcPlayIcon;
