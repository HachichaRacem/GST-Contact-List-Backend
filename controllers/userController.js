import { fetchGraphQL } from "../models/graphqlModel.js";

export const getUserData = async (req, res) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) {
    res.status(404).send("Access token not found");
    return;
  }
  try {
    const query = `query {currentPerson{id full_name alternate_email aiesec_email contact_detail{phone country_code}}}`;
    const response = await fetchGraphQL(query);
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
export const updateUserAlternateEmail = async (req, res) => {
  const accessToken = req.body.accessToken;
  const id = req.params.id;
  const alternateEmail = req.body.alternateEmail;
  if (!accessToken) {
    res(404).send("Access token not found");
    return;
  }
  if (id == null || alternateEmail == null) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    const query = `mutation {updatePerson(id: "${id}", alternate_email: "${alternateEmail}"){id full_name alternate_email aiesec_email contact_detail{phone country_code}}}`;
    const response = fetchGraphQL(query);
    if (response.ok) {
      const data = response.json();
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

export const updateUserPhone = async (req, res) => {
  const accessToken = req.body.accessToken;
  const id = req.params.id;
  const phone = req.body.phone;
  if (!accessToken) {
    res(404).send("Access token not found");
    return;
  }
  if (id == null || phone == null) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    const query = `mutation {updatePerson(id: "${id}", contact_detail_attributes: {phone: "${phone}"}){id full_name alternate_email aiesec_email contact_detail{phone country_code}}}`;
    const response = fetchGraphQL(query);
    if (response.ok) {
      const data = response.json();
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
export const updateUserCountryCode = async (req, res) => {
  const accessToken = req.body.accessToken;
  const id = req.params.id;
  const countryCode = req.body.countryCode;
  if (!accessToken) {
    res(404).send("Access token not found");
    return;
  }
  if (id == null || countryCode == null) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    const query = `mutation {updatePerson(id: "${id}", contact_detail_attributes: {country_code: "${countryCode}"}){id full_name alternate_email aiesec_email contact_detail{phone country_code}}}`;
    const response = fetchGraphQL(query);
    if (response.ok) {
      const data = response.json();
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
