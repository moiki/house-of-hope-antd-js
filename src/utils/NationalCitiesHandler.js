import { uniqBy } from "lodash";
import nicaragua from "utils/json/ni.json";

export const departments = () => {
  const depts = nicaragua.map((dept) => {
    return {
      value: dept.admin_name,
    };
  });

  return uniqBy(depts, "value");
};

export const comunities = (e) => {
  return nicaragua
    .filter((f) => f.admin_name === e)
    .map((v) => {
      return {
        value: v.city,
      };
    });
};
