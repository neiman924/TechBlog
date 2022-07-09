const router = require('express').Router();
const { CMS } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCms = await CMS.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCms);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cmsData = await CMS.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!cmsData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(cmsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
