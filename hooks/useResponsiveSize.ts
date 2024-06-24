import { useState, useEffect } from "react";

const useResponsiveSize = (): "xs" | "lg" => {
  const [size, setSize] = useState<"xs" | "lg">("xs"); // Default to 'sm'

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setSize("lg"); // Large screens
      } else {
        setSize("xs"); // Small screens
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Set the initial size

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useResponsiveSize;
