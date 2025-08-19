"use client";

import { Work_Sans } from "next/font/google";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useToast } from "./hooks/useToast";
import { AuthLayout } from "./components/layout/AuthLayout";
import { SuccessPage } from "./components/layout/SuccessPage";
import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { ForgotPasswordForm } from "./components/auth/ForgotPasswordForm";
import { HeroSection } from "./components/layout/HeroSection";
import { PageState } from "./types/auth";
import { useState } from "react";

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>("login");
  const { theme, toggleTheme } = useTheme();
  const { showToast, toastMessage, isError, showToastMessage, closeToast } = useToast();
  const { isLoading, handleSubmit, handleSocialLogin } = useAuth();

  const onSocialLogin = (provider: string) => {
    handleSocialLogin(provider, setCurrentPage, showToastMessage);
  };

  const testimonials = [
    {
      text: "Search and find your dream job is now easier than ever. Just browse a job and apply if you need to.",
      author: "Mas Parjono",
      position: "UI Designer at Google"
    },
    {
      text: "The platform made job hunting seamless. I found my ideal position within a week!",
      author: "Sarah Chen",
      position: "Frontend Developer at Meta"
    },
    {
      text: "As a recruiter, this has simplified our hiring process immensely. Highly recommended!",
      author: "James Wilson",
      position: "HR Director at Amazon"
    }
  ];

  const renderAuthContent = () => {
    if (currentPage === "success") {
      return (
        <SuccessPage
          theme={theme}
          message={toastMessage}
          onContinue={() => setCurrentPage("login")}
        />
      );
    }

    return (
      <>
        <div className={`w-full md:w-1/2 p-6 md:px-16 xl:px-30 flex flex-col justify-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"}`}>
          <div className="max-w-md mx-auto w-full">
            {currentPage === "login" && (
              <LoginForm
                theme={theme}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onPageChange={setCurrentPage}
                onShowToast={showToastMessage}
                onSocialLogin={onSocialLogin}
              />
            )}
            
            {currentPage === "signup" && (
              <SignupForm
                theme={theme}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onPageChange={setCurrentPage}
                onShowToast={showToastMessage}
                onSocialLogin={onSocialLogin}
              />
            )}
            
            {currentPage === "forgot-password" && (
              <ForgotPasswordForm
                theme={theme}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onPageChange={setCurrentPage}
                onShowToast={showToastMessage}
              />
            )}
          </div>
        </div>

        <HeroSection testimonials={testimonials} />
      </>
    );
  };

  return (
    <div className={workSans.className}>
      <AuthLayout
        theme={theme}
        showToast={showToast}
        toastMessage={toastMessage}
        isError={isError}
        onToggleTheme={toggleTheme}
        onCloseToast={closeToast}
      >
        {renderAuthContent()}
      </AuthLayout>
    </div>
  );
}