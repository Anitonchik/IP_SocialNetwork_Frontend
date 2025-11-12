const URL = "http://localhost:8080/api/1.0/";

const makeRequest = async (path, params, vars, method = "GET", data = null) => {
    try {
        const requestParams = params ? `?${params}` : "";
        const pathVariables = vars ? `/${vars}` : "";
        const options = { method };
        const hasBody = (method === "POST" || method === "PUT") && data;
        
        if (hasBody) {
            options.headers = { "Content-Type": "application/json;charset=utf-8" };
            options.body = JSON.stringify(data);
        }
        
        alert(`${URL}${path}${pathVariables}${requestParams}`)
        const response = await fetch(`${URL}${path}${pathVariables}${requestParams}`, options);
        if (!response.ok) {
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

export const getAllItems = (path, params) => makeRequest(path, params);

export const getItem = (path, id) => makeRequest(path, null, id);

export const createItem = (path, data) => makeRequest(path, null, null, "POST", data);

export const updateItem = (path, id, data) => makeRequest(path, null, id, "PUT", data);

export const deleteItem = (path, id) => makeRequest(path, null, id, "DELETE");