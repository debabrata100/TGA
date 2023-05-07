import React from "react";

function getGoogleAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OATH_REDIRECT_URL,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  console.log(options);
  const qs = new URLSearchParams(options);
  console.log({ qs });
  return `${rootUrl}?${qs.toString()}`;
}

export default function Home() {
  return (
    <div>
      <p>Wecome to client</p>
      <div>
        <a href={getGoogleAuthUrl()}>Login with Google</a>
      </div>
    </div>
  );
}
