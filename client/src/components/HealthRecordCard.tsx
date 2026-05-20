import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthResult } from "@shared/schema";

interface HealthRecordCardProps {
  result: HealthResult;
}

export function HealthRecordCard({ result }: HealthRecordCardProps) {
  return (
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
  );
}
