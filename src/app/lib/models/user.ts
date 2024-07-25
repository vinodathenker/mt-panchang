import { ObjectId } from 'mongoose';
import { Schema, model, models } from 'mongoose';
import { Password } from '../services/password';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
    name: string;
    email: string;
    mobile: string;
    password: string;
    avatar?: string;
    isActive: boolean;

}

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
},
    {
        timestamps: true
    });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await Password.toHash(this.password);
    }
    next();
});
// Define custom toJSON transformation
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id?.toString(); // Rename _id to id or any other transformations needed
        delete ret._id; // Remove _id if not needed in the output JSON
        delete ret.__v; // Remove __v field if not needed
        // Add more custom transformations as needed
    }
});

const User = models.User || model("User", userSchema);
export default User;

