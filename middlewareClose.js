// import { NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// export default async function middleware(req){
//     console.log("middleware working",req);
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     if(req.nextUrl.pathname === url){
//         // const getStoredToken = localStorage.getItem(token);
//         // if(getStoredToken){
//         //     const decoded = jwtDecode(getStoredToken)
//         //     console("middleware",decoded);
//         // } 
//     }
//     //return NextResponse.redirect(url);
// }

// export const config = {
//     matcher: '/',
//   }