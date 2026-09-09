const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// 0. UPLOAD API
export async function uploadAdminImage(token: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}

// 1. SECTIONS API
export async function fetchAdminSections(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/sections`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateAdminSection(token: string, data: {
  page_slug?: string;
  section_code: string;
  badge_text: string;
  title: string;
  description: string;
  content_payload?: string;
  sort_order?: number;
  is_published?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/admin/sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 2. BANNERS API
export async function fetchAdminBanners(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/banners`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createAdminBanner(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/banners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateAdminBanner(token: string, id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/banners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAdminBanner(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/banners/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// 3. MENUS API
export async function fetchAdminMenus(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/menus`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateAdminMenu(token: string, id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/menus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
