const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema (
    {
        name: {type: String},
        email: {
            type: String,
            unique:true,
            match: [EMAIL_PATTERN, 'Email is invalid']
        },
        age: {type: Number},  //  >= 18
        gender: {type: Boolean}, // true - mujer 
        image: {type: String, default: '/img/undefined.png' }, //(url cloudinary)
        password: {type: String}, //bcrypt
        description: {type: String, default: ''}
    },{
        timestamps: true,
        toJSON: {
            virtuals: true,
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
                delete ret.__v;
                delete ret.password;
				return ret;
			}
		}
    }
)

userSchema.pre('save', function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            });
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });

  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }

const User = new mongoose.model('User', userSchema)

module.exports = User