import { requestAnonym } from "./client";



export default class AuthModel { 
    

    async login(userName, password) {
        const dto = {
            "username": userName,
            "password": password
        }
        try {
            const jwtToken = await requestAnonym("login", "POST", dto)
            
            localStorage.setItem("token", jwtToken.jwt);
            localStorage.setItem("userId", jwtToken.id);
            localStorage.setItem("role", jwtToken.role);
        }
        catch (ex) {
            alert("Ошибка выхода в систему")
        }

    }

    async register(dto) {
        try {
            const jwtToken = await requestAnonym("signup", "POST", dto)
            localStorage.setItem("token", jwtToken.jwt);
            localStorage.setItem("userId", jwtToken.id);
            localStorage.setItem("role", jwtToken.role);
        }
        catch (ex) {
            alert("Ошибка регистрации")
        }

    }

}