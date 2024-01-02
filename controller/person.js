const Router = require("express");
const multer  = require('multer')
const personService = require("../services/person");
const validateRequest = require("../middleware/personValidator")
const route = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg')
    }
})
const upload = multer({ storage: storage })

route.post('/', [upload.single('picture'), validateRequest], async (req, res) => {
    const response = await personService.create(req.body, req.file.filename);
    return res.status(response.status).json({res: response.res});
});

route.get('/', async(req, res) => {
  const response = await personService.getAll();
  return res.status(response.status).json({res: response.res});
})

route.get('/find', async(req, res) => {
  const response = await personService.find(req.query);
  return res.status(response.status).json({res: response.res});
})

route.get('/:dni', async(req, res) => {
  const response = await personService.findOne(req.params);
  return res.status(response.status).json({res: response.res});
})

route.delete('/:dni', async(req, res) => {
  const response = await personService.delete(req.params);
  return res.status(response.status).json({res: response.res});
})

route.put('/:dni', async(req, res) => {
  const response = await personService.edit(req.params, req.body);
  return res.status(response.status).json({res: response.res});
})

route.get('/export/csv', async(req, res) => {
  await personService.export(req,res);
})

route.post('/address/:dni', async (req, res) => {
  const response = await personService.addAddressToUser(req.params,req.body);
  return res.status(response.status).json({res: response.res});
});

module.exports = route;



