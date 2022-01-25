import { Dialogs } from "../Redux/DialogReducer"

export const findDialog = (arr:Dialogs,idDialog:string | undefined) => {
    let find = false
    arr.map((item) =>{
        if(item.idDialog === idDialog) return find = true
    })
    return find
}