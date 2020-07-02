// take only needed user fields to avoid sensitive ones (such as password)
export function extractUser(req) {
  if (!req.user) return null;
  const {
    _id,
    name,
    username,
    picture,
    gender,
    age,
    minAge,
    maxAge,
    location,
    maxRange,
    nationality,
  } = req.user;

  return {
    _id,
    name,
    username,
    picture,
    gender,
    age,
    minAge,
    maxAge,
    location,
    maxRange,
    nationality,
  };
}