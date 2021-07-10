import React,{createContext,useContext,useState} from "react";

export const CategoryContext=createContext();

export function CategoryProvider({children}){
const[category,setCategory]=useState("sports");

    return(
        <CategoryContext.Provider value={{category,setCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory(){
    return useContext(CategoryContext);
}