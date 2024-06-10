const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
  
    date: {
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },   
            subject: {
                type: String,
                require: true
            },
            message: {
                type: String,
                require: true
            },
        }
    ],
    tokens: [
        {
            token: {
                require: true,
                type: String
            }
        }
    ]
})

// ............hashing a password.............

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);

    }
    next();
})

// ............generate token.....................
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "mynameisaarti");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }

}

// ........stored the message...............
userSchema.methods.addMessage= async function(name,email,subject,message) {
    try {
        this.messages=this.messages.concat({name,email,subject,message})
        await this.save();
        await this.messages;
    } catch (error) {
        console.log(error)
    }
}

const User = new mongoose.model('USER', userSchema);
module.exports = User;