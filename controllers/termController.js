const { fetchGraphQL } = require("../models/graphqlModel");

const getTerms = async (req, res) => {
  const query = `{constants(type_id:"term"){id name}}`;
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
};

const getCurrentTerm = (terms) => {
  const currentYear = new Date().getFullYear();
  const isNewTerm = new Date().getMonth() >= 1;

  const currentTerm = terms.find(
    ({ name }) => name.split("-")[isNewTerm ? 0 : 1] === currentYear.toString()
  );
  return currentTerm ? currentTerm : terms[terms.length - 1];
};

module.exports = { getCurrentTerm, getTerms };
