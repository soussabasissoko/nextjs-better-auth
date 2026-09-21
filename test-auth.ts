import { auth } from "./lib/auth";

async function test() {
  console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
  try {
    const res = await auth.api.signInEmail({
      body: {
        email: "test@example.com",
        password: "password123",
      }
    } as any);
    console.log(res);
  } catch (e: any) {
    console.error("CAUGHT:", e);
    console.error(e?.stack);
  }
}
test();
