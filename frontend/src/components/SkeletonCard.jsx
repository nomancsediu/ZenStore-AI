export default function SkeletonCard() {
  return (
    <div className="card bg-base-100 shadow-md overflow-hidden">
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="card-body p-4 gap-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="flex justify-between mt-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-5 w-20 rounded" />
        </div>
      </div>
    </div>
  )
}