interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric?: string;
  delay?: string;
}

export function BenefitCard({ icon, title, description, metric, delay = "" }: BenefitCardProps) {
  return (
    <div className={`glass-card p-6 relative overflow-hidden group slide-up ${delay}`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-amber transition-all duration-500">
          {icon}
        </div>
        
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
        
        {metric && (
          <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-1.5 rounded-lg inline-block">
            {metric}
          </div>
        )}
      </div>
    </div>
  );
}
