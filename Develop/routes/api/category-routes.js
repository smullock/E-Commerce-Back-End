const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products
router.get('/',async(req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
  });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});


 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});


// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const deleteCategoryData = await Category.destroy(
      {
      where: {
        id: req.params.id,
      },
      }
    );

    if (!deleteCategoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(deleteCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
