import { Admin, EditGuesser, ListGuesser } from "@/components/admin";
import authProvider from "./auth/authProvider";
import { fetchUtils, Resource } from "ra-core";
import { Card, CardContent } from "./components/ui/card";
import simpleRestProvider from "ra-data-simple-rest";
import { ArticleList } from "./components/ra-lists/articlesLis";
import { AuthorEdit, AuthorList } from "./components/ra-lists/author";
import { CollegeList } from "./components/ra-lists/collegesList";
import { CityList } from "./components/ra-lists/citiesList";
import { StateList } from "./components/ra-lists/statesList";
import { CourseList } from "./components/ra-lists/coursesList";
import { CollegesCourseList } from "./components/ra-lists/collegesCoursesList";

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
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="articles" list={ArticleList} edit={EditGuesser} />
      <Resource name="authors" list={AuthorList} edit={AuthorEdit} />
      <Resource name="colleges" list={CollegeList} edit={EditGuesser} />
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
    </Admin>
  );
}
