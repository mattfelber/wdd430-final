"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the session after email confirmation
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          // If we have a session, the email was confirmed successfully
          router.push('/'); // Redirect to home page
        } else {
          // If no session, something went wrong
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Error confirming email:', error);
        router.push('/auth/signin');
      }
    };

    handleEmailConfirmation();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Confirming your email...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}
