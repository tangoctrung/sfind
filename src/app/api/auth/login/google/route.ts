import User from "@/servers/models/User";
import { connectToDB } from "@/servers/mongodb";
import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const POST = async (req: Request) => {
    
    try {
        connectToDB();
        const body = await req.json();
        const {tokenGoogle} = body
        if (tokenGoogle  === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }

        const res = await fetch(process.env.API_GET_ME_GOOGLE || "", {
            headers: {
                "Authorization": "Bearer " + tokenGoogle
            }
        })

        if (res.ok) {
            const data = await res.json();
            const username = data?.names[0]?.displayName || ""
            const avatar = data?.photos[0]?.url || ""
            const email = data?.emailAddresses[0]?.value || ""

            // Tao tai khoan
            if (username === "" || email === "") {
                return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
            }

            const userRegisted = await User.findOne({email: email});
            if (userRegisted) {
                return convertDataResponse(400, false, "Email đã được sử dụng", null);
            }
            
            const newUser = await new User({
                username: username,
                email: email,
                avatar: avatar,
                provider: "google",
            }).save();

            if (newUser?._id) {
                const access_token = jwt.sign({userID: newUser._id}, process.env.SECRET_TOKEN || "trungtn12345", { expiresIn: parseInt(process.env.EXPIRED_ACCESS_TOKEN || "604800") });
                const {password, ...user} = newUser?._doc;
                var expireTime = new Date().getTime() + parseInt(process.env.EXPIRED_ACCESS_TOKEN || "604800") * 1000;
                cookies().set({
                    name: 'accessToken',
                    value: access_token,
                    httpOnly: true,
                    path: '/',
                    expires: expireTime,
                })
                return convertDataResponse(200, true, "Đăng nhập thành công", {user, token: {accessToken: access_token}})
            }
        } 
        return convertDataResponse(400, true, "Đăng nhập thất bại", null)

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}