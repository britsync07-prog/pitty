interface Env {
  ADMIN_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { password } = await context.request.json() as { password?: string };
    
    const expectedPassword = context.env.ADMIN_PASSWORD || "prettypocket2026";

    if (password && password === expectedPassword) {
      return new Response("Success", { status: 200 });
    } else {
      return new Response("Invalid password", { status: 401 });
    }
  } catch (err) {
    return new Response("Bad request", { status: 400 });
  }
};
