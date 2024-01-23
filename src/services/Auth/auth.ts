export const signUp = async (
  userName: string,
  email: string,
  password: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(process.env.NEXT_PUBLIC_API_LINK + "/register", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      username: userName,
      email: email,
      password: password,
    }),
  });

  const resData = await res.json();
  const user = resData.data;

  if (res.ok && user) {

    return user;
  } else return null;
};

export const signIn = async (email: string, password: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(process.env.NEXT_PUBLIC_API_LINK + "/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const resData = await res.json();
  const user = resData.data;

  if (res.ok && user) {
    document.cookie = "id=" + user._id + "; path=/";
    document.cookie = "username=" + user.username + "; path=/";
    document.cookie = "email=" + user.email + "; path=/";
    document.cookie = "accessToken=" + user.accessToken + "; path=/";
    document.cookie = "role=" + user.role + "; path=/";

    window.location.assign("/");

    return user;
  } else return null;
}

export function signOut() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }

  window.location.assign("/auth/login");
}
