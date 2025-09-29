import { Admin, ListGuesser } from "@/components/admin";
import authProvider from "./auth/authProvider";
import { Resource } from "ra-core";
import { Card, CardContent } from "./components/ui/card";
import fakeDataProvider from "ra-data-fakerest";

// Dashboard
const Dashboard = () => (
  <Card style={{ margin: "2rem" }}>
    <CardContent>
      <h2>Welcome to Sandbox!</h2>
      <p>Try logging in with your real backend credentials.</p>
    </CardContent>
  </Card>
);

// Fake resources
const data = {
  dummy: [
    { id: 1, name: "Test item 1" },
    { id: 2, name: "Test item 2" },
  ],
  secret: [{ id: 1, name: "Secret info" }],
};

const dataProvider = fakeDataProvider(data, true); // log calls

export default function App() {
  return (
    <Admin
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="dummy" list={ListGuesser} />
      <Resource name="secret" list={ListGuesser} />
    </Admin>
  );
}
