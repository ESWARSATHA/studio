"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { Bot, Eye, Star } from "lucide-react";

const chartData = [
  { month: "January", views: 186, feedback: 80 },
  { month: "February", views: 305, feedback: 200 },
  { month: "March", views: 237, feedback: 120 },
  { month: "April", views: 273, feedback: 190 },
  { month: "May", views: 209, feedback: 130 },
  { month: "June", views: 214, feedback: 140 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
  feedback: {
    label: "Feedback Score",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 / 5.0</div>
            <p className="text-xs text-muted-foreground">Based on 253 reviews</p>
          </CardContent>
        </Card>
         <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI-Powered Insight</CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold text-foreground">
              Your 'Hand-carved Wooden Elephant' is getting 30% more views from searches for 'eco-friendly decor'.
            </div>
            <p className="text-xs text-muted-foreground mt-1">Consider adding 'sustainable' to your tags.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Views & Feedback Overview</CardTitle>
          <CardDescription>Monthly performance of your products</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                 <CartesianGrid vertical={false} />
                 <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  />
                <YAxis />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                <Bar dataKey="feedback" fill="var(--color-feedback)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
