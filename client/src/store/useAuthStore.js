import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    // doc trang thai ban dau tu localstorage nếu đăng nhập trước đó
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,

    // hàm đăng nhập thành công
    loginSuccess: (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
        set({user: userData, token})
    },

    // hàm đăng xuất
    logout: () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        set({user: null, token: null})
    
    }
}))