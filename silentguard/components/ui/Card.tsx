import { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  action,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-slate-800">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
}