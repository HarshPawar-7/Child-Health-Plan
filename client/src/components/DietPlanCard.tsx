import { Utensils } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DietMeal } from "@/lib/nutritionService";

interface DietPlanCardProps {
  dietPlan: DietMeal[];
}

export function DietPlanCard({ dietPlan }: DietPlanCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-primary/5 pb-4 border-b border-border/50">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" />
          Personalized Diet Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border/50">
          {dietPlan.map((meal, idx) => (
            <li key={idx} className="p-4 hover:bg-accent/20 transition-colors">
              <span className="text-xs font-bold uppercase text-secondary font-heading tracking-wider block mb-1">{meal.time}</span>
              <p className="text-sm text-foreground/80">{meal.meal}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
