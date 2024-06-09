import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FrameComponent from "./FrameComponent";
import { fetchTopFivePictures } from "../redux/slices/picture";

const TopFive = () => {
    const dispatch = useDispatch();
    const { topFive, status } = useSelector(state => state.pictures);

    useEffect(() => {
        dispatch(fetchTopFivePictures());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    };

    return (
        <div className="w-2/3">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading pictures</p>}
            {status === 'loaded' && topFive && (
                <Slider {...settings} >
                    {topFive.map((frame, index) => (
                        <FrameComponent key={index} picture={frame.picture} />
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default TopFive;