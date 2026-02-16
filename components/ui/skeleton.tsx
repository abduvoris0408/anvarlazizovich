import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

// Blog Card Skeleton
function BlogCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

// Article Card Skeleton
function ArticleCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

// Grid Skeleton
function GridSkeleton({ count = 3, variant = 'blog' }: { count?: number; variant?: 'blog' | 'article' }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i}>
              {variant === 'blog' ? <BlogCardSkeleton /> : <ArticleCardSkeleton />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skeleton, BlogCardSkeleton, ArticleCardSkeleton, GridSkeleton }
