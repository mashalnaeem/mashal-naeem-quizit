import './App.scss';

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer"
// import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage/ProfileEditPage"
// import QuizListPage from "./pages/QuizListPage/QuizListPage";
// import QuizDetailsPage from "./pages/QuizDetailsPage/QuizDetailsPage";
import QuizCreatePage from "./pages/QuizCreatePage/QuizCreatePage";
// import QuizPlayPage from "./pages/QuizPlayPage/QuizPlayPage";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:userId/profile" element={<ProfilePage />} />
          <Route path="/:userId/profile/edit" element={<ProfileEditPage />} />
          {/* <Route path="/quizes" element={<QuizListPage />} />  */}
          {/* <Route path="/quizes/:id" element={<QuizDetailsPage />} />  */}
          {/* <Route path="/:userId/create" element={<QuizCreatePage />} /> */}
          {/* <Route path="/quizes/:id/play" element={<QuizPlayPage />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
       {/* <Route path="/home" element={<HomePage />} /> */}