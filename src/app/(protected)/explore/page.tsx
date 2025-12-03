import Explore from "@/views/components/explore/Explore";
import { getMovieList } from "@/lib/api/movies.server";

export default async function Page() {
  const initialData = await getMovieList({ page: 1 });

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <Explore initialData={initialData} />
    </div>
  );
}
