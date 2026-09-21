import { auth } from "./lib/auth";
import "dotenv/config";

async function test() {
  console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email: "test2@example.com",
        password: "password123",
        name: "Test User"
      }
    } as any);
    console.log("SignIn response:", res);
  } catch (e: any) {
    console.error("CAUGHT ERROR:", e);
    console.error("Stack trace:", e?.stack);
  }
}
test();
