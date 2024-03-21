'use client';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';

import { setCookie, deleteCookie } from 'cookies-next';
import { useState } from 'react';
import { LoginService } from '@/services/login.service';
import { useRouter } from 'next/navigation';
import { tokenKey } from '@/constants/constant';

type Props = {
  params: { locale: string };
};

const loginService = new LoginService();

export default function Login({ params: { locale } }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await loginService.login(username, password);
      deleteCookie(tokenKey);
      setCookie(tokenKey, res.token);
      router.push(`/${locale}/home`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-10">
              Login
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <Input
                    id={'username'}
                    name={'username'}
                    type={'text'}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    id={'password'}
                    name={'password'}
                    type={'password'}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full flex justify-center"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
