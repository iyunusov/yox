
import "server-only";

import { cookies } from "next/headers";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert({
          // type: "service_account",
          projectId: "yox1-a9e83",
          // privateKeyId: "661728dddd854ae7b2756f32399e2aa1284cc773",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJfGbf18kqxEL4\ndDGx9oghoFZSEq5qE/Dh/iRFHNL/ydgSx8ZzoK1ud6YDKJCIuC/gkvWk2iBMyQq+\nzhGzjcp/ZLj3hvbzqGLS0LitvHHDTyksVVtnCrJnbuy/nEToI0Uh4N9qctPaMoQd\n2h51SPslLU0rJBexO7uYdLAW05wpvBMjqyTPctPBWPPoXu945f1GNUiuA2VeUtYp\nF5X1QpomVrFA4RA/qaiqBQMolkj8XK6gkqkRsr5WXcPv+x2jZRPkaCO0n8F7bnTo\nokLvIZrK8IY4ZxDyqA47o/RdR4n3tErWpjZ3zBLPq+QWHpsWycrTGw9XKPxZ6o+P\n1PFEvMhtAgMBAAECggEABegrwUGQ7ZFgv+qdeluBP4XKghAiJOH+HIytgN6Iy7md\n0rnLS6CDn8rKMdWCnJTUcn+xy+oegEx0kDDNEWKFc+6pWDhmDQamvwoiH+siZVjG\nGuf1t15M6f4KhXjjXEWMb/h+aZ8sLtLET3Zm5jFZi4wkcwX/29D7KEu4zd0uUDAx\n8NZeUoalEVwWt/Xx1w4M0dThG1AudStZMNbvZuBGlPISZgsyLDU77Tk9l7Olm8/d\nkdYsW6hBENuDT+2dtADsKeY8ijT0ZDbuGXdnmgvbd9fOf+tqLoZObR3WebpjQXx5\niaYrIaade6DMs+niu5NsIvrB3uT96RD3MVYQ0ckMUQKBgQD/2BzRUTP009l+tD+d\nz18etoWnBh8y+rRHbHQNFbgh+pAXJnZhB42N3Iy6CQQIrOBMit/5U5wr2GUpO7jj\nF/DTMqXHXpX6NT55YVmc8eo6pEIjkywYXu7iEtg94RPQCimpZ3htbQbsCKAlXqTQ\nga25GQ21ctcrDB0iXigQ+z8M+wKBgQDJm9CGideHsuU+TULJn5fDZVsIIwMM5tfN\nmfq7FfIz93VS2S7JPHPZGSw6yRDr/yrVVVUgIau0oZo/SV1ev4MnROSAKcfgs1uO\nCl62fsxnTBXSyCadtwLzNY07my0zGuEZx1WnT9KXSgdCcPUWEYkv9poeKFXL4LHb\nCHguTBWztwKBgHAsEsZ7cepAEDYLVXEdgLj4kbTfbEJvxScjl+Y8xZSwRQjBZlm4\ndAnkzxap6UjccyNcKEMqs2hN4lynwLJgxsfyhtjY0az4N0IEusOjFW1Mo2rxlf3B\ncb9RP9oxmvw12Hpb0WM40DYgugZobp60nLRxFZ+ekFRhZUyyN6LqZYSNAoGAFo4c\nEjExr7jP9Nxn8G6uZ+na+VoRaUwaMKJdbrjR1AaHVbF+jnz46Pzr+des0PpHLH7T\nezjJIPhDbXkjvQnn/miyt7P07KqkP4vhdMFS1OuqNV63E0X6SoNfPZ/quqDzNhMa\n/hDsGojprwE8Ki/kDT2lmGIi1yBYRYz5BRT2CJkCgYEApsTl/9cbkikPz8UnK1pB\nGEyDQc7QeEuUmeSHpBEfL7wODMYLTNq3bYRFg4/FXNJM6afAclHt9R6xWec0zjLu\nte7OLdXm+MvJV57wsCWY36MsE5uzmQTNi+XfledswuO0aSz0J9H5sW/DU5vwlTNJ\n4zdKXXnSPXztKnE3igrzZd0=\n-----END PRIVATE KEY-----\n",
          clientEmail: "firebase-adminsdk-whkc9@yox1-a9e83.iam.gserviceaccount.com",
          // clientId: "118348302426734074164",
          // authUri: "https://accounts.google.com/o/oauth2/auth",
          // tokenUri: "https://oauth2.googleapis.com/token",
          // authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
          // clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-whkc9%40yox1-a9e83.iam.gserviceaccount.com",
          // universeDomain: "googleapis.com",
      }),
    },
    "firebase-admin-app"
  );
export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return currentUser;
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}