const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "secret-mitsui-api-key-2026";

function getPublicHeaders() {
  return {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  };
}

export async function getBanners() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/banners`, {
      headers: getPublicHeaders(),
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error", data: [] };
  }
}

export async function getEvents() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/events`, {
      headers: getPublicHeaders(),
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error", data: [] };
  }
}

export async function getSections() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/sections`, {
      headers: getPublicHeaders(),
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error", data: [] };
  }
}

export async function submitRegistration(payload: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/register`, {
      method: "POST",
      headers: getPublicHeaders(),
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function checkRegistrationStatus(searchQuery: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/registration/status?q=${encodeURIComponent(searchQuery)}`, {
      headers: getPublicHeaders(),
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}
