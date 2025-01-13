import { fetchGraphQL } from "../models/graphqlModel.js";

export const getRegions = async (req, res) => {
  const query =
    'query {committees(filters:{tag:"Region"}){data{id full_name sub_office_count suboffices{id full_name}}}}';

  try {
    const response = await fetchGraphQL(query);
    if (response.ok) {
      const data = await response.json();
      const regions = data.data.committees.data.reduce((obj, committee) => {
        const adjustedName = committee.full_name.split(" in ")[1];
        obj[adjustedName] = committee.suboffices;
        return obj;
      }, {});
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(regions);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getRegionDetails = async (req, res) => {
  const id = parseInt(req.params.id);
  const currentTermId = req.query.term;

  if (!currentTermId) {
    res.status(500).send("No current term");
    return;
  }

  const query = `{committeeTerm(id:${id},term_id:${currentTermId}){name committee_departments{edges{node{name member_positions{nodes{title person{full_name linkedin_url aiesec_email profile_photo contact_detail{phone country_code}current_positions{focus_products function{name}}}}}}}}member_position{title person{full_name linkedin_url aiesec_email profile_photo contact_detail{phone country_code}}}}}`;

  try {
    const response = await fetchGraphQL(query);
    if (response.ok) {
      const data = await response.json();
      const mcvps = data.data.committeeTerm.committee_departments.edges
        ? data.data.committeeTerm.committee_departments.edges
            .flatMap((department) => department.node.member_positions.nodes)
            .filter((position) => /MCVP/i.test(position.title))
            .map((position) => {
              const { function: func, focus_products: focusProduct } =
                position.person.current_positions[0];
              const posFunction = func.name.split(" - ")[0];
              let pos = position.title.split("MCVP")[1] || posFunction;

              if (focusProduct.includes(7)) {
                pos = posFunction === "OGX" ? "OGV" : "IGV";
              } else if (focusProduct.includes(8) || focusProduct.includes(9)) {
                pos = posFunction === "OGX" ? "OGT" : "IGT";
              }

              return {
                fullName: position.person.full_name,
                position: `MCVP ${pos}`,
                phoneNum: position.person.contact_detail.phone,
                email: position.person.aiesec_email,
                linkedin: position.person.linkedin_url,
                countryCode: position.person.contact_detail.country_code,
                imageURL: position.person.profile_photo,
              };
            })
        : [];

      if (data.data.committeeTerm.member_position) {
        mcvps.unshift({
          fullName: data.data.committeeTerm.member_position.person.full_name,
          position: "MCP",
          phoneNum:
            data.data.committeeTerm.member_position.person.contact_detail.phone,
          email: data.data.committeeTerm.member_position.person.aiesec_email,
          linkedin: data.data.committeeTerm.member_position.person.linkedin_url,
          countryCode:
            data.data.committeeTerm.member_position.person.contact_detail
              .country_code,
          imageURL:
            data.data.committeeTerm.member_position.person.profile_photo,
        });
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(mcvps);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
