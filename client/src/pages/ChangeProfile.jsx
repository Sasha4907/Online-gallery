import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import BackgroundImage from "../components/BackgroundImage";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { selectUserId, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";

export default function ChangeProfile() {
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(selectUserId);
	const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nikname, setNikname] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChangeFile = async(event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const {data} = await axios.post('/upload', formData);
			setAvatar(data.url);
		} catch (err) {
			console.warn(err);
			alert(err.response?.data?.message || 'Помилка при завантаженні файлу')
		}
	}

  const handleChangeUser = async(event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const UserData = { nikname, name, avatar };
			const { data } = await axios.patch(`/auth/user/info/${userId}`, UserData);
			alert('Дані змінено!')
      navigate(`/profileclientpage/${userId}`);
		} catch (err) {
			console.warn(err);
			alert(err.response?.data?.message || 'Помилка при зміні даних користувача')
    } finally {
			setLoading(false);
		}
	};

  useEffect(() => {
    if (!window.localStorage.getItem('token') && !isAuth) {
      navigate("/");
    }
  });

	const onGroupClick = useCallback(() => {
		navigate(`/profileclientpage/${userId}`);
	}, [navigate]);

  return (
    <>
      <BackgroundImage src="gallery.png"/>
      <button className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10" onClick={onGroupClick}>
        <IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
      </button>
      <div className="grid place-items-center h-dvh">
        <form className="grid place-items-center bg-white px-8 py-12 rounded-3xl" onSubmit={handleChangeUser}>
          <div className="flex gap-20 bg-white rounded-3xl">
            <div className="shrink-0 relative cursor-pointer">
              <label htmlFor="profile-photo" className="block mb-2">
                <div className="h-60 w-40 p-3 box-border object-cover overflow-hidden bg-gray-300">
                {avatar ? (
                  <img src={`http://localhost:5000${avatar}`} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="block text-center pt-20 text-gray-500">Прикріпити фото<IoIosAddCircleOutline className="w-6 h-6"/></span>
                )}
                </div>
              </label>
              <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={handleChangeFile} />
            </div>
            <div className="flex flex-col gap-4 w-full justify-center items-end">
              <div className="flex gap-4 items-center">
                <p>Псевдонім:</p>
                <Input placeholder="введіть псевдонім" value={nikname} onChange={(e) => setNikname(e.target.value)}/>
              </div>
              <div className="flex gap-4 items-center">
                <p>Ім'я:</p>
                <Input placeholder="введіть ім'я" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
            </div>
          </div>
          <PrimaryButton className="bg-darkorange font-caladea" type="submit" onClick={handleChangeUser}>Зберегти</PrimaryButton>
        </form>
      </div>
    </>
  );
}
