import { getEnvVar } from '@shared/env-loader';

const url = getEnvVar('SUPPLIER_URL')!;
const login = getEnvVar('SUPPLIER_LOGIN')!;
const password = getEnvVar('SUPPLIER_PASSWORD')!;

const loginUrl = `${url}/login/`;

export async function getCookies(): Promise<string> {
  const formData = new URLSearchParams();
  formData.append("login-name", login);
  formData.append("login-pass", password);
  formData.append("login-remember", "on");
  
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0",
      Referer: loginUrl,
    },
    body: formData.toString(),
    redirect: "manual",
  });

  const cookieHeader = response.headers.get("set-cookie");
  if (!cookieHeader) throw new Error("Authentication failed: no cookies");

  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(",")) {
    const [key, value] = part.split(";")[0].trim().split("=");
    if (key && value) cookies[key] = value;
  }

  const hasLoginCookie = Object.keys(cookies).some(
    (k) =>
      k.startsWith("wordpress_logged_in_") || k.startsWith("wordpress_sec_")
  );
  if (!hasLoginCookie)
    throw new Error("Authentication failed: no WordPress cookies");

  const cookieString = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  const location = response.headers.get("location");
  if (location) {
    await fetch(location, {
      headers: { Cookie: cookieString, "User-Agent": "Mozilla/5.0" },
    });
  }

  return cookieString;
}
