import { factory, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import { rest } from "msw";

const db = factory({
  user: { _id: primaryKey(String), name: String, ocupation: String },
  post: {
    id: primaryKey(String),
    name: String,
  },
});

[{ _id: "test_user", name: "John Doe", ocupation: "Developer" }].forEach(
  (user) => db.user.create({ ...user })
);

[
  "A sample post",
  "A post about RTK Query",
  "How to randomly throw errors, a novella",
].forEach((name) => {
  db.post.create({ id: nanoid(), name });
});

export const handlers = [
  rest.get("/api/posts", async (req, res, ctx) => {
    const posts = db.post.findMany({});

    return res(ctx.json(posts), ctx.delay(300));
  }),
  rest.get("/api/posts/:id", async (req, res, ctx) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const post = db.post.findFirst({ id });

    return res(ctx.json(post), ctx.delay(300));
  }),
  rest.post("/api/posts", async (req, res, ctx) => {
    const { name } = req.json();

    if (Math.random() < 0.3) {
      return res(
        ctx.json({ error: "Oh no, there was an error, try again." }),
        ctx.status(500),
        ctx.delay(300)
      );
    }

    const post = db.post.create({
      id: nanoid(),
      name,
    });

    return res(ctx.json(post), ctx.delay(300));
  }),
  rest.put("/api/posts/:id", (req, res, ctx) => {
    const { name } = req.json();

    if (Math.random() < 0.3) {
      return res(
        ctx.json({ error: "Oh no, there was an error, try again." }),
        ctx.status(500),
        ctx.delay(300)
      );
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const post = db.post.update({
      where: { id },
      data: { name },
    });

    return res(ctx.json(post), ctx.delay(300));
  }),
  ...db.post.toHandlers("rest"),
];
