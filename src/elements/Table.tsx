import type { Child } from "hono/jsx";

type Column = {
  key: string;
  header: string;
  class?: string;
};

type TableProps = {
  columns: Column[];
  data: Record<string, Child>[];
  striped?: boolean;
  class?: string;
};

export const Table = ({ columns, data, striped = false, class: className }: TableProps) => {
  return (
    <figure>
      <table class={className} role="grid">
        <thead>
          <tr>
            {columns.map((col) => (
              <th scope="col" class={col.class}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr>
              {columns.map((col) => (
                <td class={col.class}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};
