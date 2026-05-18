import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Users, AlertTriangle, CalendarCheck } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { HealthRecord } from "@shared/schema";

export default function Analytics() {
  const { data: records, isLoading } = useQuery<HealthRecord[]>({
    queryKey: ["/api/records"],
  });

  // Calculate Summary Metrics
  const totalAssessments = records?.length || 0;
  const highRiskCount = records?.filter((r) => r.riskLevel === "High").length || 0;
  const highRiskPercentage = totalAssessments > 0 ? Math.round((highRiskCount / totalAssessments) * 100) : 0;
  const mostRecentAssessment = records && records.length > 0 
    ? format(new Date(records[0].createdAt), "MMM d, yyyy") 
    : "No records yet";

  // Data for Risk Distribution Pie Chart
  const riskCounts = { Low: 0, Moderate: 0, High: 0 };
  records?.forEach((r) => {
    if (r.riskLevel === "Low" || r.riskLevel === "Moderate" || r.riskLevel === "High") {
      riskCounts[r.riskLevel as keyof typeof riskCounts]++;
    }
  });

  const pieData = [
    { name: "Low Risk", value: riskCounts.Low, fill: "var(--color-low)" },
    { name: "Moderate Risk", value: riskCounts.Moderate, fill: "var(--color-moderate)" },
    { name: "High Risk", value: riskCounts.High, fill: "var(--color-high)" },
  ];

  const pieChartConfig = {
    low: { label: "Low Risk", color: "#22c55e" },
    moderate: { label: "Moderate Risk", color: "#eab308" },
    high: { label: "High Risk", color: "#ef4444" },
  };

  // Data for Timeline Bar Chart (Assessments per day)
  const timelineMap: Record<string, number> = {};
  records?.forEach((r) => {
    // records are sorted newest first, but format gives us strings like "May 15"
    const dateStr = format(new Date(r.createdAt), "MMM d");
    timelineMap[dateStr] = (timelineMap[dateStr] || 0) + 1;
  });

  // Convert map to array and reverse to show oldest to newest on X-axis
  const timelineData = Object.keys(timelineMap)
    .map((date) => ({
      date,
      assessments: timelineMap[date],
    }))
    .reverse();

  const barChartConfig = {
    assessments: { label: "Assessments", color: "hsl(var(--primary))" },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground mb-4">
            Community Analytics
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor aggregate health statistics and assessment volume over time to identify community trends.
          </p>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center bg-accent/30 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground animate-pulse">Loading analytics data...</p>
          </div>
        ) : !records || records.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-accent/30 rounded-2xl border border-dashed border-border text-center p-6">
            <h3 className="text-xl font-heading font-semibold mb-2">No Data Available</h3>
            <p className="text-muted-foreground">Start conducting and saving assessments to see community analytics here.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Assessments</p>
                    <h4 className="text-3xl font-heading font-bold">{totalAssessments}</h4>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-l-4 border-l-red-500">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Risk Proportion</p>
                    <h4 className="text-3xl font-heading font-bold">{highRiskPercentage}%</h4>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <CalendarCheck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Latest Assessment</p>
                    <h4 className="text-xl font-heading font-bold mt-1">{mostRecentAssessment}</h4>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Risk Distribution Pie Chart */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading">Risk Distribution</CardTitle>
                  <CardDescription>Proportion of children in each risk category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[350px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Assessment Volume Timeline */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading">Assessment Timeline</CardTitle>
                  <CardDescription>Number of assessments conducted per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={barChartConfig} className="w-full aspect-[4/3] max-h-[350px]">
                    <BarChart data={timelineData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickLine={false} 
                        axisLine={false}
                        tickMargin={10}
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={false}
                        tickMargin={10}
                        allowDecimals={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="assessments" fill="var(--color-assessments)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
