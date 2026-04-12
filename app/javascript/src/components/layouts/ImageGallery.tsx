// app/javascript/src/components/ImageGallery.tsx
import 'swiper/css'
import { Pagination, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton } from '../../hooks/SlideNextButton'
import { SlidePrevButton } from '../../hooks/SlidePrevButton'

type Props = {
  images: string[]
}

function ImageGallery({ images }: Props) {
  if (images.length === 0) return null

  return (
    <Swiper
      modules={[Pagination, Mousewheel]}
      spaceBetween={16}
      centeredSlides={true}
      slidesPerView={1}
      pagination={{ type: 'fraction' }}
      mousewheel={true}
      loop={images.length > 1}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`image-${index}`}
            className="h-64 w-full rounded-lg object-cover"
          />
        </SwiperSlide>
      ))}
      <div className="flex justify-between px-4">
        <SlidePrevButton />
        <SlideNextButton />
      </div>
    </Swiper>
  )
}

export default ImageGallery