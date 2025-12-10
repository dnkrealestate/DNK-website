// "use client";

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// // import slidImg1 from "@/public/assets/other/islandsSlider1.webp";
// // import slidImg2 from "@/public/assets/other/islandsSlider2.webp";
// // import slidImg3 from "@/public/assets/other/islandsSlider3.webp";
// // import slidImg4 from "@/public/assets/other/islandsSlider4.webp";
// // import slidImg5 from "@/public/assets/other/islandsSlider5.webp";
// // import slidImg6 from "@/public/assets/other/islandsSlider6.webp";
// import ADmodel from "./ADmodel";


// const ADimgSlider = ({promotion}) => {
//   const [ShowPopup, setShowPopup] = useState(false);
//   const slidImg1 = promotion?.sliderImg1 ? `${WWURL}${promotion.sliderImg1}` : null;
//   const slidImg2 = promotion?.sliderImg2 ? `${WWURL}${promotion.sliderImg2}` : null;
//   const slidImg3 = promotion?.sliderImg3 ? `${WWURL}${promotion.sliderImg3}` : null;
//   const slidImg4 = promotion?.sliderImg4 ? `${WWURL}${promotion.sliderImg4}` : null;
//   const slidImg5 = promotion?.sliderImg5 ? `${WWURL}${promotion.sliderImg5}` : null;
//   const slidImg6 = promotion?.sliderImg6 ? `${WWURL}${promotion.sliderImg6}` : null;

//   const sliderImages = [
//     slidImg1,
//     slidImg2,
//     slidImg3,
//     slidImg4,
//     slidImg5,
//     slidImg6,
//   ];

//   return (
//     <div className="container max-w-[1240px] py-6 px-4 m-auto">
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={10}
//         slidesPerView={5}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         breakpoints={{
//           0: {
//             slidesPerView: 2,
//           },
//           640: {
//             slidesPerView: 2,
//           },
//           992: {
//             slidesPerView: 4,
//           },
//           1200: {
//             slidesPerView: 5,
//           },
//         }}
//         loop={true}
//         className="w-full"
//       >
//         {sliderImages.map((img, index) => (
//           <SwiperSlide
//             key={index}
//             className={index % 2 === 0 ? "pt-[60px]" : ""}
//           >
//             {slidImg1?(<div
//               className="w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center cursor-pointer"
//               style={{ backgroundImage: `url(${img.src})` }}
//               onClick={() => setShowPopup(true)}
//             />):( 
//               <div className="h-[300px] md:h-[450px] w-full bg-gray-600 animate-pulse"></div>
//             )}
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {ShowPopup && <ADmodel onClose={() => setShowPopup(false)} />}
//     </div>
//   );
// };

// export default ADimgSlider;
