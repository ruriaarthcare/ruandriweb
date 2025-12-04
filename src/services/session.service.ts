import { createSessionApi, validateSessionApi ,updateSessionApi  } from "@/api/session.api";
import { saveSession , getSession , clearSession } from "@/utils/session.storage";
import { closeSessionApi } from "@/api/session.api";


export async function createSession() {
  const session = await createSessionApi();

  saveSession(session, );
  
  return session;
}


export async function validateSession() {
  const session = getSession();
  if (!session) return false;

  const res = await validateSessionApi(session.sessionId, session.sessionSecret);

  if (!res.valid) {
    console.log("❌ Session invalid or expired:", res.message);
    clearSession();
    return false;
  }

  console.log("✅ Session valid");
  return true;
}


export async function updateSession(key: string, value: any) {
  const session = getSession();
  if (!session) {
    console.error("❌ No session found");
    return false;
  }

  const res = await updateSessionApi(key, value );

   if (res.closed) {
    console.error("❌ Session has been closed. No more updates allowed.");
    return false;
  }

  if (res.success) {
    console.log(`✅ Session updated: ${key} = ${value}`);
    return true;
  }

  console.log("❌ Failed to update session");
  return false;
}

export async function closeSession() {
  try {
    const res = await closeSessionApi();

    if (res.success) {
      console.log("✅ Session successfully closed");
      return true;
    }

    console.error("❌ Failed to close session");
    return false;

  } catch (err) {
    console.error("❌ Close session error:", err);
    return false;
  }
}