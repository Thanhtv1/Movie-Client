import { NextArrow, PrevArrow } from "./Arrow";

export const mainSliderSettings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 800,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
export const cardSliderSettings = {
  arrows: false,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  dots: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
  ],
};
