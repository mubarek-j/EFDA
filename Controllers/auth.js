const bcrypt = require("bcryptjs/dist/bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    userName,
    phoneNumber,
    password,
    password_repeat,
  } = req.body;

  db.query(
    "SELECT `email` FROM `userprofile` WHERE `email` = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
      if (result.length > 0) {
        return res.render("register", {
          message: "That email is already in use!",
        });
      } else if (password !== password_repeat) {
        return res.render("register", {
          message: "The passwords doesn't match!",
        });
      } else {
        let hashedPass = await bcrypt.hash(password, 8);
        db.query(
          "INSERT INTO `userprofile`(`firstName`, `lastName`, `email`, `userName`, `phoneNumber`, `password`) VALUES (?,?,?,?,?,?)",
          [first_name, last_name, email, userName, phoneNumber, hashedPass],
          (error) => {
            if (error) {
              console.log(error);
            } else {
              return res.render("register", {
                Success: "User Registered Successfuly! Go to Login.",
              });
            }
          }
        );
      }
    }
  );
};

exports.Adminregister = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    userName,
    phoneNumber,
    password,
    password_repeat,
  } = req.body;

  db.query(
    "SELECT `email` FROM `Admin` WHERE `email` = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        return res.render("register", {
          message: "That email is already in use!",
        });
      } else if (password !== password_repeat) {
        return res.render("register", {
          message: "The passwords doesn't match!",
        });
      } else {
        let hashedPass = await bcrypt.hash(password, 8);
        db.query(
          "INSERT INTO `Admin`(`firstName`, `lastName`, `email`, `userName`, `phoneNumber`, `password`) VALUES (?,?,?,?,?,?)",
          [first_name, last_name, email, userName, phoneNumber, hashedPass],
          (error) => {
            if (error) {
              console.log(error);
            } else {
              return res.render("Admin-register", {
                Success: "User Registered Successfuly! Go to Login.",
              });
            }
          }
        );
      }
    }
  );
};

exports.message = (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;
  db.query(
    "INSERT INTO `messages`(`FullName`, `Email`, `PhoneNumber`, `Message`) VALUES (?,?,?,?)",
    [fullName, email, phoneNumber, message],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        res.render("HOME-EFDA", {
          Success: "Message Submitted.",
        });
      }
    }
  );
};

exports.Login = (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM `userprofile` WHERE `email` = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length == 0) {
        res.render("Login", {
          error: "E-mail doesn't exist!",
        });
      } else {
        const pass = result[0].password;
        const validPass = await bcrypt.compare(req.body.password, pass);
        if (!validPass) {
          res.render("Login", {
            error: "Password is incorrect!",
          });
        } else {
          const token = jwt.sign(
            { id: result[0].ID },
            process.env.TOKEN_SECRET
          );
          // console.log(result[0].ID)
          // console.log(token)
          req.user = { id: result[0].id };
          res.cookie("user_id", token, { httpOnly: true });

          res.redirect("/auth/showprofile");
        }
      }
    }
  );
};

exports.Adminlogin = (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM `Admin` WHERE `email` = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length == 0) {
        return res.render("Login", {
          error: "E-mail doesn't exist!",
        });
      } else {
        const pass = result[0].password;
        const validPass = await bcrypt.compare(req.body.password, pass);
        if (!validPass) {
          return res.render("Login", {
            error: "Password is incorrect!",
          });
        } else {
          const token = jwt.sign(
            { id: result[0].ID },
            process.env.TOKEN_SECRET
          );
          // console.log(result[0].ID)
          // console.log(token)
          req.user = { id: result[0].id };
          res.cookie("user_id", token, { httpOnly: true });

          res.redirect("/auth/Admin");
        }
      }
    }
  );
};
exports.profile = (req, res) => {
  const token = req.cookies.user_id;
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  const id = data.id;
  const { region, city, address, org_name, applicant, Licence } = req.body;
  db.query(
    "UPDATE `userprofile` SET `region`= ?,`city`= ?,`address`= ?,`orgName`= ?,`applicantRole`= ?,`Licence`= ? WHERE `ID` = ?",
    [region, city, address, org_name, applicant, Licence, id],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        return res.render("profile", {
          profile: "Profile Completed!",
        });
      }
    }
  );
};

exports.showProfile = function (req, res) {
  const token = req.cookies.user_id;
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  // console.log(data.id );
  // console.log(token)
  db.query(
    "SELECT * FROM `userprofile` WHERE `ID` = ?",
    [data.id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.render("show-profile", {
          username: result[0].username,
          email: result[0].email,
          firstname: result[0].firstName,
          lastname: result[0].lastName,
          region: result[0].region,
          city: result[0].city,
          address: result[0].address,
          orgname: result[0].orgName,
          applicant: result[0].applicantRole,
          licence: result[0].Licence,
        });
      }
    }
  );
};

exports.Import = (req, res) => {
  const { orgLicence } = req.body;
  db.query(
    "SELECT `Licence` FROM `userprofile` WHERE `Licence` = ?",
    [orgLicence],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length == 0) {
        return res.render("Import", {
          licence: "Licence not Found",
        });
      } else {
        return res.redirect("/Import1");
      }
    }
  );
};

exports.Import1 = (req, res) => {
  const {
    Organization,
    Address,
    full_name,
    applicant,
    importDate,
    EntryPoint,
    substanceName,
    drugCode,
    Concentration,
    FormofSubstance,
    PackSize,
    TotalPack,
  } = req.body;
  db.query(
    "INSERT INTO `order`(`OrgName`, `Address`, `FullName`, `Role`, `importDate`, `EntryPoint`, `SubstanceName`, `drugCode`, `Concentration`, `FormSubstance`, `PackSize`, `TotalPack`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      Organization,
      Address,
      full_name,
      applicant,
      importDate,
      EntryPoint,
      substanceName,
      drugCode,
      Concentration,
      FormofSubstance,
      PackSize,
      TotalPack,
    ],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        return res.render("Import1", {
          order: "Order Submited!",
        });
      }
    }
  );
};

exports.logout = (req, res) => {
  res.clearcookie("jwt");
  return res.redirect("/");
};

exports.Adminmessage = (req, res) => {
  db.query("SELECT * FROM `messages`", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.render("Admin-message", { result });
    }
  });
};

exports.Admin = (req, res) => {
  db.query("SELECT * FROM `order`", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.render("Admin", { result });
    }
  });
};
