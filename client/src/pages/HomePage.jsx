import React from 'react';
import NavBar from "../components/NavBar";
import Rating from "../components/Rating";
import TopFive from "../components/topFive";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen">
      <main className="flex flex-col items-start justify-start max-w-full self-stretch">
        <section className="h-[785px] relative w-full text-6xl text-white font-archivo-black">
          <img
            className="absolute h-full w-full object-cover"
            loading="lazy"
            alt=""
            src="/main.png"
            data-scroll-to="rectangleImage"
          />
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-neutral-900" />
          <h1 className="absolute top-[220px] left-[111px] text-inherit tracking-[0.14em] font-normal font-inherit inline-block z-[1] mq750:text-2xl">
            AleRia
          </h1>
          <div className="absolute top-[406px] left-[111px] text-xl font-candal inline-block min-w-[95px] z-[1] mq450:text-lgi">
            Розширюйте межі мистецтва разом із нашою галереєю.
          </div>
          <div className="absolute top-[46px] left-[111px] w-[702px] h-[391px]" />
        </section>
        <section className="flex flex-col items-center justify-start bg-neutral-900 self-stretch px-5 py-5 box-border gap-5 max-w-full text-center text-xl text-white font-candal lg:pt-[210px] lg:pb-[51px] mq450:pb-[21px]">
          <div className="w-full flex flex-row items-start justify-center max-w-full">
            <h1 className="w-[360px] relative text-inherit font-normal font-inherit inline-block max-w-full z-[3] mq450:text-5xl mq1050:text-13xl">
              Популярні роботи
            </h1>
          </div>
          <TopFive />
          <div className="w-full flex flex-row items-start justify-center max-w-full">
            <h1 className="w-[304px] relative text-inherit font-normal font-inherit inline-block з-[3] mq450:text-5xl">
              Рейтинг місяця
            </h1>
          </div>
          <Rating />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;