
import CryptoJS  from "crypto-js";
export const Decrypt = ({cipherText , SECRET_KEY} = {}) =>{
    return  CryptoJS.AES.decrypt(cipherText,SECRET_KEY ).toString(CryptoJS.enc.Utf8);
}