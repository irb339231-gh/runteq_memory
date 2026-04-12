import { useSwiper } from "swiper/react";

export const SlideNextButton = () => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slideNext()}>Next</button>;
};