import React from "react";
import { useRouter } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import Header from "@/components/Header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();
  const { pathname }: any = useRouter(); // Type assertion

  return pathname === "/home-2" ? <Header /> : <HeaderLogged />;
};

export default SiteHeader;