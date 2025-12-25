import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { db } from "./db";
import * as schema from "./schema";

const app = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <title>Hono JSX Example</title>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@2.1.1/css/pico.min.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{ messages: string[] }> = async (props: { messages: string[] }) => {
  const result = await db.select().from(schema.movies);
  console.log(result);
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {result.map((movie) => {
          return (
            <li>
              {movie.title} ({movie.releaseYear})
            </li>
          );
        })}
      </ul>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
      <form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value="Joe" />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value="Blow" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value="joe@blow.com" />
        </div>
        <button class="btn" type="submit">
          Submit
        </button>
        <button class="btn" hx-get="/contact/1">
          Cancel
        </button>
      </form>
      <div hx-target="this" hx-swap="outerHTML">
        <div>
          <label>First Name</label>: Joe
        </div>
        <div>
          <label>Last Name</label>: Blow
        </div>
        <div>
          <label>Email</label>: joe@blow.com
        </div>
        <button hx-get="/contact/1/edit" class="btn primary">
          Click To Edit This
        </button>
      </div>
    </Layout>
  );
};

app.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

export default app;
