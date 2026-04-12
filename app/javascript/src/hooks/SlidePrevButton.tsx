import { useSwiper } from "swiper/react";

export const SlidePrevButton = () => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slidePrev()}>Prev</button>;
};