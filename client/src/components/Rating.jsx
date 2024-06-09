import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FrameComponent from "./FrameComponent";
import { fetchMostPopularPictureLastMonth } from "../redux/slices/picture";

const Rating = () => {
  const dispatch = useDispatch();
  const { mostPopularLastMonth, status } = useSelector(state => state.pictures);

  useEffect(() => {
    dispatch(fetchMostPopularPictureLastMonth());
  }, [dispatch]);

  return (
    <div className="w-[1243px] rounded-41xl bg-gainsboro-200 flex flex-row items-start justify-between pt-5 pb-20 pr-[116px] pl-[114px] box-border max-w-full gap-[20px] z-[3] text-xl text-black font-candal lg:flex-wrap lg:justify-center mq750:pt-5">
      <div className="h-[617px] w-full flex flex-row items-start justify-around gap-[20px] max-w-full">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading pictures</p>}
        {status === 'loaded' && mostPopularLastMonth && (
        <>
          <FrameComponent prop="Картина місяця" picture={mostPopularLastMonth.picture} Artist="" />
          <FrameComponent prop="Художник місяця" picture={mostPopularLastMonth.user.avatar} Artist={mostPopularLastMonth.user.name} />
        </>
        )}
      </div>
    </div>
  );
};

export default Rating;
