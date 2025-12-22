import { requestAnonym } from "./client";



export default class AuthModel { 
    

    async login(userName, password) {
        const dto = {
            "username": userName,
            "password": password
        }
        try {
            const jwtToken = await requestAnonym("login", "POST", dto)
            //console.log(jwtToken.jwt);
            localStorage.setItem("token", jwtToken.jwt);
            localStorage.setItem("userId", jwtToken.id);
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
        }
        catch (ex) {
            alert("Ошибка регистрации")
        }

    }

}