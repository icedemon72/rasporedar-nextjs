"use client";

import { ISiteSettings } from "@/types/payload";
import { createContext, useContext } from "react";

const SiteSettingsContext = createContext<ISiteSettings | null>(null);

export const SiteSettingsProvider = ({
  value,
  children,
}: {
  value: any;
  children: React.ReactNode;
}) => {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }

  return context;
};