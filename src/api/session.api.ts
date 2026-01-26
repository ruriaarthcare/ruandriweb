const API = import.meta.env.VITE_API_URL
/* ======================================================
   CREATE SESSION
====================================================== */
export async function createSessionApi() {

  const res = await fetch(`${API}/session/create`, { method: "POST" });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Failed to create session:", errorText);
    throw new Error("Failed to create session");
  }

  const data = await res.json();

  return data;
}

/* ======================================================
   VALIDATE SESSION
====================================================== */
export async function validateSessionApi(sessionId: string, token: string) {

  const res = await fetch(`${API}/session/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, token: token }), 
  });

  if (!res.ok) {
    return { valid: false };
  }

  return await res.json();
}

/* ======================================================
   UPDATE SESSION
====================================================== */
export async function updateSessionApi(key: string, value: any) {
  const session = JSON.parse(localStorage.getItem("session") || "null");
  if (!session) throw new Error("No session");

  const payload = {
    sessionId: session.sessionId,
    token: session.sessionSecret, 
    key,
    value,
  };


  const res = await fetch(`${API}/session/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });



  if (res.status === 403) {
    localStorage.removeItem("session");
    return { success: false, closed: true };
  }

  if (!res.ok) {
    throw new Error("Failed to update session");
  }

  return await res.json();
}

/* ======================================================
   CLOSE SESSION
====================================================== */
export async function closeSessionApi() {
  const session = JSON.parse(localStorage.getItem("session") || "null");
  if (!session) throw new Error("No session");

  const payload = {
    sessionId: session.sessionId,
    token: session.sessionSecret, 
  };

  const res = await fetch(`${API}/session/close`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}
