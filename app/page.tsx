export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-5xl font-bold text-white">
          AniTrack
        </h1>
        <p className="text-xl text-neutral-400">
          Your anime progress tracker is loading...
        </p>
        <div className="pt-12 text-sm text-neutral-500">
          Powered by Supabase & Vercel
        </div>
      </div>
    </main>
  );
}
