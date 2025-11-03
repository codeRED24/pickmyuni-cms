import { Admin } from "@/components/admin";
import authProvider from "./auth/authProvider";
import { Resource, CustomRoutes } from "ra-core";
import { Dashboard } from "@/components/admin/Dashboard";
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
import {
  AuthorCreate,
  AuthorEdit,
  AuthorList,
  AuthorShow,
} from "./components/ra-lists/author";
import {
  CollegeCreate,
  CollegeEdit,
  CollegeList,
  CollegeShow,
} from "./components/ra-lists/colleges";
import {
  CityCreate,
  CityEdit,
  CityList,
  CityShow,
} from "./components/ra-lists/cities";
import {
  StateCreate,
  StateEdit,
  StateList,
  StateShow,
} from "./components/ra-lists/states";
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from "./components/ra-lists/courses";
import {
  CollegesCourseCreate,
  CollegesCourseEdit,
  CollegesCourseList,
  CollegesCourseShow,
} from "./components/ra-lists/collegesCourses";
import {
  TaskCreate,
  TaskEdit,
  TaskList,
  TaskShow,
} from "./components/ra-lists/tasks";
import {
  PromotionalCourseList,
  PromotionalCourseEdit,
  PromotionalCourseCreate,
  PromotionalCourseShow,
} from "./components/ra-lists/promotionalCourses";
import {
  ReviewList,
  ReviewEdit,
  ReviewShow,
} from "./components/ra-lists/reviews";
import {
  NewsletterList,
  NewsletterShow,
} from "./components/ra-lists/newsletters";
import {
  SubscriptionList,
  SubscriptionShow,
} from "./components/ra-lists/subscriptions";
import { ContactUsList, ContactUsShow } from "./components/ra-lists/contactUs";
import { LeadFormList, LeadFormShow } from "./components/ra-lists/leadForms";
import { UserList, UserShow } from "./components/ra-lists/users";
import { Link, Route } from "react-router-dom";
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
  Calendar,
  AlertTriangle,
  FileBadge,
  Star,
  Mail,
  UserPlus,
  Phone,
  FileText,
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
import { CollegeCoursePreviewPage } from "./components/collegeCourse/CollegeCoursePreviewPage";
import { CoursePreviewPage } from "./components/course/CoursePreviewPage";
import { SchedulerList } from "./components/scheduler/Scheduler";

import { dataProvider } from "./dataProvider";
import { StatePreviewPage } from "./components/states/StatePreviewPage";
import { Button } from "./components/ui/button";
import { LoginPageNew } from "./components/admin/login-page-new";

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
      loginPage={LoginPageNew}
    >
      <CustomRoutes>
        <Route path="/articles/:id/preview" element={<ArticlePreviewPage />} />
        <Route path="/cities/:id/preview" element={<CityPreviewPage />} />
        <Route
          path="/collegeswise-content/:id/preview"
          element={<CollegeContentPreviewPage />}
        />
        <Route path="/streams/:id/preview" element={<StreamPreviewPage />} />
        <Route path="/courses/:id/preview" element={<CoursePreviewPage />} />
        <Route
          path="/colleges-courses/:id/preview"
          element={<CollegeCoursePreviewPage />}
        />
        <Route path="/states/:id/preview" element={<StatePreviewPage />} />
        <Route
          path="/access-denied"
          element={
            <div className="h-screen w-auto flex items-center justify-center bg-gradient-to-br">
              <div className="max-w-md w-full mx-4">
                <div className="rounded-lg shadow-xl p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center pb-1">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-500 mb-3">
                    Access Denied
                  </h1>
                  <p className="text-gray-600 mb-6">
                    You don't have permission to access this resource. Please
                    contact your administrator if you believe this is a mistake.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.history.go(-2)}
                      className="w-full cursor-pointer"
                    >
                      Go Back
                    </Button>
                    <Button className="w-full cursor-pointer" asChild>
                      <Link to="/">Go to Dashboard</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </CustomRoutes>
      <Resource name="schedulers" list={SchedulerList} icon={Calendar} />
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
        show={AuthorShow}
        create={AuthorCreate}
        icon={Users}
      />
      <Resource
        name="colleges"
        list={CollegeList}
        edit={CollegeEdit}
        create={CollegeCreate}
        show={CollegeShow}
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
      <Resource
        name="states"
        list={StateList}
        edit={StateEdit}
        show={StateShow}
        create={StateCreate}
        icon={Map}
      />
      <Resource
        name="courses"
        list={CourseList}
        edit={CourseEdit}
        show={CourseShow}
        create={CourseCreate}
        icon={GraduationCap}
      />
      <Resource
        name="colleges-courses"
        list={CollegesCourseList}
        edit={CollegesCourseEdit}
        create={CollegesCourseCreate}
        show={CollegesCourseShow}
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
        show={TaskShow}
        icon={ListTodo}
      />
      <Resource name="media" list={MediaLibraryList} icon={Image} />
      <Resource
        name="promotional-courses"
        list={PromotionalCourseList}
        edit={PromotionalCourseEdit}
        create={PromotionalCourseCreate}
        show={PromotionalCourseShow}
        icon={FileBadge}
      />
      <Resource
        name="reviews"
        list={ReviewList}
        edit={ReviewEdit}
        show={ReviewShow}
        icon={Star}
      />
      <Resource
        name="newsletters"
        list={NewsletterList}
        show={NewsletterShow}
        icon={Mail}
      />
      <Resource
        name="subscriptions"
        list={SubscriptionList}
        show={SubscriptionShow}
        icon={UserPlus}
      />
      <Resource
        name="contact-us"
        list={ContactUsList}
        show={ContactUsShow}
        icon={Phone}
      />
      <Resource
        name="lead-forms"
        list={LeadFormList}
        show={LeadFormShow}
        icon={FileText}
      />
      <Resource name="users" list={UserList} show={UserShow} icon={Users} />
    </Admin>
  );
}
