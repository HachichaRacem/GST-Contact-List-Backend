import { fetchGraphQL } from "../models/graphqlModel.js";

export const getUserData = async (req, res) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) {
    res.status(404).send("Access token not found");
    return;
  }
  try {
    const query = `query {currentPerson{id full_name alternate_email aiesec_email profile_photo contact_detail{phone country_code}}}`;
    const response = await fetchGraphQL(query, accessToken);
    if (response.ok) {
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data.data.currentPerson);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

function stringifyValues(obj) {
  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      return `${key}: ${stringifyValues(value)}`;
    }
    return `${key}: ${value}`;
  });
  return `{${entries.join(", ")}}`;
}

export const updateUser = async (req, res) => {
  const userData = req.body.userData;
  const accessToken = req.body.accessToken;
  const id = req.params.id;
  if (!userData || !id || !accessToken) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    const person = {
      alternate_email: JSON.stringify(userData["alternate_email"]),
      contact_detail_attributes: {
        phone: JSON.stringify(userData["phone"]),
        country_code: JSON.stringify(userData["country_code"]),
      },
    };
    const query = `mutation {updatePerson(id: "${id}", person : ${stringifyValues(
      person
    )}){id full_name alternate_email aiesec_email profile_photo contact_detail{phone country_code}}}`;
    const response = await fetchGraphQL(query, accessToken);
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        console.error(JSON.stringify(data.errors.message));
        res.status(400).send(data.errors[0].message);
        return;
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
