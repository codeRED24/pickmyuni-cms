import { Admin, EditGuesser, ShowGuesser } from "@/components/admin";
import authProvider from "./auth/authProvider";
import { fetchUtils, Resource, CustomRoutes } from "ra-core";
import { Card, CardContent } from "./components/ui/card";
import simpleRestProvider from "ra-data-simple-rest";
import {
  StreamCreate,
  StreamEdit,
  StreamList,
  StreamShow,
} from "./components/ra-lists/stream";
import {
  ArticleCreate,
  ArticleEdit,
  ArticleList,
  ArticleShow,
} from "./components/ra-lists/articles";
import { AuthorEdit, AuthorList } from "./components/ra-lists/author";
import {
  CollegeCreate,
  CollegeEdit,
  CollegeList,
} from "./components/ra-lists/colleges";
import {
  CityCreate,
  CityEdit,
  CityList,
  CityShow,
} from "./components/ra-lists/cities";
import { StateList } from "./components/ra-lists/statesList";
import { CourseList } from "./components/ra-lists/coursesList";
import { CollegesCourseList } from "./components/ra-lists/collegesCoursesList";
import { TaskCreate, TaskEdit, TaskList } from "./components/ra-lists/tasks";
import { Route } from "react-router-dom";
import ArticlePreviewPage from "./components/articles/ArticlePreviewPage";
import CityPreviewPage from "./components/cities/CityPreviewPage";
import { MediaLibraryList } from "./components/media";
import {
  University,
  Newspaper,
  Users,
  Building2,
  Map,
  GraduationCap,
  BookMarked,
  FileStack,
  Workflow,
  ListTodo,
  Image,
} from "lucide-react";
import {
  CollegeswiseContentCreate,
  CollegeswiseContentEdit,
  CollegeswiseContentList,
  CollegeswiseContentShow,
} from "./components/ra-lists/college-content";
import { CollegeContentPreviewPage } from "./components/college-content/CollegeContentPreviewPage";
import { QueryClient } from "@tanstack/react-query";
import { StreamPreviewPage } from "./components/streams/StreamPreviewPage";

const API_URL = import.meta.env.VITE_APP_API_URL + "/api/v1/cms";

// Dashboard
const Dashboard = () => (
  <Card style={{ margin: "2rem" }}>
    <CardContent>
      <h2>Dashboard coming soon</h2>
    </CardContent>
  </Card>
);

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_URL, httpClient);

const queryClient = new QueryClient();

export default function App() {
  return (
    <Admin
      disableTelemetry
      requireAuth
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
      queryClient={queryClient}
    >
      <CustomRoutes>
        <Route path="/articles/:id/preview" element={<ArticlePreviewPage />} />
        <Route path="/cities/:id/preview" element={<CityPreviewPage />} />
        <Route
          path="/collegeswise-content/:id/preview"
          element={<CollegeContentPreviewPage />}
        />
        <Route path="/streams/:id/preview" element={<StreamPreviewPage />} />
      </CustomRoutes>
      <Resource
        name="articles"
        list={ArticleList}
        edit={ArticleEdit}
        show={ArticleShow}
        create={ArticleCreate}
        icon={Newspaper}
      />
      <Resource
        name="authors"
        list={AuthorList}
        edit={AuthorEdit}
        icon={Users}
      />
      <Resource
        name="colleges"
        list={CollegeList}
        edit={CollegeEdit}
        create={CollegeCreate}
        show={ShowGuesser}
        icon={University}
      />
      <Resource
        name="cities"
        list={CityList}
        edit={CityEdit}
        create={CityCreate}
        show={CityShow}
        icon={Building2}
      />
      <Resource name="states" list={StateList} edit={EditGuesser} icon={Map} />
      <Resource
        name="courses"
        list={CourseList}
        edit={EditGuesser}
        icon={GraduationCap}
      />
      <Resource
        name="colleges-courses"
        list={CollegesCourseList}
        edit={EditGuesser}
        icon={BookMarked}
      />
      <Resource
        name="collegeswise-content"
        list={CollegeswiseContentList}
        edit={CollegeswiseContentEdit}
        create={CollegeswiseContentCreate}
        show={CollegeswiseContentShow}
        icon={FileStack}
      />
      <Resource
        name="streams"
        list={StreamList}
        edit={StreamEdit}
        show={StreamShow}
        create={StreamCreate}
        icon={Workflow}
      />
      <Resource
        name="tasks"
        list={TaskList}
        edit={TaskEdit}
        create={TaskCreate}
        icon={ListTodo}
      />
      <Resource name="media" list={MediaLibraryList} icon={Image} />
    </Admin>
  );
}
