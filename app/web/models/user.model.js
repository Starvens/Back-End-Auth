const UserSchema = require("../../_schemas/user.schema");
const bcrypt = require('../../_service/bcrypt');
const jwt = require('../../_service/jwt');

const RESPONSES = require("../../_constants/responses");

class User {


  /**
    * @Todo: Register User
    * @param {*} req 
    * @param {*} res 
    */
  registerUser(req, res) {
    const data = {
      _id: req.body.mobile+"-"+req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile: req.body.mobile,
      zipcode: req.body.zipcode,
      starvens_reference: req.body.starvens_reference,
      email: req.body.email,
      password: bcrypt.hashPassword(req.body.password)
    }

    new UserSchema(data).save((err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else if (doc === null) {
        res.status(200).json({
          success: false,
          message: 'Some thing went wrong'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Registerd successfully',
        });
      };
    });
  };

  /**
   * @Todo: Login User
   * @param {*} req 
   * @param {*} res 
   */
  loginUser(req, res) {
    UserSchema.findOne({
      email: req.body.email
    }, 'email password', (err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else if (doc === null) {
        res.status(200).json({
          success: false,
          message: 'The email address you entered is incorrect. Please try again.'
        });
      } else {
        if (bcrypt.comparePassword(req.body.password, doc.password)) {
          res.status(200).json({
            success: true,
            message: 'Found successfully',
            data: {
              _id: doc._id,
              email: doc.email
            },
            token: jwt.signToken({
              _id: doc._id,
              email: doc.email
            })
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'Password is incorrect. Please try again.'
          });
        };
      };
    });
  };

}

module.exports = User;
