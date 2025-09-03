export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse-pink ${className}`}>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
