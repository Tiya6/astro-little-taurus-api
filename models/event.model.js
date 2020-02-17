const mongoose = require('mongoose')

const VISIBILITY = ['Visible with telescope','Not visible','Visible']

const eventSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        date: {type: String, required: true},
        description: {type: String,  required: ''},
        category: {type: String, default:''},
        visibility: {type: String, enum: VISIBILITY},
        image: {type: String, default: '/img/undefined.png' }, //(url cloudinary)
        
    },{
        timestamps: true,
        toJSON: {
            virtuals: true,
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
                delete ret.__v;
				return ret;
			}
		}
    }
)

const Event = new mongoose.model('Event', eventSchema)

module.exports = Event