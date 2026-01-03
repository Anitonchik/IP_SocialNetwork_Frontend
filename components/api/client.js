import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8080/api/1.0/";
const URLAnonym = "http://localhost:8080/"

const makeRequest = async (path, params, vars, method = "GET", data = null) => {
    try {
        const requestParams = params ? `?${params}` : "";
        const pathVariables = vars ? `/${vars}` : "";

        const token = localStorage.getItem("token");
        
        const options = { 
            method, 
            headers: { "Authorization": token ? `Bearer ${token}` : undefined } 
        };

        const hasBody = (method === "POST" || method === "PUT") && data; 
        
        if (hasBody) { 
            options.headers["Content-Type"] = "application/json;charset=utf-8"; 
            options.body = JSON.stringify(data); 
        }
        
        //alert(`${URL}${path}${pathVariables}${requestParams}`)
        const response = await fetch(`${URL}${path}${pathVariables}${requestParams}`, options)

        if (response.status === 401) {
            logout();
            return;
        }
        else if (!response.ok) {
            throw new Error(`Response status: ${response?.status}`);
        }

        const json = await response.json();
        console.debug(path, json);
        return json;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("There was a SyntaxError", error);
        }
        else {
            throw new Error("There was an error", error);
        }
    }
};

export const request = async (path) => {
    try {
        const token = localStorage.getItem("token");
        
        const options = { 
            method: "GET", 
            headers: { 
                "Authorization": token ? `Bearer ${token}` : undefined 
            } 
        }; 
        
        const response = await fetch(`${URL}${path}`, options)
        if (response.status === 401) {
            logout();
            return;
        }
        else if (!response.ok) {
            throw new Error(`Response status: ${response?.status}`);
        }

        const json = await response.json();
        console.debug(path, json);
        return json;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("There was a SyntaxError", error);
        } else {
            throw new Error("There was an error", error);
        }
    }
}

export const requestAnonym = async (path, method = "GET", data = null) => {
    try {
        const options = { method };
        const hasBody = (method === "POST" || method === "PUT") && data;
        
        if (hasBody) {
            options.headers = { "Content-Type": "application/json;charset=utf-8" };
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${URLAnonym}${path}`, options);
        if (response.status === 401) {
            logout();
            return;
        }
        else if (!response.ok) {
            throw new Error(`Response status: ${response?.status}`);
        }

        const json = await response.json();
        console.debug(path, json);
        return json;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("There was a SyntaxError", error);
        } else {
            throw new Error("There was an error", error);
        }
    }
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    const navigate = useNavigate();
    navigate("/");
}


export const getAllItems = (path, params) => makeRequest(path, params);

export const getItem = (path, id) => makeRequest(path, null, id);

export const createItem = (path, data) => makeRequest(path, null, null, "POST", data);

export const updateItem = (path, id, data) => makeRequest(path, null, id, "PUT", data);

export const deleteItem = (path, id) => makeRequest(path, null, id, "DELETE");