export default function HeroStats() {
  return (
    <section className="flex flex-wrap gap-12 mt-12 pt-8 border-t border-slate-700/50">
        {/* TODO :: Convert this to a prop which accepts an array of stats */}
      <div>
        <div className="text-3xl mb-1">50K+</div>
        <div className="text-sm text-slate-400">Movies</div>
      </div>
      <div>
        <div className="text-3xl mb-1">100K+</div>
        <div className="text-sm text-slate-400">Users</div>
      </div>
      <div>
        <div className="text-3xl mb-1">4.8/5</div>
        <div className="text-sm text-slate-400">Rating</div>
      </div>
    </section>
  );
}
