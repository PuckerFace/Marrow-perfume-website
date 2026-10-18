'use client'
import {createContext,useContext,useState,ReactNode} from 'react'
export type Item={id:string;name:string;price:number;qty:number}
const C=createContext<any>(null)
export const useCart=()=>useContext(C)
export function CartProvider({children}:{children:ReactNode}){
const [items,setItems]=useState<Item[]>([]);const [open,setOpen]=useState(false)
const add=(i:Omit<Item,'qty'>)=>{setItems(p=>p.find(x=>x.id===i.id)?p.map(x=>x.id===i.id?{...x,qty:x.qty+1}:x):[...p,{...i,qty:1}]);setOpen(true)}
const change=(id:string,d:number)=>setItems(p=>p.flatMap(x=>x.id!==id?[x]:x.qty+d>0?[{...x,qty:x.qty+d}]:[]))
const clear=()=>setItems([])
const count=items.reduce((a,b)=>a+b.qty,0),total=items.reduce((a,b)=>a+b.qty*b.price,0)
return <C.Provider value={{items,open,setOpen,add,change,clear,count,total}}>{children}</C.Provider>}
