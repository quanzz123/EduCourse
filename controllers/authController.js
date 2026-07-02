const db = require('../models');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/userServices');

const SECRET_KEY = process.env.MY_JWT_SECRET_KEY || 'my_jwt_secret_key';

class AuthController {
    // đăng kí
    async register(req, res) {
        try {
            const { firstName, lastName, email, password} = req.body;

            // Kiểm tra các trường thông tin bắt buộc
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin (Họ, Tên, Email, Mật khẩu)' });
            }

            // kiểm tra emial đã tồn tại
            const existingUser = await UserServices.findByEmail(email);
            if(existingUser) {
                return res.status(400).json({ message: 'Email đã tồn tại' });
            }

            // mã hóa mật khẩu
            const hashedPassword = await bycrypt.hash(password, 10);
            const newUser = await UserServices.create({ firstName, lastName, email, password: hashedPassword });
            res.status(201).json({ message: 'Đăng ký thành công', data: newUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // đăng nhập
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu' });
            }

            const user = await UserServices.findByEmail(email);
            if(!user) {
                return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
            }
            const isPasswordValid = await bycrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
            }

            // tạo token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: '1d' }
            );

            // trả về thông tin ngoại trừ mật khẩu và token
            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(200).json({ message: 'Đăng nhập thành công', data: { ...userWithoutPassword, token } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new AuthController();