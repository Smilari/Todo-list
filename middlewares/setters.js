export const setOwner = async (req, res, next) => {
  req.body.owner = req.user.id;
  next();
};

export const setTask = async (req, res, next) => {
  req.body.task = req.task.id;
  next();
};