import {
  Admin,
  EditGuesser,
  ListGuesser,
  ShowGuesser,
} from "@/components/admin";
import authProvider from "./auth/authProvider";
import { fetchUtils, Resource, CustomRoutes } from "ra-core";
import { Card, CardContent } from "./components/ui/card";
import simpleRestProvider from "ra-data-simple-rest";
import { StreamList } from "./components/ra-lists/stream";
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
import { CityList } from "./components/ra-lists/citiesList";
import { StateList } from "./components/ra-lists/statesList";
import { CourseList } from "./components/ra-lists/coursesList";
import { CollegesCourseList } from "./components/ra-lists/collegesCoursesList";
import { TaskCreate, TaskEdit, TaskList } from "./components/ra-lists/tasks";
import { MediaLibraryList } from "./components/ra-lists/media";
import { Route } from "react-router-dom";
import ArticlePreviewPage from "./components/ra-lists/ArticlePreviewPage";

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

export default function App() {
  return (
    <Admin
      disableTelemetry
      requireAuth
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <CustomRoutes>
        <Route path="/articles/:id/preview" element={<ArticlePreviewPage />} />
      </CustomRoutes>
      <Resource
        name="articles"
        list={ArticleList}
        edit={ArticleEdit}
        show={ArticleShow}
        create={ArticleCreate}
      />
      <Resource name="authors" list={AuthorList} edit={AuthorEdit} />
      <Resource
        name="colleges"
        list={CollegeList}
        edit={CollegeEdit}
        create={CollegeCreate}
        show={ShowGuesser}
      />
      <Resource name="cities" list={CityList} edit={EditGuesser} />
      <Resource name="states" list={StateList} edit={EditGuesser} />
      <Resource name="courses" list={CourseList} edit={EditGuesser} />
      <Resource
        name="colleges-courses"
        list={CollegesCourseList}
        edit={EditGuesser}
      />
      <Resource
        name="collegeswise-content"
        list={ListGuesser}
        // edit={EditGuesser}
      />

      <Resource
        name="streams"
        list={StreamList}
        // edit={EditGuesser}
      />
      <Resource
        name="tasks"
        list={TaskList}
        edit={TaskEdit}
        create={TaskCreate}
      />
      <Resource name="media" list={MediaLibraryList} />
    </Admin>
  );
}
