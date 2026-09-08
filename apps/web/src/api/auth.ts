const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginUser(values: { email: string; password: string }) {
  await wait();
  if (!values.email.includes("@") || values.password.length < 6) {
    throw new Error("Incorrect email or password");
  }
  return {
    token: "demo-token",
    user: {
      fullName: values.email.startsWith("admin") ? "Admin User" : "Medkart User",
      email: values.email,
      role: values.email.startsWith("admin") ? ("admin" as const) : ("user" as const),
    },
  };
}

export async function loginWithGoogle() {
  await wait();
  return {
    token: "demo-google-token",
    user: {
      fullName: "Google Demo User",
      email: "patient.demo@gmail.com",
      role: "user" as const,
    },
  };
}

export async function registerUser(values: { fullName: string; email: string; phone: string; password: string }) {
  await wait();
  return {
    token: "demo-token",
    user: { fullName: values.fullName, email: values.email, role: "user" as const },
  };
}
