
// Insecure but fine for OA (Don't store credentials in plain text [store in server and in .env])
const USERNAME = "admin";
const PASSWORD = "password";

/**
 * Singleton for Authorization
 * 
 * Currently extremely insecure (but fine for OA)
 */
class AuthService {
    private static _instance: AuthService;
    private constructor() {

    }
    
    
    public login(username: string, password: string) {
        if (username !== USERNAME && password !== PASSWORD) 
            throw new Error("Incorrect username and password");
        
        localStorage.setItem("name", username);
    }

    public isAuthorized() {
        if (localStorage.getItem("name") !== USERNAME) 
            return false;
        

        return true;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export default AuthService;