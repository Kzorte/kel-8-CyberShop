// src/components/HeaderLogged.tsx

import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";
import MainNav2Login from "./MainNav2Login";
import { useAuth } from '@/context/AuthContext';

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? <MainNav2Logged /> : <MainNav2Login />}
      {/* Konten layout lainnya */}
    </div>
  );
};

export default HeaderLogged;
