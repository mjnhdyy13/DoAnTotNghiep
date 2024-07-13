import DashBoard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import Promotion from "../pages/Promotion/Promotion";
import GenreDetail from "../pages/GenreDetail/GenreDetail";
import NotFound from "../pages/NotFound/NotFound";
import BookDetail from "../pages/BookDetail/BookDetail";
import ReadBook from "../pages/ReadBook/ReadBook";
import PostBook from "../pages/PostBook/PostBook";
import PostChapter from "../pages/PostChapter/PostChapter";
import AuthLayout from "../layouts/AuthLayout";
import Account from "../pages/Account/Account";
import Findbook from "../pages/FindBook/Findbook";
import PlayMusic from "../pages/PlayMusic/PlayMusic";
import MusicDetail from "../pages/MusicDetail/MusicDetail";

const publicRoutes = [
  { path: "/login", component: Login, layout: AuthLayout },
  { path: "/register", component: Register, layout: AuthLayout },
  { path: "/", component: DashBoard },
  { path: "/promotion", component: Promotion },
  { path: "/genre-detail", component: GenreDetail },
  { path: "/book-detail", component: BookDetail },
  { path: "/music-detail", component: MusicDetail },
  { path: "/read-book", component: ReadBook },
  { path: "/post-book", component: PostBook },
  { path: "/post-chapter", component: PostChapter },
  { path: "/find-book", component: Findbook },
  { path: "/play-music", component: PlayMusic },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
