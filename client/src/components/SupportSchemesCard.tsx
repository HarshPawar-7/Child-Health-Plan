import { ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SupportSchemesCardProps {
  schemes: string[];
}

export function SupportSchemesCard({ schemes }: SupportSchemesCardProps) {
  if (!schemes || schemes.length === 0) return null;

  return (
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
          {schemes.map((scheme, idx) => {
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
  );
}
