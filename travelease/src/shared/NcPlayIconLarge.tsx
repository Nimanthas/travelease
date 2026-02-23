import React, { FC } from "react";
import { useThemeMode } from "@/utils/useThemeMode";
import { getThemeColors, rgbToString } from "@/styles/theme-colors";

export interface NcPlayIcon2Props {
  className?: string;
  iconClass?: string;
}

const NcPlayIcon2: FC<NcPlayIcon2Props> = ({
  className = "w-8 h-8 md:w-10 md:h-10",
  iconClass = "w-5 h-5",
}) => {
  const { isDarkMode } = useThemeMode();
  const themeColors = getThemeColors(isDarkMode);
  const accentColor = rgbToString(themeColors.accent[500]);

  return (
    <div
      className={`nc-NcPlayIcon2 relative rounded-full shadow-inner transition-colors duration-300 ${className}`}
      style={{ backgroundColor: accentColor }}
      data-nc-id="NcPlayIcon2"
    >
      <span className="absolute inset-0 flex items-center justify-center text-white">
        <svg
          className={iconClass}
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          ></path>
        </svg>
      </span>
    </div>
  );
};

export default NcPlayIcon2;
