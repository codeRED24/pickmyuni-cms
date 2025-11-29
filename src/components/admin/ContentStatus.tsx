import { useQuery } from "@tanstack/react-query";
import { fetchUtils } from "ra-core";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";
import {
  FileText,
  Newspaper,
  BookMarked,
  FileStack,
  GraduationCap,
  Building2,
  Map,
  Workflow,
  Clock,
  XCircle,
  CheckCircle,
  Calendar,
  Trash2,
  ClipboardList,
} from "lucide-react";
import { NumberTicker } from "../ui/number-ticker";
import { JSX } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "../ui/chart";
import { BlurFade } from "../ui/blur-fade";

type StatusCounts = Record<string, number>;
type DashboardStatus = Record<string, StatusCounts>;

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const resourceMap: { [key: string]: string } = {
  articles: "articles",
  collegesCourses: "colleges-courses",
  collegewiseContent: "collegeswise-content",
  courses: "courses",
  exams: "exams",
  city: "cities",
  state: "states",
  stream: "streams",
};

const ICONS_MAP: Record<string, JSX.Element> = {
  articles: <Newspaper />,
  collegesCourses: <BookMarked />,
  collegewiseContent: <FileStack />,
  courses: <GraduationCap />,
  exams: <ClipboardList />,
  city: <Building2 />,
  state: <Map />,
  stream: <Workflow />,
};

const statusIconsMap: { [key: string]: JSX.Element } = {
  DRAFT: <FileText className="w-8 h-8 text-muted-foreground" />,
  PENDING: <Clock className="w-8 h-8 text-muted-foreground" />,
  REJECTED: <XCircle className="w-8 h-8 text-muted-foreground" />,
  PUBLISHED: <CheckCircle className="w-8 h-8 text-muted-foreground" />,
  SCHEDULED: <Calendar className="w-8 h-8 text-muted-foreground" />,
  DELETED: <Trash2 className="w-8 h-8 text-muted-foreground" />,
};

const chartConfig = {
  DRAFT: {
    label: "Draft",
    color: "var(--chart-1)",
  },
  PENDING: {
    label: "Pending",
    color: "var(--chart-2)",
  },
  REJECTED: {
    label: "Rejected",
    color: "var(--chart-3)",
  },
  PUBLISHED: {
    label: "Published",
    color: "var(--chart-4)",
  },
  SCHEDULED: {
    label: "Scheduled",
    color: "var(--chart-5)",
  },
  DELETED: {
    label: "Deleted",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

const ContentStatus = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<
    { status: DashboardStatus },
    Error
  >({
    queryKey: ["contentStatus"],
    queryFn: async () => {
      const API_URL = import.meta.env.VITE_APP_API_URL + "/api/v1/cms";
      const resp = await httpClient(`${API_URL}/dashboard`, {});
      return {
        status: resp.json.data as DashboardStatus,
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { status } = data;

  const handleClick = (contentType: string, statusValue: string) => {
    const resourceName = resourceMap[contentType];
    if (resourceName) {
      const filter = JSON.stringify({ status: statusValue });
      navigate(`/${resourceName}?filter=${filter}`);
    }
  };

  const totalCounts: StatusCounts = Object.values(status).reduce(
    (acc: StatusCounts, counts: StatusCounts) => {
      for (const key in counts) {
        acc[key] = (acc[key] || 0) + counts[key];
      }
      return acc;
    },
    {} as StatusCounts
  );

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(totalCounts).map(([statusKey, count], i) => (
          <BlurFade key={statusKey} delay={i * 0.25} inView>
            <div className="bg-background dark:bg-card p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">{statusKey}</p>
                <NumberTicker
                  value={count as number}
                  className="text-2xl font-bold"
                />
              </div>
              {statusIconsMap[statusKey]}
            </div>
          </BlurFade>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Object.entries(status).map(([contentType, counts], i) => {
          const chartData = Object.entries(counts).map(([k, v]) => ({
            name:
              k in chartConfig
                ? chartConfig[k as keyof typeof chartConfig].label
                : k,
            key: k,
            value: v,
          }));

          return (
            <BlurFade key={contentType} delay={i * 0.25} inView>
              <div className="bg-background dark:bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-x-2 mb-4">
                  {ICONS_MAP[contentType]}
                  <h3 className="text-lg font-semibold capitalize">
                    {contentType}
                  </h3>
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="w-full h-[300px]"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 10,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} />
                    <YAxis />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />

                    <Bar dataKey="value" radius={6}>
                      <LabelList
                        dataKey="value"
                        position="top"
                        offset={6}
                        className="fill-foreground"
                        fontSize={12}
                      />
                      {chartData.map((d) => (
                        <Cell
                          key={`${contentType}-${d.key}`}
                          fill={`var(--color-${d.key})`}
                          onClick={() => handleClick(contentType, d.key)}
                          cursor="pointer"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
};

export default ContentStatus;
