import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  dataAiHint?: string;
}

export function ServiceCard({ icon, title, description, className, dataAiHint }: ServiceCardProps) {
  return (
    <Card className={cn(
      "group bg-card/50 border-border/50 hover:border-primary/80 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col hover:bg-card", 
      className
    )} data-ai-hint={dataAiHint}>
      <CardHeader className="flex flex-col items-start gap-4">
        <div className="text-primary bg-primary/10 p-3 rounded-lg transition-colors duration-300">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
