import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity, Baby, Scale, Ruler, Utensils, IndianRupee, HeartPulse, AlertCircle, FileText, ShieldCheck, Droplets, CalendarClock, MessageCircleHeart, Sparkles, Syringe, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import heroIllustration from "@/assets/images/hero-illustration.png";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(0.1, "Age is required").max(18, "Age must be under 18"),
  weight: z.coerce.number().min(1, "Weight is required").max(100, "Invalid weight"),
  height: z.coerce.number().min(30, "Height is required").max(200, "Invalid height"),
  meals: z.coerce.number().min(1, "Required").max(10, "Invalid meals"),
  income: z.string().min(1, "Income level is required"),
  vaccination: z.string().min(1, "Vaccination status is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any | null>(null);

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

  const onSubmit = (data: FormValues) => {
    setIsGenerating(true);
    // Simulate AI generation time
    setTimeout(() => {
      // Mocked risk calculation logic based on simple heuristics for demo
      let riskLevel = "Low";
      let riskColor = "bg-green-100 text-green-800 border-green-200";
      let dietPlan = [
        { time: "Morning", meal: "Dalia (broken wheat) porridge with milk and a little jaggery. 1 boiled egg." },
        { time: "Afternoon", meal: "Khichdi (rice and moong dal) with ghee, mashed carrots, and spinach. Curd on the side." },
        { time: "Evening", meal: "Mashed banana or papaya. Ragi (finger millet) malt." },
        { time: "Night", meal: "Soft roti (if age appropriate) or mashed rice with thick dal and seasonal vegetable curry." }
      ];
      
      if (data.weight < data.age * 2 + 5 || data.meals < 3) {
        riskLevel = "Moderate";
        riskColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
        dietPlan = [
          { time: "Morning", meal: "Sprouted moong dal cheela (pancake) or Poha with groundnuts and peas. Glass of milk." },
          { time: "Afternoon", meal: "Rice with mixed vegetable sambar (extra dal) and a seasonal fruit like Mango or Guava." },
          { time: "Evening", meal: "Roasted chana (chickpeas) and a small piece of Jaggery. Lemon water." },
          { time: "Night", meal: "Vegetable Pulav with soybean chunks for protein and a bowl of curd." }
        ];
      }
      if (data.weight < data.age * 1.5 + 4 || data.income === "Low" && data.meals < 2) {
        riskLevel = "High";
        riskColor = "bg-red-100 text-red-800 border-red-200";
        dietPlan = [
          { time: "Morning", meal: "High-protein Ragi porridge with milk and crushed nuts. 1 full boiled egg." },
          { time: "Afternoon", meal: "Thick Dal Khichdi with double ghee/oil. Mashed potato and green leafy vegetables." },
          { time: "Evening", meal: "Banana shake with honey or peanut butter. Steamed sweet potato." },
          { time: "Night", meal: "Mashed rice with Fish curry or Paneer/Soya. Ensure the meal is semi-solid and easy to digest." }
        ];
      }

      setResult({
        name: data.name,
        risk: riskLevel,
        riskColor,
        riskInterpretation: riskLevel === "High" ? `Based on the data for ${data.name}, the child is significantly undernourished for their age and height. Immediate nutritional intervention is required to prevent developmental delays.` : riskLevel === "Moderate" ? `${data.name} is showing mild signs of undernutrition. A diet adjustment is needed to ensure they reach their healthy growth curve.` : `${data.name} is currently within a healthy growth range. Keep up the good work and maintain a balanced diet.`,
        dietPlan,
        healthSteps: [
          "Ensure meals are calorie-dense by adding a spoonful of ghee or oil.",
          "Introduce dark green leafy vegetables at least 3 times a week.",
          "Give Iron and Folic Acid (IFA) syrup as prescribed by the local ASHA worker."
        ],
        schemes: data.income === "Low" ? [
          "POSHAN Abhiyaan (National Nutrition Mission): Provides supplementary nutrition.",
          "Anganwadi Services: Enroll the child at the nearest Anganwadi center for free daily hot cooked meals and take-home rations (THR)."
        ] : [],
        hygiene: "Wash hands with soap before every meal and after using the toilet. Boil drinking water or use a safe water source to prevent infections that cause weight loss.",
        monitoring: riskLevel === "High" ? "Weekly weight check-ups at the local Anganwadi center until the child reaches the 'Green' safe zone." : "Monthly weight and height check-ups at the local health center.",
        motivation: "Every small healthy bite helps your child grow stronger and brighter. You are doing a wonderful job, and the community is here to support you!"
      });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <HeartPulse className="h-8 w-8" />
            <span className="font-heading font-bold text-2xl tracking-tight">Poshan AI</span>
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full border border-border">
            NGO Support Mode
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground mb-4">
            Child Nutrition Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            Analyze health parameters to generate a culturally appropriate, personalized improvement plan for the child's well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4">
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
          </div>

          {/* Right Column: Results / Empty State */}
          <div className="lg:col-span-8">
            {!result && !isGenerating && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-dashed border-border shadow-sm">
                <div className="w-full max-w-[320px] aspect-[4/3] mb-8 relative rounded-xl overflow-hidden shadow-inner bg-accent/30">
                  <img 
                    src={heroIllustration} 
                    alt="Health worker helping a child" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">Ready to assist</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter the child's details to generate a culturally relevant, actionable nutrition and health improvement plan.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6 bg-white rounded-2xl border border-border shadow-sm p-12 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                  <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center relative shadow-lg">
                    <Sparkles className="h-10 w-10 text-white animate-spin-slow" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-heading font-bold">Processing Health Data</h3>
                  <p className="text-muted-foreground">Formulating personalized diet and identifying support schemes...</p>
                </div>
                
                {/* Skeleton loaders */}
                <div className="w-full max-w-md space-y-3 mt-8">
                  <div className="h-4 bg-accent rounded w-3/4 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-accent rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-accent rounded w-5/6 mx-auto animate-pulse"></div>
                </div>
              </div>
            )}

            {result && !isGenerating && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
                {/* 1. RISK INTERPRETATION */}
                <Card className="border-t-4 border-t-primary shadow-md overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4" /> Health Record for {result.name}
                        </h2>
                        <h3 className="text-2xl font-heading font-bold text-foreground">Health Status Overview</h3>
                      </div>
                      <Badge variant="outline" className={`px-4 py-1.5 text-sm font-bold shadow-sm ${result.riskColor}`}>
                        Predicted Risk: {result.risk}
                      </Badge>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/80 bg-accent/30 p-4 rounded-xl border border-border">
                      {result.riskInterpretation}
                    </p>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2. PERSONALIZED DIET PLAN */}
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-primary/5 pb-4 border-b border-border/50">
                      <CardTitle className="text-lg font-heading flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        Personalized Diet Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y divide-border/50">
                        {result.dietPlan.map((meal: any, idx: number) => (
                          <li key={idx} className="p-4 hover:bg-accent/20 transition-colors">
                            <span className="text-xs font-bold uppercase text-secondary font-heading tracking-wider block mb-1">{meal.time}</span>
                            <p className="text-sm text-foreground/80">{meal.meal}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    {/* 3. HEALTH IMPROVEMENT STEPS */}
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-heading flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" />
                          Actionable Steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {result.healthSteps.map((step: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-foreground/80">
                              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{idx + 1}</span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* 5. HYGIENE & SANITATION ADVICE */}
                    <Card className="shadow-sm bg-blue-50/50 border-blue-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-heading flex items-center gap-2 text-blue-800">
                          <Droplets className="h-5 w-5" />
                          Hygiene & Sanitation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-900/80 leading-relaxed">
                          {result.hygiene}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* 4. GOVERNMENT SUPPORT SCHEMES */}
                {result.schemes && result.schemes.length > 0 && (
                  <Card className="shadow-sm bg-orange-50 border-orange-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-heading flex items-center gap-2 text-orange-800">
                        <ShieldCheck className="h-5 w-5" />
                        Government Support Available
                      </CardTitle>
                      <CardDescription className="text-orange-700/70">Based on the household income level, you are eligible for:</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {result.schemes.map((scheme: string, idx: number) => {
                          const [title, desc] = scheme.split(': ');
                          return (
                            <li key={idx} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                              <h4 className="font-bold text-orange-900 text-sm mb-1">{title}</h4>
                              <p className="text-xs text-orange-800/80">{desc}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 6. MONITORING PLAN */}
                  <Card className="shadow-sm border-l-4 border-l-secondary">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-heading flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-secondary" />
                        Monitoring Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80 font-medium">{result.monitoring}</p>
                    </CardContent>
                  </Card>

                  {/* 7. PARENT MOTIVATION */}
                  <Card className="shadow-sm bg-primary text-primary-foreground">
                    <CardContent className="p-6 flex gap-4 items-start">
                      <MessageCircleHeart className="h-8 w-8 shrink-0 opacity-80" />
                      <div>
                        <h4 className="font-heading font-bold mb-1 text-lg">Message for Parents</h4>
                        <p className="text-sm opacity-90 leading-relaxed italic">
                          "{result.motivation}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end pt-4">
                   <Button variant="outline" className="gap-2 text-primary border-primary/20 hover:bg-primary/5" onClick={() => window.print()}>
                     <FileText className="h-4 w-4" />
                     Print Action Plan
                   </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}