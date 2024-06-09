import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/slices/auth";

function Button({ name, handleClick }) {

  return (
    <div
      className="w-full text-center rounded-xl bg-gainsboro-200 flex flex-row items-start justify-start pt-[13px] px-5 pb-3 box-border cursor-pointer z-[1]"
      onClick={handleClick}
    >
      <div className="h-[50px] relative rounded-xl bg-gainsboro-200 hidden max-w-full" />
      <div className="w-full relative inline-block text-xl z-[1] mq450:text-lgi">
        {name}
      </div>
    </div>
  )
}

const Buttons = ({ role }) => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  const ChangeProfile = useCallback(() => {
    navigate(`/changeprofile/${userId}`);
  }, [navigate]);

  const ChangePassword = useCallback(() => {
    navigate(`/changepasswordpage/${userId}`);
  }, [navigate]);

  const PublishPageUser = useCallback(() => {
    navigate(`/publishpageclient/${userId}`);
  }, [navigate]);

  const PublishPageArt = useCallback(() => {
    navigate(`/publishpageart/${userId}`);
  }, [navigate]);

  const AddPicturePage = useCallback(() => {
    navigate(`/addpicturepage`);
  }, [navigate]);

  const RequestsPage = useCallback(() => {
    navigate("/requestspage");
  }, [navigate]);


  const roleElements = {
    "user": (
      <Button
      name="Переглянути вподобання"
      handleClick={PublishPageUser}
      />
    ),
    "artist": (
      <>
        <Button
        name="Додати роботу"
        handleClick={AddPicturePage}
        />
        <Button
        name="Опубліковані роботи"
        handleClick={PublishPageArt}
        />
      </>
    ),
    "admin": (
      <Button
      name="Запити на публікацію"
      handleClick={RequestsPage}
      />
    ),
  }

  return (
    <div className="w-full flex-1 overflow-x-auto flex flex-col items-start justify-start gap-[20px] max-w-full mq675:gap-[16px]">
      <Button
        name="Редагувати профіль"
        handleClick={ChangeProfile}
      />
      <Button
        name="Змінити пароль"
        handleClick={ChangePassword}
      />
      {roleElements[role]}
    </div>
  );
};

export default Buttons;
