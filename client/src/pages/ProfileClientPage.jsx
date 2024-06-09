import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "../components/Buttons";
import UserInfo from "../components/UserInfo";
import BackgroundImage from "../components/BackgroundImage";
import { IoIosHeart } from "react-icons/io";
import { selectUserId } from "../redux/slices/auth";
import axios from "../axios";

const ProfileClientPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const role = data.status;

  React.useEffect(() => {
    const userIdToFetch = id || userId;

    if (userIdToFetch) {
      axios
        .get(`/auth/user/${userIdToFetch}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.warn(err);
          alert(err.response?.data?.message || "Помилка при отриманні персональних даних");
        });
    }
  }, []);

  return (
    <>
      <BackgroundImage src="gallery.png"/>
      <div className="self-stretch flex flex-row overflow-hidden items-center justify-center w-full text-right text-xl text-black font-caladea pt-20">
        <div className="rounded-xl bg-white flex flex-col items-center justify-start py-[60px] box-border gap-5 max-w-full z-[1]">
          {role === "admin" && <div className="bg-red-500 text-white w-full py-1 text-center">Адміністратор</div>}
          <div className="grid gap-[100px] px-20">
            <UserInfo
              picture = {`http://localhost:5000${data.avatar}`}
              username = {data.nikname}
              name = {data.name}
              email = {data.email}
              registrationDate = {data.registrationDate}
            />
            
            <div className="grid gap-2">
              <Buttons role={role} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileClientPage;