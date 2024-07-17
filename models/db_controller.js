var mysql = require("mysql");
var express = require("express");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "budapest",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected");
  }
});

module.exports = con;

module.exports.signup = function (username, email, password, status, callback) {
    var query =
      "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
      username +
      "','" +
      email +
      "','" +
      password +
      "','" +
      status +
      "')";
    con.query(query, callback);
  };

  module.exports.getuserid = function (email, callback) {
    var query = "select *from verify where email = '" + email + "' ";
    con.query(query, callback);
  };

  module.exports.verify = function (username, email, token, callback) {
    var query =
      "insert into `verify` (`username`,`email`,`token`) values ('" +
      username +
      "','" +
      email +
      "','" +
      token +
      "')";
    con.query(query, callback);
  };

  module.exports.make_bookings = function (
    id,
    name,
    email,
    phone,
    service,
    pickup_location,
    dropoff_location,
    pickup_time,
    dropoff_time,
    days,
    note,
    total_cost,
    callback
  ) {
    var query = 
    "INSERT INTO bookings(id, name, email, phone, service, pickup_location, dropoff_location, pickup_time, dropoff_time, days, note, total_cost) VALUES ('"+id +"', '"+name +"', '"+email+"', '"+phone+"','"+service +"', '"+pickup_location +"', '"+dropoff_location+"', '"+pickup_time+"','"+dropoff_time +"', '"+days+"', '"+note+"', '"+total_cost+"')";
    con.query(query, callback);
  }

module.exports.add_driver = function (
  first_name,
  last_name,
  email,
  phone,
  dob,
  gender,
  address,
  image,
  id_passport,
  driving_licence,
  certificate_of_good_conduct,
  kcse_certificate,
  callback
) {
  var query = "INSERT INTO `driver`(`first_name`,`last_name`,`email`,`phone`,`dob`,`gender`,`address`,`image`,`id_passport`,`driving_licence`,`certificate_of_good_conduct`,`kcse_certificate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [first_name, last_name, email, phone, dob, gender, address, image, id_passport, driving_licence, certificate_of_good_conduct, kcse_certificate];
  con.query(query, values, callback);
};


  module.exports.getAllDriver = function (callback) {
    var query = "select * from driver";
    con.query(query, callback);
  };

  module.exports.getDriverbyId = function (id, callback) {
    var query = "select * from driver where id =" + id;
    con.query(query, callback);
  };

  module.exports.getEmpbyId = function (id, callback) {
    var query = "select * from employee where id =" + id;
    con.query(query, callback);
  };

  module.exports.editDriver = function (
    id,
    first_name,
    last_name,
    email,
    dob,
    gender,
    address,
    phone,
    image,
    department,
    callback
  ) {
    var query =
      "update `driver` set `first_name`='" +
      first_name +
      "', `last_name`='" +
      last_name +
      "', `email`='" +
      email +
      "', `dob`='" +
      dob +
      "',`gender`='" +
      gender +
      "',`address`='" +
      address +
      "',`phone`='" +
      phone +
      "',`image`='" +
      image +
      "',`department`='" +
      department +
      "' where id=" +
      id;
    con.query(query, callback);
    // console.log(query);
  };

  module.exports.acceptDriver = function (id, callback) {
    var query = "UPDATE driver SET status = 'accepted' WHERE id = ?";
    con.query(query, [id], callback);
};

