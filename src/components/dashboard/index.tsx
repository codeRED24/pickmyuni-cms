import { useGetIdentity } from "ra-core";
// import { OtherDashboard } from "./OtherDashboard";

export const Dashboard = () => {
  const { data: identity, isLoading, error } = useGetIdentity();

  if (isLoading)
    return (
      <div className="h-screen w-auto flex items-center justify-center bg-gradient-to-br">
        Loading...
      </div>
    );
  if (error) return <p>Error loading dashboard</p>;

  const role = identity?.role;

  switch (role) {
    case "admin":
    // return <AdminDashboard />;
    // case "team_lead":
    //   return <TeamLeadDashboard />;
    // case "content_writer":
    //   return <ContentWriterDashboard />;
    // case "data_entry":
    //   return <DataEntryDashboard />;
    // case "other":
    default:
      return null;
  }
};
