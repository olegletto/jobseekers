import { User, ApiResponse, MockFetchOptions } from "../types/auth";

export class MockApiService {
  private registeredUsers: User[] = [
    { email: 'test@example.com', password: 'password123' }
  ];

  setRegisteredUsers(users: User[]) {
    this.registeredUsers = users;
  }

  getRegisteredUsers(): User[] {
    return this.registeredUsers;
  }

  async mockFetch(url: string, options: MockFetchOptions): Promise<Response> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const { email: userEmail, password: userPassword } = JSON.parse(options.body);
    
    if (url.includes('/login')) {
      return this.handleLogin(userEmail, userPassword);
    } else if (url.includes('/signup')) {
      return this.handleSignup(userEmail, userPassword);
    } else if (url.includes('/forgot-password')) {
      return this.handleForgotPassword(userEmail);
    } else if (url.includes('/reset-password')) {
      return this.handleResetPassword(userEmail, userPassword);
    }
    
    return this.createErrorResponse('Server error', 500);
  }

  private handleLogin(email: string, password: string): Response {
    const userExists = this.registeredUsers.find(user => 
      user.email === email && user.password === password
    );
    
    if (userExists) {
      return this.createSuccessResponse({
        success: true,
        message: 'Login successful',
        user: { email, id: '12345' },
        token: 'mock-jwt-token-12345'
      });
    } else {
      return this.createErrorResponse('Invalid email or password', 401);
    }
  }

  private handleSignup(email: string, password: string): Response {
    const emailExists = this.registeredUsers.find(user => user.email === email);
    
    if (emailExists) {
      return this.createErrorResponse('Email already exists', 409);
    } else {
      const newUser = { email, password };
      this.registeredUsers.push(newUser);
      
      return this.createSuccessResponse({
        success: true,
        message: 'Account created successfully',
        user: { email, id: '67890' }
      }, 201);
    }
  }

  private handleForgotPassword(email: string): Response {
    const userExists = this.registeredUsers.find(user => user.email === email);
    
    if (userExists) {
      return this.createSuccessResponse({
        success: true,
        message: 'Recovery email sent successfully'
      });
    } else {
      return this.createErrorResponse('User not found', 404);
    }
  }

  private handleResetPassword(email: string, password: string): Response {
    const userIndex = this.registeredUsers.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
      this.registeredUsers[userIndex] = { ...this.registeredUsers[userIndex], password };
      
      return this.createSuccessResponse({
        success: true,
        message: 'Password updated successfully'
      });
    } else {
      return this.createErrorResponse('User not found', 404);
    }
  }

  private createSuccessResponse(data: ApiResponse, status: number = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private createErrorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({
      success: false,
      message
    }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const mockApiService = new MockApiService(); 