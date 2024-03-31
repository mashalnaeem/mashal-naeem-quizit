import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import JoinPage from "./pages/JoinPage/JoinPage"; 
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage/ProfileEditPage"
import QuizListPage from "./pages/QuizListPage/QuizListPage";
import QuizDetailsPage from "./pages/QuizDetailsPage/QuizDetailsPage";
import QuizCreatePage from "./pages/QuizCreatePage/QuizCreatePage";
import UserQuizPage from "./pages/UserQuizPage/UserQuizPage"
import QuizPlayPage from "./pages/QuizPlayPage/QuizPlayPage";
import BroadcastPage from "./pages/BroadcastPage/BroadcastPage";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} /> 
          <Route path="/:userId/profile" element={<ProfilePage />} />
          <Route path="/:userId/profile/edit" element={<ProfileEditPage />} />
          <Route path="/:userId/quizzes" element={<QuizListPage />} />
          <Route path="/:userId/quizzes/:quizId" element={<QuizDetailsPage />} />
          <Route path="/:userId/create" element={<QuizCreatePage mode="add" />} />
          <Route path="/:userId/user_quizzes/edit/:quizId" element={<QuizCreatePage mode="edit" />} />
          <Route path="/:userId/user_quizzes" element={<UserQuizPage />} />
          <Route path="/:userId/quizzes/:quizId/play" element={<QuizPlayPage />} />
          <Route path="/:userId/quizzes/:quizId/broadcast" element={<BroadcastPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

