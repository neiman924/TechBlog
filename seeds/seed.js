const sequelize = require('../config/connection');
const { User, CMS , Comment } = require('../models');

const userData = require('./userData.json');
const cmsData = require('./cmsData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const cms of cmsData) {
    await CMS.create({
      ...cms,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
