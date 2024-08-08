import { NextResponse, NextRequest } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.isStaff = user.isStaff;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.isStaff = token.isStaff;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnOrdersPage = request.nextUrl?.pathname.startsWith("/orders");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnOrdersPage && !(user?.isAdmin || user?.isStaff)) {
        return NextResponse.redirect(new URL("/menu", request.url)); // Redirect to menu or an appropriate page
      }

      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    },
  },
};
