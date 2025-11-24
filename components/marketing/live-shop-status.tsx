export function LiveShopStatus() {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg max-w-xs">
      <div className="relative">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
      </div>
      <div>
        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Current Lead Time</p>
        <p className="text-white font-semibold">
          Standard: <span className="text-green-400 font-mono">5-7 Days</span>
        </p>
        <p className="text-xs text-slate-500 mt-1 font-mono">Rush: 24-48hrs available</p>
      </div>
    </div>
  )
}
