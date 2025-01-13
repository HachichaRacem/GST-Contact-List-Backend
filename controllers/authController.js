export const login = (_, res) => {
  const url = new URL("https://auth.aiesec.org/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", process.env.CLIENT_ID);
  url.searchParams.set("redirect_uri", process.env.REDIRECT_URI);
  url.searchParams.set("state", "");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.redirect(url.toString());
};

export const handleRedirect = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code missing" });
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const tokenData = await _getAccessToken(code);
    res.json({ message: "User authenticated successfully", tokenData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to authenticate", details: error.message });
  }
};

const _getAccessToken = async (code) => {
  const url = "https://auth.aiesec.org/oauth/token";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    }),
  });
  return response.json();
};
