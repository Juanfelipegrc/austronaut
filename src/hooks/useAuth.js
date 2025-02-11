import { useDispatch, useSelector } from "react-redux"
import { setDarkMode } from "../store";



export const useAuth = () => {
    
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const onSetDarkMode = (toggle) => {
        dispatch(setDarkMode(toggle))
    };

    return {
        ...authState,
        onSetDarkMode
    }

}
