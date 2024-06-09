import { useCallback } from "react";
import { IoIosLock, IoIosCall, IoIosContacts } from "react-icons/io";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const Footer = () => {
  const onGroupClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='rectangleImage']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <footer className="self-stretch bg-gainsboro-200 flex flex-row items-end justify-between pt-7 pb-8 pr-[99px] pl-[215px] box-border max-w-full gap-[20px] z-[3] text-left text-xl text-black font-caladea mq450:pl-5 mq450:pr-5 mq450:box-border mq750:flex-wrap mq750:pl-[107px] mq750:pr-[49px] mq750:box-border">
      <div className="h-56 w-[1440px] relative bg-gainsboro-200 hidden max-w-full" />
      <div className="w-[257px] flex flex-col items-start justify-start gap-[20.4px]">
        <div className="w-[237px] flex flex-row items-start justify-start py-0 px-[5px] box-border">
          <div className="flex-1 flex flex-row items-start justify-start gap-[22px]">
            <IoIosCall className="w-8 h-8 relative z-[1]" />
            <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0">
              <div className="self-stretch relative z-[1] mq450:text-lgi">
                Зв’язок з нами
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[19.9px]">
          <div className="flex flex-row items-start justify-start py-0 px-[3px]">
            <div className="flex flex-row items-start justify-start gap-[24px]">
              <IoIosContacts className="w-8 h-8 pt-1 relative z-[1]" />
              <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
                <div className="relative inline-block min-w-[93px] z-[1] mq450:text-lgi">
                  Про нас
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[22px]">
            <IoIosLock className="w-8 h-8 pt-2 relative z-[1]" />
            <div className="flex-1 flex flex-col items-start justify-start pt-3 px-0 pb-0">
              <div className="self-stretch relative z-[1] mq450:text-lgi">
                <a href="https://zilver.com.ua/uk/shho-take-avtorske-pravo-na-shho-vynykayut-avtorski-prava/" target="_blank" rel="noopener noreferrer" className="text-black underline-none">Авторські права</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[118px] flex flex-col items-start justify-start">
        <IoArrowUpCircleOutline
          className="w-[75px] h-[75px] relative cursor-pointer z-[1]"
          onClick={onGroupClick}
        />
      </div>
    </footer>
  );
};

export default Footer;
