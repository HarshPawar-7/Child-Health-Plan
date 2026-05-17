import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { History, Calendar, Activity, Scale, Baby } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthRecord } from "@shared/schema";

export function HistorySidebar() {
  const { data: records, isLoading } = useQuery<HealthRecord[]>({
    queryKey: ["/api/records"],
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <History className="h-4 w-4" />
          View History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-heading text-2xl flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Assessment History
          </SheetTitle>
          <SheetDescription>
            Past nutrition and health assessments.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">Loading history...</div>
          ) : !records || records.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 bg-accent/30 rounded-lg border border-dashed border-border">
              No previous assessments saved.
            </div>
          ) : (
            records.map((record) => (
              <Card key={record.id} className="shadow-sm border-l-4" style={{ borderLeftColor: record.riskColor.includes('red') ? '#ef4444' : record.riskColor.includes('yellow') ? '#eab308' : '#22c55e' }}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold flex items-center gap-2">
                      <Baby className="h-4 w-4 text-muted-foreground" />
                      {record.childName}
                    </h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(record.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 mb-3">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {record.age} years
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Scale className="h-3 w-3" />
                      {record.weight} kg
                    </div>
                  </div>

                  <Badge variant="secondary" className={record.riskColor + " shadow-none border"}>
                    Risk: {record.riskLevel}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
