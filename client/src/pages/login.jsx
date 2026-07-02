import React, { use, useState } from "react";
import api from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { register, login } from "../services/api";
function Login() {
    // state lưu trạng thái đăng nhập
  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail]  = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isLogin) {
        // xử lí đăng nhập
        try {
            const res = await login({ email, password });
            const { token, ...userData } = res.data;
            // lưu token và thông tin đăng nhập vào store
            loginSuccess(userData, token);
            alert("Đăng nhập thành công!");
            navigate("/courses");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Đăng nhập thất bại");
        }
    } else {
        // xủ lí đăng kí
        try {
            await register({ firstName, lastName, email, password });
            alert("Đăng ký thành công!");
            setIsLogin(true);
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Đăng ký thất bại");
        }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto ">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {isLogin ? "Đăng Nhập" : "Đăng kí tài khoản"}
              
            </h1>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto border border-default-medium rounded-base shadow-lg p-4  ">
          {!isLogin && (
            <>
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Họ
                </label>
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  type="text"
                  id="email"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Nhập họ của bạn"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Tên
                </label>
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  type="text"
                  id="email"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
               Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Mật khẩu
            </label>
            <input
              value={password}
                  onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="••••••••"
              required
            />
          </div>
          <label for="remember" className="flex items-center mb-5">
            {!isLogin ? (
              <>
                <p className="ms-2 text-sm font-medium text-heading select-none">
                  Bạn đã có tài khoản{" "}
                  <button
                    onClick={() => setIsLogin(true)} 
                    type="button"
                    className="text-fg-brand hover:underline"
                  >
                    đăng nhập ngay
                  </button>
                  .
                </p>
              </>
            ) : (
              <>
                <p className="ms-2 text-sm font-medium text-heading select-none">
                  Bạn chưa có tài khoản{" "}
                  <button
                    onClick={() => setIsLogin(false)} 
                    type="button"
                    className="text-fg-brand hover:underline"
                  >
                    đăng kí ngay
                  </button>
                  .
                </p>
              </>
            )}
          </label>
          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            {isLogin ? "Đăng Nhập" : "Đăng kí tài khoản"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

//
