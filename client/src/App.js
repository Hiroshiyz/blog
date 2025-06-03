import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import LoginComponent from "./components/login-component";
import RegisterComponent from "./components/register-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/authService";
import PostsComponent from "./components/Posts-component";
import AddPostComponent from "./components/addPost-component";
import EditPostComponent from "./components/editPost-component";
function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route
              path="login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="posts"
              element={
                <PostsComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="addPost"
              element={
                <AddPostComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />{" "}
            <Route
              path="editPost/:id"
              element={
                <EditPostComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
