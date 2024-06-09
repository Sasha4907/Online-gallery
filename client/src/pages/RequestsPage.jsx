import React, { useEffect, useCallback } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/slices/auth";
import DataField from "../components/DataField";
import PrimaryButton from "../components/PrimaryButton";
import BackgroundImage from "../components/BackgroundImage";
import { fetchProcessingPictures } from "../redux/slices/picture";
import axios from "../axios";

export default function RequestsPage() {
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pictures, status } = useSelector((state) => state.pictures);

  useEffect(() => {
    dispatch(fetchProcessingPictures());
  }, [dispatch]);

  const handleReturn = useCallback(() => {
    navigate(`/profileclientpage/${userId}`);
  }, [navigate, userId]);

  const handlePublish = useCallback(async (pictureId) => {
    try {
      const response = await axios.put(`/moderation/publish/${pictureId}`);
      if (response.status === 200) {
        dispatch(fetchProcessingPictures());
      }
    } catch (error) {
      console.error("Помилка публікації картини:", error);
    }
  }, [dispatch]);

  const handleReject = useCallback(async (pictureId) => {
    try {
      const response = await axios.put(`/moderation/reject/${pictureId}`);
      if (response.status === 200) {
        dispatch(fetchProcessingPictures());
      }
    } catch (error) {
      console.error("Помилка відхилення картини:", error);
    }
  }, [dispatch]);

  const handleSubmit = useCallback(async (e, pictureId, action) => {
    e.preventDefault();
    if (action === 'publish') {
      await handlePublish(pictureId);
      alert("Статус картини змінено!");
    } else if (action === 'reject') {
      await handleReject(pictureId);
      alert("Статус картини змінено!");
    }
  }, [handlePublish, handleReject]);

  return (
    <div className="grid gap-4 place-items-center pt-20">
      <button className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10" onClick={handleReturn}>
        <IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
      </button>
      <BackgroundImage src="pictures.png" />
      <div>
        {status === "loading" && <p className="text-white">Завантаження...</p>}
        {status === "failed" && <p className="text-white">Помилка завантаження зображень</p>}
        {status === "loaded" && pictures.length > 0 ? (
          pictures.map((picture, index) => (
            <div key={index} className="grid grid-cols-[40%_60%] w-[700px] bg-darkgray-200 overflow-hidden rounded-xl mb-8">
              <div className="h-full p-4">
                <img className="w-full h-[auto] object-cover" loading="lazy" alt="Picture"
                  src={`http://localhost:5000${picture.picture}`} />
              </div>
              <div className="flex flex-col items-center justify-between py-6 px-6">
                <div className="grid gap-4 text-xl">
                  <DataField name='Художник' data={picture.user.nikname} />
                  <DataField name='Назва картини' data={picture.title} />
                  <DataField name='Жанр' data={picture.tag} />
                  <DataField name='Опис' data={picture.text} />
                </div>
                <div className="grid gap-2 pt-10">
                  <form onSubmit={(e) => handleSubmit(e, picture._id, 'publish')}>
                    <PrimaryButton type="submit" className="text-black hover:bg-gray-200">Опубліковати</PrimaryButton>
                  </form>
                  <form onSubmit={(e) => handleSubmit(e, picture._id, 'reject')}>
                    <PrimaryButton type="submit" className="bg-red-500 hover:bg-red-700">Відмовити</PrimaryButton>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Немає картин на публікацію</p>
        )}
      </div>
    </div>
  );
}