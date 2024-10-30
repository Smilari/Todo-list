export const setCustomOwner = async (req, res, next) => {
  const { id } = req.user;
  req.body.owner = id;
  next();
};

export const setTask = async (req, res, next) => {
  req.body.task = req.task.id;
  next();
};