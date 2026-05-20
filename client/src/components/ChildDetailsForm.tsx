import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Baby, User, Activity, Utensils, Scale, Ruler, IndianRupee, Syringe, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema, FormValues } from "@shared/schema";

interface ChildDetailsFormProps {
  onSubmit: (data: FormValues) => void;
  isGenerating: boolean;
}

export function ChildDetailsForm({ onSubmit, isGenerating }: ChildDetailsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      weight: undefined,
      height: undefined,
      meals: undefined,
      income: "",
      vaccination: "",
    },
  });

  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="bg-accent/50 pb-6">
        <CardTitle className="flex items-center gap-2 font-heading text-xl">
          <Baby className="h-5 w-5 text-primary" />
          Child Details
        </CardTitle>
        <CardDescription>Enter the latest measurements</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Child's Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g. Rahul Kumar" className="pl-9 bg-accent/30 focus:bg-white transition-colors" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Age (Years)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Activity className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" step="0.1" placeholder="e.g. 2.5" className="pl-9 bg-accent/30 focus:bg-white transition-colors" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Meals/Day</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Utensils className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="e.g. 3" className="pl-9 bg-accent/30 focus:bg-white transition-colors" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Weight (kg)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Scale className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" step="0.1" placeholder="e.g. 12" className="pl-9 bg-accent/30 focus:bg-white transition-colors" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Height (cm)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" step="0.5" placeholder="e.g. 85" className="pl-9 bg-accent/30 focus:bg-white transition-colors" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Household Income</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-accent/30 focus:bg-white transition-colors">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Select level" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low Income (Needs Support)</SelectItem>
                        <SelectItem value="Medium">Medium Income</SelectItem>
                        <SelectItem value="High">High Income</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vaccination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Vaccination Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-accent/30 focus:bg-white transition-colors">
                          <div className="flex items-center gap-2">
                            <Syringe className="h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Status" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Up to date">Up to date</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Not started">Not started</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-md mt-4 font-bold shadow-md hover:shadow-lg transition-all"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Health Data...
                </>
              ) : (
                "View Health Records"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
