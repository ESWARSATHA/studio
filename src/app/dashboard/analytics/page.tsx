
"use client";
import { useActionState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { Bot, Eye, Star, Lightbulb, ThumbsUp, ThumbsDown, Wand2, Loader2, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAnalyzeFeedback } from "./actions";
import { Badge } from "@/components/ui/badge";


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

const initialState = { status: 'idle' as const, message: '', data: null, errors: null };

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleAnalyzeFeedback, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Feedback Analyzed!",
        description: "The AI has processed the feedback.",
      });
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

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
          <CardTitle>Views & Feedback Overview</CardTitle>
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

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Wand2 className="h-6 w-6 text-primary"/>
                    <CardTitle>AI Feedback Analyzer</CardTitle>
                </div>
                <CardDescription>Paste in customer feedback to get an AI-powered analysis and suggestions.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    startTransition(() => {
                        formAction(formData);
                    });
                }}>
                    <div className="grid gap-4">
                        <Textarea 
                            name="feedback"
                            placeholder="e.g., 'The elephant carving is beautiful, but I wish it came in a smaller size for my desk...'"
                            rows={6}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 animate-spin"/> : <Bot className="mr-2"/>}
                            Analyze Feedback
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        
        {(isPending || state.data) && (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-primary"/>
                        <CardTitle>Analysis Result</CardTitle>
                    </div>
                     <CardDescription>Here's what the AI understood from the feedback.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {isPending && !state.data ? (
                        <div className="flex items-center justify-center text-muted-foreground">
                            <Loader2 className="mr-2 animate-spin" />
                            <p>Analyzing...</p>
                        </div>
                    ) : state.data && (
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">Sentiment</h4>
                                <Badge variant={state.data.sentiment === 'Positive' ? 'default' : state.data.sentiment === 'Negative' ? 'destructive' : 'secondary'}>
                                    {state.data.sentiment === 'Positive' && <ThumbsUp className="mr-2"/>}
                                    {state.data.sentiment === 'Negative' && <ThumbsDown className="mr-2"/>}
                                    {state.data.sentiment}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">Category</h4>
                                <Badge variant="outline">{state.data.category}</Badge>
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><MessageSquare/> Summary</h4>
                                <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">{state.data.summary}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb/> Suggestion</h4>
                                <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">
                                    {state.data.category === 'Feature Request' ? 'Consider creating a smaller version of this product to appeal to customers with limited space.' : 'No specific product development suggestion for this feedback type.'}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
