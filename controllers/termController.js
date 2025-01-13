import { fetchGraphQL } from "../models/graphqlModel.js";

export const getTerms = async (req, res) => {
  const query = `{constants(type_id:"term"){id name}}`;

  try {
    const reponse = await fetchGraphQL(query);
    if (reponse.ok) {
      const data = await reponse.json();
      const terms = data.data.constants;
      const currentTerm = getCurrentTerm(terms);
      res.send({
        terms: terms,
        currentTerm: currentTerm,
      });
    } else {
      res.status(reponse.status).send(reponse.statusText);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getCurrentTerm = (terms) => {
  const currentYear = new Date().getFullYear();
  const isNewTerm = new Date().getMonth() >= 1;

  const currentTerm = terms.find(
    ({ name }) => name.split("-")[isNewTerm ? 0 : 1] === currentYear.toString()
  );
  return currentTerm ? currentTerm : terms[terms.length - 1];
};
