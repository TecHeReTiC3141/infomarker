import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: User;
        accessToken: string;
    }

    interface User extends DefaultUser{
        id: number;
        access_token?: string;
    }

}