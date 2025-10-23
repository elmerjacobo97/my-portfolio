import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectCardSkeletonProps {
  featured?: boolean;
  className?: string;
}

export function ProjectCardSkeleton({ featured = false, className = '' }: ProjectCardSkeletonProps) {
  return (
    <Card className={`group shadow-sm bg-card/50 ${className}`}>
      {/* Project Preview Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Top badges skeleton */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && <Skeleton className="h-6 w-24" />}
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Status badge skeleton (optional) */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-7 w-3/4" />
            {/* Category skeleton */}
            <Skeleton className="h-5 w-20 shrink-0" />
          </div>
          {/* Description skeleton */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies skeleton */}
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-18" />
          {featured && <Skeleton className="h-5 w-16" />}
        </div>

        {/* Highlights skeleton - only for featured */}
        {featured && (
          <div className="pt-2 border-t">
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <Skeleton className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        )}

        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
