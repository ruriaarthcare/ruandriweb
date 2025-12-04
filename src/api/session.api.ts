import axios from "axios";

const API =  "https://api-difbvyyjra-uc.a.run.app";

export async function createSessionApi() {
  const res = await fetch(`${API}/session/create`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export async function validateSessionApi(sessionId: string, sessionSecret: string) {
  const res = await fetch(
    `${API}/session/validate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, sessionSecret }),
    }
  );

  if (!res.ok) return { valid: false };
  return res.json();
}



// optional update API call
export async function updateSessionApi(key: string, value: any) {
  const session = JSON.parse(localStorage.getItem("session") || "null");

  if (!session) throw new Error("No session");

  const res = await fetch(`${API}/session/update`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ sessionId: session.sessionId, sessionSecret: session.sessionSecret, key, value  })
  });

  if (res.status === 403) {
    console.warn("Session is closed on backend. Clearing client session...");
    localStorage.removeItem("session");
    return { success: false, closed: true };
  }
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function closeSessionApi() {
  const session = JSON.parse(localStorage.getItem("session") || "null");
  if (!session) throw new Error("No session found");

  const res = await fetch(`${API}/session/close`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: session.sessionId,
      sessionSecret: session.sessionSecret
    })
  });

  if (!res.ok) throw new Error("Failed to close session");

  return res.json();
}


