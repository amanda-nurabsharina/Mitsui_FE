const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

function getAuthHeaders(customToken?: string) {
  const token = customToken || (typeof window !== "undefined" ? localStorage.getItem("swimming_admin_token") : "");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// ----------------------------------------------------------------------
// 0. AUTHENTICATION & LOGIN
// ----------------------------------------------------------------------
export async function adminLogin(credentialsOrEmail: any, passwordArg?: string) {
  try {
    let payload = credentialsOrEmail;
    if (typeof credentialsOrEmail === "string") {
      payload = { username: credentialsOrEmail, password: passwordArg };
    }
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

// ----------------------------------------------------------------------
// 1. FILE & IMAGE UPLOAD
// ----------------------------------------------------------------------
export async function uploadAdminImage(token: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE_URL}/admin/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function uploadImage(file: File) {
  const token = typeof window !== "undefined" ? localStorage.getItem("swimming_admin_token") || "" : "";
  return uploadAdminImage(token, file);
}

// ----------------------------------------------------------------------
// 2. REGISTRATION & PARTICIPANT MANAGEMENT
// ----------------------------------------------------------------------
export async function getRegistrations() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function fetchAdminRegistrations(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations`, {
      headers: getAuthHeaders(token),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function verifyPayment(id: number, status: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations/${id}/verify`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_status: status }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

// ----------------------------------------------------------------------
// 3. BUKU ACARA & RACE RESULTS
// ----------------------------------------------------------------------
export async function generateBukuAcara() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/buku-acara/generate`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function recordRaceResult(id: number, finalTime: string, rank: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations/${id}/result`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ final_time: finalTime, rank }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function updateRaceResult(id: number, heat: number, lane: number, seedTime: string, finalTime: string, status: string, rank: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations/${id}/result`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ heat_number: heat, lane_number: lane, seed_time: seedTime, final_time: finalTime, status, rank }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

// ----------------------------------------------------------------------
// 4. BANNERS API
// ----------------------------------------------------------------------
export async function getBanners() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/banners`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function fetchAdminBanners(token?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/banners`, {
      headers: getAuthHeaders(token),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function saveBanner(bannerData: any) {
  try {
    const isEdit = bannerData.id && bannerData.id > 0;
    const url = isEdit ? `${API_BASE_URL}/admin/banners/${bannerData.id}` : `${API_BASE_URL}/admin/banners`;
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(bannerData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function createAdminBanner(token: string, data: any) {
  return saveBanner(data);
}

export async function updateAdminBanner(token: string, id: number, data: any) {
  return saveBanner({ ...data, id });
}

export async function deleteBanner(id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/banners/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function deleteAdminBanner(token: string, id: number) {
  return deleteBanner(id);
}

// ----------------------------------------------------------------------
// 5. SECTIONS API
// ----------------------------------------------------------------------
export async function getSections() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/sections`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function fetchAdminSections(token?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/sections`, {
      headers: getAuthHeaders(token),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function saveSection(sectionData: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/sections`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(sectionData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function updateAdminSection(token: string, data: any) {
  return saveSection(data);
}

// ----------------------------------------------------------------------
// 6. MENUS API
// ----------------------------------------------------------------------
export async function fetchAdminMenus(token?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/menus`, {
      headers: getAuthHeaders(token),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function updateAdminMenu(token: string, id: number, data: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/menus/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}
