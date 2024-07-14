import User from "@/servers/models/User";
import { connectToDB } from "@/servers/mongodb";
import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
    try {
        connectToDB();
        const body = await req.json();
        const {username, email, password} = body
        if (username === "" || email === "" || password === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const userRegisted = await User.findOne({email: email});
        if (userRegisted) {
            return convertDataResponse(400, false, "Email đã được sử dụng", null);
        }
        
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPass,
        });
        const userSaved = await newUser.save();
        const user = {
            ...userSaved?._doc,
            password: ""
        }
        return convertDataResponse(200, true, "Tạo tài khoản thành công", {user});
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}