import { useState } from "react";
import { HeartPulse, FileText, CalendarClock, MessageCircleHeart, Sparkles, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroIllustration from "@/assets/images/hero-illustration.png";

import { ChildDetailsForm } from "@/components/ChildDetailsForm";
import { HealthRecordCard } from "@/components/HealthRecordCard";
import { DietPlanCard } from "@/components/DietPlanCard";
import { ActionableStepsCard } from "@/components/ActionableStepsCard";
import { SupportSchemesCard } from "@/components/SupportSchemesCard";
import { HistorySidebar } from "@/components/HistorySidebar";
import { calculateHealthResult, HealthResult, FormValues } from "@/lib/nutritionService";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<HealthResult | null>(null);
  const [lastFormData, setLastFormData] = useState<FormValues | null>(null);

  const onSubmit = (data: FormValues) => {
    setIsGenerating(true);
    // Simulate AI generation time
    setTimeout(() => {
      const healthResult = calculateHealthResult(data);
      setResult(healthResult);
      setLastFormData(data);
      setIsGenerating(false);
    }, 2500);
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (resultData: HealthResult) => {
      if (!lastFormData) return;
      
      const payload = {
        childName: resultData.name,
        age: Number(lastFormData.age),
        weight: Number(lastFormData.weight),
        height: Number(lastFormData.height),
        riskLevel: resultData.risk,
        riskColor: resultData.riskColor,
      };

      await apiRequest("POST", "/api/records", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/records"] });
      toast({
        title: "Assessment Saved",
        description: "The health record has been saved to history.",
      });
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Could not save the assessment. Please try again.",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <HeartPulse className="h-8 w-8" />
            <span className="font-heading font-bold text-2xl tracking-tight">Poshan AI</span>
          </div>
          <div className="flex items-center gap-4">
            <HistorySidebar />
            <div className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full border border-border hidden sm:block">
              NGO Support Mode
            </div>
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
            <ChildDetailsForm onSubmit={onSubmit} isGenerating={isGenerating} />
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
                <HealthRecordCard result={result} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DietPlanCard dietPlan={result.dietPlan} />
                  <ActionableStepsCard steps={result.healthSteps} hygiene={result.hygiene} />
                </div>

                <SupportSchemesCard schemes={result.schemes} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* MONITORING PLAN */}
                  <Card className="shadow-sm border-l-4 border-l-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarClock className="h-4 w-4 text-secondary" />
                        <h4 className="text-base font-heading font-bold">Monitoring Plan</h4>
                      </div>
                      <p className="text-sm text-foreground/80 font-medium">{result.monitoring}</p>
                    </CardContent>
                  </Card>

                  {/* PARENT MOTIVATION */}
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
                
                <div className="flex justify-end gap-3 pt-4">
                   <Button 
                     variant="outline" 
                     className="gap-2 text-primary border-primary/20 hover:bg-primary/5" 
                     onClick={() => saveMutation.mutate(result)}
                     disabled={saveMutation.isPending}
                   >
                     <Save className="h-4 w-4" />
                     {saveMutation.isPending ? "Saving..." : "Save Assessment"}
                   </Button>
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