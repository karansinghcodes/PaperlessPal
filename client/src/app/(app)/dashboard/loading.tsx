export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="flex items-center space-x-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
                <span className="text-sm font-medium text-slate-700">Loading...</span>
            </div>
        </div>
    )
}
