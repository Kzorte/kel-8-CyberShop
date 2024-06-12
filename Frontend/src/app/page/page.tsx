"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';  // Import useRouter
import { useAuth } from '@/context/AuthContext';  // Import useAuth
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import { PRODUCTS } from "@/data/data";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import { DEMO_MORE_EXPLORE_DATA_2 } from "@/components/SectionGridMoreExplore/data";
import SectionPromo2 from "@/components/SectionPromo2";
import AvatarDropdown from "@/components/Header/AvatarDropdown";  // Import komponen AvatarDropdown

function PageHome() {
  const { user } = useAuth();  // Gunakan user dari AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!user) {  // Jika tidak ada user yang login, redirect ke halaman login
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <div className="container px-4 hidden xl:block">
        <SectionHero2 />
      </div>

      <div className="xl:hidden">
        {/* SECTION */}
        <SectionPromo2 />
      </div>

      {/* Tambahkan AvatarDropdown di sini */}
      <div className="container mt-4 flex justify-end">
        <AvatarDropdown />
      </div>

      {/* SECTION */}
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore data={DEMO_MORE_EXPLORE_DATA_2} />
        </div>
      </div>

      <div className="mt-24 lg:mt-32 xl:hidden">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            PRODUCTS[4],
            PRODUCTS[4],
            PRODUCTS[4],
            PRODUCTS[4],
          ]}
        />

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
