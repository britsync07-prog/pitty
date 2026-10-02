interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const product = await context.env.DB.prepare(
      "SELECT * FROM collections WHERE id = ?"
    ).bind(id).first();
    return Response.json(product);
  }

  const { results } = await context.env.DB.prepare(
    "SELECT * FROM collections ORDER BY id ASC"
  ).all();
  return Response.json(results);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const auth = context.request.headers.get("Authorization");
  const expectedPassword = context.env.ADMIN_PASSWORD || "prettypocket2026";
  if (auth !== expectedPassword) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data: any = await context.request.json();
  const { name, category, price, description, image, images } = data;

  if (!name || !price || !image) {
    return new Response("Missing required fields", { status: 400 });
  }

  const imagesJson = JSON.stringify(images || [image]);

  try {
    await context.env.DB.prepare(
      "INSERT INTO collections (name, category, price, description, image, images) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(name, category || "Bangles & Jewelry", price, description || "", image, imagesJson).run();
  } catch(e) {
    await context.env.DB.prepare(
      "INSERT INTO collections (name, price, description, image, images) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, price, description || "", image, imagesJson).run();
  }

  return new Response("Created", { status: 201 });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const auth = context.request.headers.get("Authorization");
  const expectedPassword = context.env.ADMIN_PASSWORD || "prettypocket2026";
  if (auth !== expectedPassword) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const data: any = await context.request.json();
  const { name, category, price, description, image, images } = data;

  if (!name || !price || !image) {
    return new Response("Missing required fields", { status: 400 });
  }

  const imagesJson = JSON.stringify(images || [image]);

  try {
    await context.env.DB.prepare(
      "UPDATE collections SET name = ?, category = ?, price = ?, description = ?, image = ?, images = ? WHERE id = ?"
    ).bind(name, category || "Bangles & Jewelry", price, description || "", image, imagesJson, id).run();
  } catch(e) {
    await context.env.DB.prepare(
      "UPDATE collections SET name = ?, price = ?, description = ?, image = ?, images = ? WHERE id = ?"
    ).bind(name, price, description || "", image, imagesJson, id).run();
  }

  return new Response("Updated", { status: 200 });
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    const auth = context.request.headers.get("Authorization");
    const expectedPassword = context.env.ADMIN_PASSWORD || "prettypocket2026";
  if (auth !== expectedPassword) {
      return new Response("Unauthorized", { status: 401 });
    }
    const url = new URL(context.request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });
  
    await context.env.DB.prepare("DELETE FROM collections WHERE id = ?").bind(id).run();
    return new Response("Deleted", { status: 200 });
};
