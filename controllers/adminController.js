const { promisify } = require("util");
const User = require("./../models/user_model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const bcrypt = require("bcryptjs");
const { emit } = require("process");
const { decode } = require("punycode");


exports.dashboard_details = async(req,res,next)=>{

    const decoded = jwt.verify(
        req.cookies.userRegistered,
        process.env.JWT_SECRET
      );

    const count_users = (await User.find().count());
    console.log('user',count_users)
    const admin_count = (await User.find({role:"admin"}).count());
    console.log('admin',admin_count)
    const doc_count = (await User.find({role:"doctor"}).count());
    console.log('admin',doc_count)
    const patient_count = (await User.find({role:"patient"}).count());
    console.log('admin',patient_count)
    const count_details = {
        user_count:count_users,
        admin_count :admin_count,
        patient_count : patient_count,
        doc_count : doc_count,
    }
    req.count_details = count_details;
    
    next();
}