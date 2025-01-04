const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Creating a creation structure using mongoose.
//This will keep the structrre of each documment intact.
//Every entry should be in same format.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


//This also acts as a middleware because we are using next(). Hence, they acts as a middleware. 
//Calling the pre fnction to encrypt the password, before saving the document in the database.
//This is an asynchronnised function. 
userSchema.pre('save', async function(next) {

    // isModified() is a mongoose function, 
    // to check if any feild of the documrnt already stored has been modified

    //If the password is not modified then 
    // the complete block async function of code is skipped. 
    //This is done using the next(). 
    if (!this.isModified('password')) {
        next();
    }

    //If the user is new then the password is encrypted by generating the salt.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed Password during Registration:', this.password);
    next();  // Ensure that next() is called after hashing. 
  });
  
  module.exports = mongoose.model('User', userSchema);

