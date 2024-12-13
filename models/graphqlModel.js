require("dotenv").config();

const fetchGraphQL = async (query) => {
  const url = process.env.GRAPHQL_URL;
  const accessToken = process.env.ACCESS_TOKEN;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ query }),
  });
};

module.exports = { fetchGraphQL };
