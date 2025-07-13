import { Request, Response } from "express";
import User, { IUser } from "../models/user.model"; 
async function getUser(request: Request, response:Response) {
    try {
        const users =  await User.find();
        if (!users) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json(users);

    } catch (error) {
        console.error("Error fetching user:", error);
        response.status(500).json({ message: "Internal server error" });
        
    }
    
}
async function getUserById(request: Request, response: Response) {
    const userId = request.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        response.status(500).json({ message: "Internal server error" });
    }
}
   
function createUser(request: Request, response: Response) {
    const { username, email, password } = request.body;
    const newUser = new User({ username, email, password });

    newUser.save()
        .then(user => response.status(201).json(user))
        .catch(error => {
            console.error("Error creating user:", error);
            response.status(500).json({ message: "Internal server error" });
        });
}
async function updateUser(request: Request, response: Response) {
    const userId = request.params.id;
    const { username, email, password } = request.body;
    console.log(request.body);
    try {
        //build the update object with only  the provided fields
        const updateData : Partial<IUser> = {};
        if(username!== undefined) {
            updateData.username = username;
        }
        if(email !== undefined) {
            updateData.email = email;
        }
        if(password !== undefined) {
            updateData.password = password;
        }
        if(Object.keys(updateData).length === 0) {
            return response.status(400).json({ message: "No fields to update" });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true, runValidators: true }
        )
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).json({ message: "Internal server error" });
        
    }

}
async function deleteUser(request: Request, response: Response) {
    const userid = request.params.id;
    try {
        const user = await User.deleteOne({_id:userid})
        if (user.deletedCount === 0) {
        return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json({
        message:"User deleted Successfully",
        // data:user
    })
    } catch (error: any) {
        console.error('Error deleting user:', error);
        response.status(500).json({ message: 'Server error', error: error.message });
    }
}

export { getUser, getUserById, createUser, updateUser, deleteUser };