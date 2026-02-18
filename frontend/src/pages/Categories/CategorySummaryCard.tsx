import { Tag, Utensils, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CategorySummaryProps {
  title: string;
  value: string | number;
  variant: "purple" | "green" | "blue";
}

export function CategorySummaryCard({ title, value, variant }: CategorySummaryProps) {
  const configs = {
    purple: { icon: Tag, color: "#1E293B", textColor: "text-[#1E293B]" }, 
    green: { icon: ArrowUpDown, color: "#9333EA", textColor: "text-[#1E293B]" },
    blue: { icon: Utensils, color: "#2563EB", textColor: "text-[#1E293B]" },
  };

  const { icon: Icon, color, textColor } = configs[variant];

  return (
    <Card className="shadow-none border border-gray-200 bg-white rounded-2xl p-6 h-full font-inter">
      <CardContent className="p-0 flex flex-col justify-center h-full">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
            <Icon 
              size={32} 
              style={{ color: color }} 
              strokeWidth={2.5}
            />
          </div>
          
          <h2 className={`text-[32px] font-bold ${textColor} leading-none tracking-tight`}>
            {value}
          </h2>
        </div>

        <div className="mt-2 ml-12"> 
          <p className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}