module.exports.rejectDriver = function (id, callback) {
    var query = "UPDATE driver SET status = 'rejected' WHERE id = ?";
    con.query(query, [id], callback);
};

  module.exports.editEmp = function (
    id,
    name,
    email,
    contact,
    join_date,
    role,
    callback
  ) {
    var query =
      "update `employee` set `name`='" +
      name +
      "', `email`='" +
      email +
      "', `contact`='" +
      contact +
      "', `join_date`='" +
      join_date +
      "', `role`='" +
      role +
      "' where id=" +
      id;
    con.query(query, callback);
  };
  module.exports.deleteDriver = function (id, callback) {
    //console.log("i m here");
    var query = "delete from driver where id=" + id;
    con.query(query, callback);
  };

  module.exports.deleteEmp = function (id, callback) {
    //console.log("i m here");
    var query = "delete from employee where id=" + id;
    con.query(query, callback);
  };

  module.exports.deletemed = function (id, callback) {
    //console.log("i m here");
    var query = "delete from store where id=" + id;
    con.query(query, callback);
  };

  module.exports.postcomplain = function (
    message,
    name,
    email,
    subject,
    callback
  ) {
    var query =
      "insert into complain (message,name,email,subject) values ('" +
      message +
      "','" +
      name +
      "','" +
      email +
      "','" +
      subject +
      "')";
    console.log(query);
    con.query(query, callback);
  };

  module.exports.getcomplain = function (callback) {
    var query = "select * from complain";
    con.query(query, callback);
  };

  module.exports.add_ride = function (
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone,
    callback
  ) {
    var query =
      "INSERT INTO ride (passenger_name, department, driver_name, date, time, email, phone) VALUES ('" +
      p_name +
      "','" +
      department +
      "','" +
      d_name +
      "','" +
      date +
      "','" +
      time +
      "','" +
      email +
      "','" +
      phone +
      "')";
    con.query(query, callback);
  };
  

  module.exports.getallride = function (callback) {
    var query = "select * from ride";
    con.query(query, callback);
  };

  module.exports.searchDriver = function (key, callback) {
    var query = 'SELECT  *from driver where first_name like "%' + key + '%"';
    con.query(query, callback);
    console.log(query);
  };

  module.exports.searchmed = function (key, callback) {
    var query = 'SELECT  *from store where name like "%' + key + '%"';
    con.query(query, callback);
  };
  
  module.exports.searchEmp = function (key, callback) {
    var query = 'SELECT  *from employee where name  like "%' + key + '%"';
    con.query(query, callback);
    console.log(query);
  };

  module.exports.getridebyid = function (id, callback) {
    var query = "select * from ride where id=" + id;
    console.log(query);
    con.query(query, callback);
  };

  module.exports.editride = function (
    id,
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone,
    callback
  ) {
    var query =
      "update ride set passenger_name='" +
      p_name +
      "',department='" +
      department +
      "',driver_name='" +
      d_name +
      "',date='" +
      date +
      "',time='" +
      time +
      "',email='" +
      email +
      "',phone='" +
      phone +
      "' where id=" +
      id;
    con.query(query, callback);
  };

  module.exports.deleteride = function (id, callback) {
    var query = "delete from ride where id=" + id;
    con.query(query, callback);
  };

  module.exports.findOne = function (email, callback) {
    var query = "select *from users where email='" + email + "'";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.temp = function (id, email, token, callback) {
    var query =
      "insert into `temp` (`id`,`email`,`token`) values ('" +
      id +
      "','" +
      email +
      "','" +
      token +
      "')";
    con.query(query, callback);
  };

  module.exports.checktoken = function (token, callback) {
    var query = "select *from temp where token='" + token + "'";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.setpassword = function (id, newpassword, callback) {
    var query =
      "update `users` set `password`='" + newpassword + "' where id=" + id;
    con.query(query, callback);
  };

  module.exports.add_employee = function (
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    callback
  ) {
    var query =
      "Insert into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) values ('" +
      name +
      "','" +
      email +
      "','" +
      contact +
      "','" +
      join_date +
      "','" +
      role +
      "','" +
      salary +
      "')";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.addMed = function (
    name,
    p_date,
    expire,
    e_date,
    price,
    quantity,
    callback
  ) {
    var query =
      "Insert into `store` (name,p_date,expire,expire_end,price,quantity) values('" +
      name +
      "','" +
      p_date +
      "','" +
      expire +
      "','" +
      e_date +
      "','" +
      price +
      "','" +
      quantity +
      "')";
    console.log(query);
    con.query(query, callback);
  };

  module.exports.getMedbyId = function (id, callback) {
    var query = "select * from store where id=" + id;
    con.query(query, callback);
  };

  module.exports.editmed = function (
    id,
    name,
    p_date,
    expire,
    e_date,
    price,
    quantity,
    callback
  ) {
    var query =
      "update store set name='" +
      name +
      "', p_date='" +
      p_date +
      "',expire='" +
      expire +
      "' ,expire_end='" +
      e_date +
      "',price='" +
      price +
      "',quantity='" +
      quantity +
      "' where id=" +
      id;
    console.log(query);
    con.query(query, callback);
  };

  module.exports.getallmed = function (callback) {
    var query = "select *from store order by id desc";
    console.log(query);
    con.query(query, callback);
  };
  
  module.exports.getAllemployee = function (callback) {
    var query = "select * from employee";
    con.query(query, callback);
  };

  module.exports.add_leave = function (
    name,
    id,
    type,
    from,
    to,
    reason,
    callback
  ) {
    var query =
      "Insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values ('" +
      name +
      "','" +
      id +
      "','" +
      type +
      "','" +
      from +
      "','" +
      to +
      "','" +
      reason +
      "')";
    console.log(query);
    con.query(query, callback);
  };

  module.exports.getAllLeave = function (callback) {
    var query = "Select * from leaves";
    con.query(query, callback);
  };
  
  module.exports.matchtoken = function (id, token, callback) {
    var query = "select * from `verify` where token='" + token + "' and id=" + id;
    con.query(query, callback);
    console.log(query);
  };
  
  module.exports.updateverify = function (email, email_status, callback) {
    var query =
      "update `users` set `email_status`='" +
      email_status +
      "' where `email`='" +
      email +
      "'";
    con.query(query, callback);
  };

  module.exports.add_dept = function (name, desc, callback) {
    var query =
      "insert into departments(department_name,department_desc) values ('" +
      name +
      "','" +
      desc +
      "')";
    con.query(query, callback);
  };
  
  module.exports.getalldept = function (callback) {
    var query = "select * from departments";
    con.query(query, callback);
  };
  
  module.exports.delete_department = function (id, callback) {
    var query = "delete from departments where id=" + id;
    con.query(query, callback);
  };

  module.exports.getdeptbyId = function (id, callback) {
    var query = "select * from departments where id=" + id;
    con.query(query, callback);
  };
  
  module.exports.edit_dept = function (id, name, desc, callback) {
    var query =
      "update departments set department_name='" +
      name +
      "',department_desc='" +
      desc +
      "' where id=" +
      id;
    con.query(query, callback);
  };
  
  module.exports.getuserdetails = function (username, callback) {
    var query = "select * from users where username='" + username + "'";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.edit_profile = function (
    id,
    username,
    email,
    password,
    callback
  ) {
    var query =
      "update users set username ='" +
      username +
      "', email = '" +
      email +
      "',password='" +
      password +
      "' where id=" +
      id;
    con.query(query, callback);
    console.log(query);
  };
  
  module.exports.getleavebyid = function (id, callback) {
    var query = "select * from leaves where id=" + id;
    con.query(query, callback);
  };

  module.exports.deleteleave = function (id, callback) {
    var query = "delete  from leaves where id=" + id;
    con.query(query, callback);
  };
  
  module.exports.edit_leave = function (
    id,
    name,
    leave_type,
    from,
    to,
    reason,
    callback
  ) {
    var query =
      "update leaves set employee='" +
      name +
      "',leave_type='" +
      leave_type +
      "',date_from='" +
      from +
      "',date_to='" +
      to +
      "',reason='" +
      reason +
      "' where id=" +
      id;
    con.query(query, callback);
  };

  module.exports.booking = function (
    id,
    user_id,
    ride_id,
    booking_time,
    callback
  ) {
    var query = 
    "INSERT INTO `booking`(id, user_id, ride_id, booking_time)VALUES('"+id +"', '"+user_id +"', '"+ride_id+"', '"+booking_time+"')";
    con.query(query, callback);
  }

  module.exports.updateUser = function (userId, updatedUser, callback) {
    const query = `
        UPDATE users
        SET username = ?, email = ?, phone = ?s, address = ?, birthday = ?, gender = ?, profilePicture = ?
        WHERE id = ?
    `;
    const params = [
        updatedUser.username, updatedUser.email, updatedUser.phone,
        updatedUser.address, updatedUser.birthday, updatedUser.gender,
        updatedUser.profilePicture, userId
    ];

    con.query(query, params, callback);
};

module.exports.getuserdetails = function (username, callback) {
  var query = "SELECT * FROM users WHERE username = ?";
  con.query(query, [username], callback);
};


