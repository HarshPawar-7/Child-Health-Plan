import { Activity, Droplets } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ActionableStepsCardProps {
  steps: string[];
  hygiene: string;
}

export function ActionableStepsCard({ steps, hygiene }: ActionableStepsCardProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Actionable Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-foreground/80">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{idx + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-sm bg-blue-50/50 border-blue-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center gap-2 text-blue-800">
            <Droplets className="h-5 w-5" />
            Hygiene & Sanitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-900/80 leading-relaxed">
            {hygiene}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
