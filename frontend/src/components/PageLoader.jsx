export default function PageLoader() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-5">
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <span className="loading loading-ring text-primary w-20" />
        {/* Inner pulse */}
        <span className="absolute w-8 h-8 rounded-full bg-primary/20 animate-ping" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">
          ZenStore <span className="text-primary">AI</span>
        </h1>
        <p className="text-sm text-base-content/40 mt-1">Loading your store...</p>
      </div>
    </div>
  )
}