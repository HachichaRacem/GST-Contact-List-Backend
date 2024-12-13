const { fetchGraphQL } = require("../models/graphqlModel");

const getCurrentTermId = async () => {
  const query = `{constants(type_id:"term"){id name}}`;
  const response = await fetchGraphQL(query);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const terms = data.data.constants;
  const currentYear = new Date().getFullYear();
  const isNewTerm = new Date().getMonth() >= 1;

  const currentTerm = terms.find(
    ({ name }) => name.split("-")[isNewTerm ? 0 : 1] === currentYear.toString()
  );
  return currentTerm ? currentTerm.id : null;
};

module.exports = { getCurrentTermId };
