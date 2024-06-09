import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosHeart, IoMdText } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { addFavorite, removeFavorite, checkIfFavorite } from "../redux/slices/favorite";

export default function Painting({ id, image, name, description, className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorite.favorites[id]);
  const status = useSelector((state) => state.favorite.status);

  useEffect(() => {
    dispatch(checkIfFavorite(id));
  }, [dispatch, id]);

  const handleLikeClick = async () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  const AddComment = useCallback(() => {
    navigate(`/gallery/${id}`);
  }, [navigate, id]);

  return (
    <div
      className={twMerge(
        "group/painting flex flex-col w-[22rem] bg-darkgray-200 rounded-xl h-[32rem] mb-[90px] hover:h-[38rem] hover:mb-0 transition-all",
        className
      )}
    >
      <div className="p-4 h-full">
        <img
          className="w-full max-h-[25rem] object-cover overflow-hidden"
          src={`http://localhost:5000${image}`}
          loading="lazy"
          alt="picture"
        />
      </div>
      <div className="px-6 py-2 transition-all ease-linear group-hover/painting:max-h-40">
        <div className="flex items-center justify-between gap-6">
          <p className="text-lgi text-white">{name}</p>
          <div className="flex items-center gap-4 *:cursor-pointer">
            <button
              className="w-[2.8rem] h-[2.8rem] mt-1 bg-transparent"
              onClick={handleLikeClick}
              disabled={status === 'loading'}
            >
              <IoIosHeart
                className={`w-full h-full ${isFavorite ? 'text-rose-700' : 'text-white'}`}
              />
            </button>
            <button
              className="w-[2.8rem] h-[2.8rem] bg-transparent"
              onClick={AddComment}
            >
              <IoMdText className="w-full h-full text-white hover:text-gray-300" />
            </button>
          </div>
        </div>
        <div className="w-full h-[0.05rem] bg-white my-4 opacity-0 group-hover/painting:opacity-100 transition-opacity" />
        <div className="bg-transparent w-full h-20 text-lgi overflow-auto text-white opacity-0 group-hover/painting:opacity-100 transition-opacity">
          {description}
        </div>
      </div>
    </div>
  );
}