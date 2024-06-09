import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline, IoArrowForwardSharp } from "react-icons/io5";
import Painting from "../components/Painting";
import BackgroundImage from "../components/BackgroundImage";
import { selectUserId, selectUserRole } from "../redux/slices/auth";
import {
  fetchPictures,
  fetchPicturesByDate,
  fetchPicturesByPopularity,
  searchPicturesByName,
  searchPicturesByArtist,
  searchPicturesByTag,
  fetchRecommendations
} from "../redux/slices/picture";

function Sidebar({ onSortChange }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("");
  const userId = useSelector(selectUserId);
  const role = useSelector(selectUserRole);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");

  console.log("ROLE: ", role);

  const handleCriteriaChange = (value) => {
    setSearchCriteria(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log("value: ", value);
    if(value ==  'recommendations'){
      dispatch(fetchRecommendations(userId));
      setSort(value);
    } else {
      setSort(value);
      onSortChange(value);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
        dispatch(fetchPictures());
        return;
    }

    if (searchCriteria === "name") {
        dispatch(searchPicturesByName(searchTerm));
    } else if (searchCriteria === "artist") {
        dispatch(searchPicturesByArtist(searchTerm));
    } else if (searchCriteria === "tag") {
        dispatch(searchPicturesByTag(searchTerm));
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-10 flex flex-col gap-8 bg-white z-50 h-full ${
        isOpen ? "min-w-60" : "min-w-10"
      } overflow-hidden transition-all`}
    >
      <div className="flex justify-end">
        <button
          className="bg-transparent text-xl pt-5 pr-3"
          onClick={() => setIsOpen((prevValue) => !prevValue)}
        >
          <IoArrowForwardSharp
            className={isOpen ? "rotate-[-180deg]" : "rotate-0"}
          />
        </button>
      </div>
      <div className={!isOpen && "opacity-0 transition-opacity"}>
        <div className="flex justify-between px-2 py-1">
          <select
            id="sort"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="popular">За популярністю</option>
            <option value="public">За датою публікації</option>
            {role === "user" && (
              <option value="recommendations">За рекомендаціями</option>
            )}
          </select>
        </div>
        <div className="grid gap-2 p-4">
          <p>Пошук за критерієм:</p>
          <div className="grid gap-1 place-items-start ml-2 *:bg-transparent">
            <p>
              <input
                type="radio"
                name="searchCriteria"
                value="name"
                checked={searchCriteria === "name"}
                onChange={() => handleCriteriaChange("name")}
              />
              За назвою
            </p>
            <p>
              <input
                type="radio"
                name="searchCriteria"
                value="artist"
                checked={searchCriteria === "artist"}
                onChange={() => handleCriteriaChange("artist")}
              />
              За художником
            </p>
            <p>
              <input
                type="radio"
                name="searchCriteria"
                value="tag"
                checked={searchCriteria === "tag"}
                onChange={() => handleCriteriaChange("tag")}
              />
              За жанром
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Пошук"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
              type="submit" 
              className="w-8 rounded-md text-white bg-orange-500 p-2 hover:bg-orange-700"
              onClick={handleSearch}
          >
              <IoSearchOutline className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { pictures, status } = useSelector((state) => state.pictures);
  const [focusedCard, setFocusedCard] = useState(0);
  
  const scrollWidth = 384 + 24 * 2;
  const scrollStyle = {
    transform: `translateX(${scrollWidth * focusedCard}px)`,
  };

  const horizontalScroll = (e) => {
    if (e.deltaY < 0) {
      if (focusedCard === 0) return;
      setFocusedCard((prevCount) => prevCount + 1);
    } else if (e.deltaY > 0) {
      if (Math.abs(focusedCard) > pictures.length - 2) return;
      setFocusedCard((prevCount) => prevCount - 1);
    }
  };

  const paintingCards = pictures.map((picture, index) => (
    <Painting
      className="mt-10"
      key={index}
      id={picture._id}
      image={picture.picture}
      name={picture.title}
      description={picture.text}
    />
  ));

  const handleSortChange = (sort) => {
    if (sort === "public") {
      dispatch(fetchPicturesByDate());
    } else if (sort === "popular") {
      dispatch(fetchPicturesByPopularity());
    } else {
      dispatch(fetchPictures());
    }
  };

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  return (
    <>
      <BackgroundImage src="pictures.png" />
      <div className="flex h-dvh ml-16">
        <Sidebar onSortChange={handleSortChange} />
        <div
          className="grid grid-flow-col justify-items-center snap-x snap-mandatory transition-transform duration-300 gap-12 px-6 pt-10 *:snap-center"
          onWheel={horizontalScroll}
          style={scrollStyle}
        >
          {status === "loading" && <p className="text-white">Loading...</p>}
          {status === "failed" && (
            <p className="text-white">Error loading pictures</p>
          )}
          {status === "loaded" && paintingCards}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
