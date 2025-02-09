import { index, layout } from "@react-router/dev/routes";
import { lazy } from "react";



const authenticated = 'not-authenticated';

const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../auth/layouts/AuthLayout'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const AuthPage = lazy(() => import('../auth/pages/AuthPage'));

export const routes = authenticated === 'not-authenticated'

            ? 
    
            [
                layout(MainLayout, [
                    index(ChatPage)
                ])
            ]


            : 

            [
                layout(AuthLayout, [
                    index(AuthPage)
                ])
            ]


