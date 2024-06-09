import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigationType } from "react-router-dom";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import RegisterPage from "./pages/RegisterPage";
import PicturePage from "./pages/PicturePage";
import LogInPage from "./pages/LogInPage";
import NavBar from "./components/NavBar";
import ProfileClientPage from "./pages/ProfileClientPage";
import RequestsPage from "./pages/RequestsPage";
import PublishPageClient from "./pages/PublishPageClient";
import PublishPageArt from "./pages/PublishPageArt";
import ChangeProfile from "./pages/ChangeProfile";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AddPicturePage from "./pages/AddPicturePage";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const action = useNavigationType();

  const [role, setRole] = useState();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  console.log('AUTH',isAuth);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/loginpage" element={<LogInPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/gallerypage" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<PicturePage />} />
        <Route path="/profileclientpage/:id" element={<ProfileClientPage />} />
        <Route path="/changepasswordpage/:id" element={<ChangePasswordPage />} />
        <Route path="/changeprofile/:id" element={<ChangeProfile />} />
        <Route path="/publishpageclient/:id" element={<PublishPageClient />} />
        <Route path="/publishpageart/:id" element={<PublishPageArt />} />
        <Route path="/addpicturepage" element={<AddPicturePage />} />
        <Route path="/requestspage" element={<RequestsPage />} />
      </Routes>
    </>
  );
}

export default App;
