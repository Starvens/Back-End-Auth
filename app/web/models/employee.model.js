const EmployeeSchema = require("../../_schemas/employee.schema");
const RESPONSES = require("../../_constants/responses");

class Employee {
  /**
   * @Todo: List all Employees
   * @param {*} req
   * @param {*} res
   */
  getAllEmployee(req, res) {
    EmployeeSchema.find({
      is_active: true,
    })
      .select("_id name age email phone")
      .exec((err, doc) => {
        if (err) {
          res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
        } else if (doc.length == 0) {
          res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
        } else {
          res.status(200).json({
            success: true,
            data: doc,
          });
        }
      });
  }

  /**
   * @Todo: List one Employee
   * @param {*} req
   * @param {*} res
   */
  getOneEmployee(req, res) {
    EmployeeSchema
      .findOne({
        _id: req.params.employee_id,
        is_active: true,
      })
      .select("_id name age email phone")
      .exec((err, doc) => {
        if (err) {
          res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
        } else if (doc === null) {
          res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
        } else {
          res.status(200).json({
            success: true,
            data: doc,
          });
        }
      });
  }

  /**
   * @Todo: Add Employee
   * @param {*} req
   * @param {*} res
   */
  addEmployee(req, res) {
    new EmployeeSchema(req.body).save((err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else {
        res.status(200).json({
          success: true,
          message: "Added Successfully!",
          data: {
            _id: doc._id,
            name: doc.name,
          },
        });
      }
    });
  }

  /**
   * @Todo: Update Employees
   * @param {*} req
   * @param {*} res
   */
  updateEmployee(req, res) {
    EmployeeSchema.findByIdAndUpdate(
      {
        _id: req.params.employee_id,
      },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          phone: req.body.phone,
          updated_at: new Date(),
          updated_by: req.body.updated_by,
        },
      }
    ).exec((err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else if (doc === null) {
        res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
      } else {
        res.status(200).json({
          success: true,
          message: "Updated Successfully!",
          _id: doc.id,
        });
      }
    });
  }

  /**
   * @Todo: Deactivate Employee
   * @param {*} req
   * @param {*} res
   */
  deActivateEmployee(req, res) {
    EmployeeSchema.findByIdAndUpdate(
      {
        _id: req.params.employee_id,
      },
      {
        $set: {
          is_active: false,
          updated_at: new Date(),
        },
      }
    ).exec((err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else if (doc === null) {
        res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
      } else {
        res.status(200).json({
          success: true,
          message: "Deactivated Successfully!",
          _id: doc.id,
        });
      }
    });
  }

  /**
   * @Todo: Delete Employee
   * @param {*} req
   * @param {*} res
   */
  deleteEmployee(req, res) {
    EmployeeSchema.findByIdAndRemove({
      _id: req.params.employee_id,
    }).exec((err, doc) => {
      if (err) {
        res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
      } else if (doc === null) {
        res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
      } else {
        res.status(200).json({
          success: true,
          message: "Deleted Successfully!",
          _id: doc.id,
        });
      }
    });
  }
}

module.exports = Employee;
