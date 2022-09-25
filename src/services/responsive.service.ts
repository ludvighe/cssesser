import { createSignal, onCleanup, onMount } from "solid-js";

export const responsive = {
  mobile: 650,
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = createSignal(
    window.screen.availWidth <= responsive.mobile
  );
  const handleOnResize = (e: any) => {
    if (window.screen.availWidth <= responsive.mobile) {
      console.log("is mobile");
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  onMount(() => {
    window.addEventListener("resize", handleOnResize);
  });
  onCleanup(() => {
    window.removeEventListener("resize", handleOnResize);
  });

  return isMobile;
};
