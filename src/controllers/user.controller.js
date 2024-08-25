import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async(req, res) => {
   /**
    * 1. get user details from frontend
    * validation - not empty
    * check if user already exists: username, email
    * check for images, check for avatar. 
    * upload them to cloudinary, avatar.
    * create user object - create entry in db.
    * remove password and refresh token field from response
    * check for user creation
    * retrun response
    * 
    */

   // 1. Get user details from frontend(postman)
    const {username, email, fullname, password} = req.body    // express is bydefault access to the req.body
    console.log("email: ", email)

    if(
        [username,email, fullname, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required!!!")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if(!existedUser)
    {
        throw new ApiError(409, "email or username are already exist");     
    }

    // multer is bydefault access to the req.files
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar files is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar)
    {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase(),
        avatar:avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while registration the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})



export {
    registerUser, 

}