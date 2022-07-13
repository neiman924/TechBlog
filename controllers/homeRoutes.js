const router = require('express').Router();
const { CMS , User , Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all CMSs and JOIN with user data
    const cmsData = await CMS.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model:Comment,
        }
      ],
    });

    // Serialize data so the template can read it
    const cmss = cmsData.map((cms) => cms.get({ plain: true }));
    //const comLenght = cmss.comments.lenght;
    console.log(cmss);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      cmss, 
      logged_in: req.session.logged_in,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/cms/:id', async (req, res) => {
  try {
    const cmsData = await CMS.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment','name','date_created'],
        }
      ],
    });

    const cmss = cmsData.get({ plain: true });
    const comments = cmss.comments;
    // console.log('test :',comments);
    // console.log('test 2:',cmss);

    res.render('cms', {
      cmss,comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: CMS }],
    });
    // console.log(userData);
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
