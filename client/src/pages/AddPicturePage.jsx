import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";
import BackgroundImage from "../components/BackgroundImage";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import PrimaryButton from "../components/PrimaryButton";

export default function AddPicturePage() {
	const isAuth = useSelector(selectIsAuth);
	const userId = useSelector(selectUserId);
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [picture, setPicture] = useState('');
	const [tag, setTag] = useState('');
	const [text, setText] = useState('');
	const [isChecked, setIsChecked] = useState(false);
  
	useEffect(() => {
	  if (!window.localStorage.getItem('token') && !isAuth) {
		navigate("/");
	  }
	});

	const onGroupClick = useCallback(() => {
		navigate(`/profileclientpage/${userId}`);
	}, [navigate]);


	const handleChangeFile = async(event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const {data} = await axios.post('/upload', formData);
			setPicture(data.url);
		} catch (err) {
			console.warn(err);
			alert(err.response?.data?.message || 'Помилка при завантаженні файлу')
		}
	}

	const onSubmit = async(event) => {
		event.preventDefault();
		setLoading(true);
		if (!title || !picture || !tag || !text || !isChecked) {
			alert('Будь ласка, заповніть всі поля і підтвердіть своє ознайомлення з правилами сайту.');
			return;
		}

		try {
			const pictureData = {
				title,
				tag,
				text,
				picture,
				user: userId,
			};

			const { data } = await axios.post('/gallery/create', pictureData);
			alert('Картина відправлена на модерацію!')
			setTitle("");
			setPicture("");
			setTag("");
			setText("");
			setIsChecked(false);
		} catch (err) {
			console.warn(err);
			alert(err.response?.data?.message || 'Помилка при створенні')
} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid place-items-center h-dvh">
			<button className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10" onClick={onGroupClick}>
				<IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
			</button>
			<BackgroundImage/>
			<form onSubmit={onSubmit}>
				<div className="grid gap-6 bg-white rounded-xl px-10 w-[500px] py-10">
					<div className=" bg-gray-300 px-8 py-6 rounded-md">
						<input type="file" accept="image/*" className="pl-20 text-gray-500" onChange={handleChangeFile}/>
					</div>
					<div className="grid gap-2">
						<p>Назва картини</p>
						<Input className="w-full box-border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)}/>
					</div>
					<div className="grid gap-2">
						<p>Виберіть жанр</p>
						<select id="art-style" className="px-4 py-2 bg-gray-300 rounded-md" value={tag} onChange={(e) => setTag(e.target.value)}>
						<option tag="абстрактний">Абстрактний</option>
						<option tag="анімалістичний">Анімалістичний</option>
						<option tag="батальний">Батальний</option>
						<option tag="битовий">Битовий</option>
						<option tag="експресіонізм">Експресіонізм</option>
						<option tag="фантастичний">Фантастичний</option>
						<option tag="фігуративний">Фігуративний</option>
						<option tag="історичний">Історичний</option>
						<option tag="міфологічний">Міфологічний</option>
						<option tag="наївний">Наївний</option>
						<option tag="натюрморт">Натюрморт</option>
						<option tag="пейзаж">Пейзаж</option>
						<option tag="портрет">Портрет</option>
						<option tag="реалістичний">Реалістичний</option>
						<option tag="релігійний">Релігійний</option>
						<option tag="соціально-політичний">Соціально-політичний</option>
						<option tag="сюрреалістичний">Сюрреалістичний</option>
						</select>
					</div>
					<div className="grid gap-2">
						<p>Опис картини</p>
						<Textarea className="w-full rounded-md box-border font-candal" value={text} onChange={(e) => setText(e.target.value)}/>
					</div>
					<div className="flex gap-4">
						<input type="checkbox" className="accent-darkorange" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
						<p>Я підтверджую своє ознайомлення з правилами сайту та підтвержую, що я є власником авторських прав на дану картину.</p>
					</div>
					<PrimaryButton className="w-full bg-darkorange" type="submit" onClick={onSubmit}>Створити</PrimaryButton>
				</div>
			</form>
		</div>
	)
}