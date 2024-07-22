import User from "@/servers/models/User";
import { connectToDB } from "@/servers/mongodb";
import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const POST = async (req: Request) => {
    
    try {
        connectToDB();
        const body = await req.json();
        const {email, password} = body
        if (email === "" || password === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        const userFind = await User.findOne({email: email});

        if (!userFind) {
            return convertDataResponse(400, false, "Sai email hoặc mật khẩu", null)
        }  
            
        const validate = await bcrypt.compare(password, userFind.password);
        if (!validate) {
            return convertDataResponse(400, false, "Sai email hoặc mật khẩu", null)
        }        

        // tạo token
        const access_token = jwt.sign({userID: userFind._id}, process.env.SECRET_TOKEN || "trungtn12345", { expiresIn: parseInt(process.env.EXPIRED_ACCESS_TOKEN || "604800") });
        const user = {
            ...userFind?._doc,
            password: ""
        }

        var expireTime = new Date().getTime() + parseInt(process.env.EXPIRED_ACCESS_TOKEN || "604800") * 1000;
        cookies().set({
            name: 'accessToken',
            value: access_token,
            httpOnly: true,
            path: '/',
            expires: expireTime,
          })
        return convertDataResponse(200, true, "Đăng nhập thành công", {user, token: {accessToken: access_token}})

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}