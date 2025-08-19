import { useState } from "react";
import { PageState, AuthFormData, ApiResponse } from "../types/auth";
import { mockApiService } from "../services/mockApi";
import { validateEmail, validatePassword, validatePasswordsMatch } from "../utils/validation";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    formData: AuthFormData,
    currentPage: PageState,
    onPageChange: (page: PageState) => void,
    onShowToast: (message: string, isError?: boolean) => void
  ): Promise<boolean> => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!validateEmail(formData.email)) {
      onShowToast("Please enter a valid email address", true);
      setIsLoading(false);
      return false;
    }
    
    if (currentPage === "login" || currentPage === "signup" || (currentPage === "forgot-password" && formData.password)) {
      if (!formData.password || !validatePassword(formData.password)) {
        onShowToast("Password must be at least 8 characters", true);
        setIsLoading(false);
        return false;
      }
    }
    
    if (currentPage === "signup" || (currentPage === "forgot-password" && formData.password)) {
      if (!formData.confirmPassword || !validatePasswordsMatch(formData.password!, formData.confirmPassword)) {
        onShowToast("Passwords do not match", true);
        setIsLoading(false);
        return false;
      }
    }

    try {
      let endpoint = '';
      let requestBody: { email: string; password?: string } = { email: formData.email };

      if (currentPage === "login") {
        endpoint = '/api/auth/login';
        requestBody = { email: formData.email, password: formData.password! };
      } else if (currentPage === "signup") {
        endpoint = '/api/auth/signup';
        requestBody = { email: formData.email, password: formData.password! };
      } else if (currentPage === "forgot-password") {
        // Check if this is a password reset request (has password field)
        if (formData.password) {
          endpoint = '/api/auth/reset-password';
          requestBody = { email: formData.email, password: formData.password! };
        } else {
          endpoint = '/api/auth/forgot-password';
        }
      }

      const response = await mockApiService.mockFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        if (currentPage === "login") {
          onPageChange("success");
          onShowToast("Successfully logged in!", false);
        } else if (currentPage === "signup") {
          onPageChange("success");
          onShowToast("Account created successfully!", false);
        } else if (currentPage === "forgot-password") {
          // Check if this was a password reset request
          if (formData.password) {
            onPageChange("login");
            onShowToast(data.message || "Password updated successfully!", false);
          } else {
            // Don't change page, just show success message
            onShowToast("Recovery email sent! Please check your inbox.", false);
          }
        }
        return true;
      } else {
        onShowToast(data.message || "An error occurred", true);
        return false;
      }
    } catch {
      onShowToast("Network error. Please try again.", true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string, onPageChange: (page: PageState) => void, onShowToast: (message: string, isError?: boolean) => void) => {
    onPageChange("success");
    onShowToast(`Successfully logged in with ${provider}!`, false);
  };

  return {
    isLoading,
    handleSubmit,
    handleSocialLogin
  };
}; 