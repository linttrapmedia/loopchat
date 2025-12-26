import { Layout } from "@/components/Layout";
import { db } from "@/database/db";
import * as schema from "@/database/schema";
import type { FC } from "hono/jsx";

export const Top: FC<{ messages: string[] }> = async (props: { messages: string[] }) => {
  const result = await db.select().from(schema.movies);
  return (
    <Layout title="Top Page">
      <ul>
        {result.map((movie) => {
          return (
            <li>
              {movie.title} ({movie.releaseYear})
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};
