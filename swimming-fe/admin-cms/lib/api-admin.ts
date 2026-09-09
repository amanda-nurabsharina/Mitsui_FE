const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("swimming_admin_token");
  }
  return null;
}

async function fetchAdminAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    return await res.json();
  } catch (error) {
    console.error("Admin API Error:", error);
    return { success: false, message: "Network connection failed" };
  }
}

export async function adminLogin(data: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: "Login network error" };
  }
}

export async function getRegistrations() {
  return fetchAdminAPI("/admin/registrations");
}

export async function verifyPayment(id: number, status: string) {
  return fetchAdminAPI(`/admin/registrations/${id}/verify`, {
    method: "PUT",
    body: JSON.stringify({ payment_status: status }),
  });
}

export async function generateBukuAcara(maxLanes: number = 3) {
  return fetchAdminAPI("/admin/buku-acara/generate", {
    method: "POST",
    body: JSON.stringify({ max_lanes: maxLanes }),
  });
}

export async function recordRaceResult(id: number, timeStr: string, rank: number) {
  return fetchAdminAPI(`/admin/registrations/${id}/result`, {
    method: "PUT",
    body: JSON.stringify({ race_result_time: timeStr, rank }),
  });
}

export async function getBanners() {
  return fetchAdminAPI("/admin/banners");
}

export async function saveBanner(banner: any) {
  return fetchAdminAPI("/admin/banners", {
    method: "POST",
    body: JSON.stringify(banner),
  });
}

export async function deleteBanner(id: number) {
  return fetchAdminAPI(`/admin/banners/${id}`, {
    method: "DELETE",
  });
}
