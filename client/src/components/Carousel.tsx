// JUST BACKUP 👽👽👽

"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSProperties } from "react";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";

export default function Carousel({ users }: any) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      loop={true}
      slidesPerView={1}
      spaceBetween={50}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      className="w-full text-center my-10"
      style={
        {
          "--swiper-navigation-color": "#FEDE3C",
        } as CSSProperties
      }
    >
      {users?.map((user: any) => {
        return (
          <SwiperSlide key={user.id}>
            <Link
              href={`/psiky/${user.id}`}
              className="relative block min-w-[200px] max-w-[250px] py-2 mx-auto hover:bg-gray-300 mb-8 border-8 border-theme-light rounded-3xl transition"
            >
              <Image
                src={user.image}
                alt="user image"
                width={200}
                height={200}
                className="mx-auto object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
              <h2 className="w-full absolute -bottom-10 text-4xl font-titan text-stroke-bold-transparent border-8 border-theme-light rounded-2xl bg-theme-pink">
                {user.firstName}
              </h2>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
