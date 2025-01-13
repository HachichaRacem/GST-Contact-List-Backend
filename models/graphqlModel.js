import dotenv from "dotenv";

dotenv.config();

export const fetchGraphQL = async (
  query,
  accessToken = process.env.ACCESS_TOKEN
) => {
  const url = process.env.GRAPHQL_URL;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ query }),
  });
};
