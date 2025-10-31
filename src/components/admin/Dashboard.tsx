import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ContentStatus from "./ContentStatus";

export const Dashboard = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Content Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ContentStatus />
      </CardContent>
    </Card>
  );
};
