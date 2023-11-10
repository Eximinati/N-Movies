import { json, redirect } from "@remix-run/node";
import { signUp, signInWithPassword } from '~/services/supabase'; // Import your Supabase functions
const generateRandomEmail = () => {
    const randomEmail = `${Math.random().toString(36).substring(2)}@gmail.com`;
    return randomEmail;
  };
  
  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).substring(2);
    return randomPassword;
  };
  
  type LoaderFunction = () => Promise<Response>;
  
  export const loader: LoaderFunction = async () => {
    const temporaryEmail = generateRandomEmail();
    const temporaryPassword = generateRandomPassword();
  
    try {
      // Sign up the user with the temporary email and password
      await signUp(temporaryEmail, temporaryPassword);
  
      // Sign in the user with the temporary email and password
      await signInWithPassword(temporaryEmail, temporaryPassword);
  
      console.log("Temporary account created and signed in successfully.");
    } catch (error) {
      console.error("Error creating or signing in temporary account:", error);
      return json({ error: "An error occurred" }, { status: 500 });
    }
  
    // Redirect the user to another page after successful sign-in
    return redirect("/");
  };
  
  export default function TemporaryAccountPage() {
    return null; // Since we're redirecting in the loader, we don't need a React component
  }