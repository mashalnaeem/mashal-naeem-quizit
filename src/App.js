import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer"
// import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage/ProfileEditPage"
import QuizListPage from "./pages/QuizListPage/QuizListPage";
import QuizDetailsPage from "./pages/QuizDetailsPage/QuizDetailsPage";
import QuizCreatePage from "./pages/QuizCreatePage/QuizCreatePage";
import QuizPlayPage from "./pages/QuizPlayPage/QuizPlayPage";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:userId/profile" element={<ProfilePage handleShow={handleShow} />} />
          <Route path="/:userId/profile/edit" element={<ProfileEditPage howModal={showModal} handleClose={handleClose} />} />
          <Route path="/quizzes" element={<QuizListPage />} /> 
          <Route path="/quizzes/:quizId" element={<QuizDetailsPage />} /> 
          {/* <Route path="/:userId/create" element={<QuizCreatePage />} /> */}
          <Route path="/quizzes/:quizId/play" element={<QuizPlayPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
       {/* <Route path="/home" element={<HomePage />} /> */}