// Di file seperti pages/signup.js
import dynamic from 'next/dynamic';

const SignUpWithNoSSR = dynamic(() => import('../arc/app/signup/signup'), {
  ssr: false
});

export default function SignUpPage() {
  return <SignUpWithNoSSR />;
}
