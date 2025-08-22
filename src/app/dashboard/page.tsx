import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PlusCircle, BarChart2, Package, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Artisan!</h1>
        <p className="text-muted-foreground">Here's a quick overview of your shop.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">From interested buyers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Create a New Product</CardTitle>
            <CardDescription>Let's get your next masterpiece online. We'll help with the details.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center text-center">
            <PlusCircle className="h-16 w-16 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">Upload an image and let AI craft the perfect listing for you.</p>
          </CardContent>
          <div className="p-6 pt-0">
             <Button asChild className="w-full">
              <Link href="/dashboard/products/new">Add New Product <ArrowRight className="ml-2"/></Link>
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">View Your Analytics</CardTitle>
            <CardDescription>See how your products are performing and get insights.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center text-center">
            <BarChart2 className="h-16 w-16 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">Track views, see customer feedback, and understand your audience.</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/dashboard/analytics">View Analytics <ArrowRight className="ml-2"/></Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
