const User = require('./User');
const CMS = require('./CMS');
const Comment = require('./Comment');

User.hasMany(CMS, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

CMS.belongsTo(User, {
  foreignKey: 'user_id'
});


CMS.hasMany(Comment, {
  foreignKey: 'cms_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(CMS, {
  foreignKey: 'cms_id'
});



module.exports = { User, CMS , Comment };
