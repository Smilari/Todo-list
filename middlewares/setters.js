export const setCustomOwner = async (req, res, next) => {
  const { userId } = req.params;
  const { role, id } = req.user;

  if (role === "admin") {
    req.body.owner = userId;
  } else {
    req.body.owner = id;
  }

  next();
};

export const setTask = async (req, res, next) => {
  req.body.task = req.task.id;
  next();
};