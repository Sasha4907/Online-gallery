import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { IoIosHeart, IoMdText, IoMdEye } from "react-icons/io";
import DataField from "./DataField";

export default function PublishCard({ pictureId, artistName, pictureName, pictureTag, status, viewsCount, favorite, comment, paintiongUrl, role }) {
  const navigate = useNavigate();

  const onGroupClick = useCallback(() => {
    navigate(`/gallery/${pictureId}`);
  }, [navigate]);

  const ArtistElement= {
    "user": (
      <>
        <DataField name='Жанр картини' data={pictureTag}/>
      </>
    ),
    "artist": (
      <>
        {status && 
          <DataField
            name='Статус'
            data={status}
          />}
        <DataField
          name={<IoIosHeart className="w-5 h-5 text-black" />}
          data={favorite}
        />
        <DataField
          name={<IoMdText className="w-5 h-5 text-black" />}
          data={comment}
        />
        <DataField
          name={<IoMdEye className="w-5 h-5 text-black" />}
          data={viewsCount}
        />
      </>
    )
  }


  return (
    <div className="flex bg-white h-60 justify-between gap-6 rounded-xl text-lgi">
      <img className="h-full p-3 box-border object-cover"
        loading="lazy"
        alt="Picture"
        src={`http://localhost:5000${paintiongUrl}`}
      />
      <div className="flex flex-col gap-4 justify-center items-start">
        <DataField name='Художник' data={artistName} />
        <DataField name='Назва картини' data={pictureName} />
        {ArtistElement[role]}      
      </div>
      <div className="grid p-10 place-items-center">
        <button className="bg-transparent" onClick={onGroupClick}>
          <IoArrowForwardCircleOutline className="w-9 h-9 hover:text-silver"/> 
        </button>
      </div>
    </div>
  ) 
}