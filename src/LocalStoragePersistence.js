
export const LocalStoragePersistence =(dataUser, token, credential)=>{
        let datosDelUsuario = {
            dataUser:dataUser,
            token: token,
            credential:credential
        }
        localStorage.setItem("userGmail", JSON.stringify(datosDelUsuario));
    
}
export const LocalStorageRemove=()=>{
    localStorage.removeItem("userGmail");
}