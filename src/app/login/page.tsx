import React from 'react';
import LoginButton from '../../components/Login/LoginButton';
import Image from 'next/image';
import RegisterButton from './../../components/Login/RegisterButton';

export default function LoginPage() {

  return (
    <section className="container h-full px-6 py-24 ">
      <div className="flex  h-full  gap-6 items-center justify-center lg:justify-between ">
        <div className="relative h-full mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <Image
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            fill
            alt="" />
        </  div>
        <div className="md:w-8/12 lg:ml-6 lg:w-5/12 bg-gray-800 bg-opacity-70 p-12 rounded-lg">
        <h1 className="text-3xl font-semibold text-slate-200 text-center mb-8">Sistema de recolección de información</h1>
          <LoginButton />
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              OR
            </p>
          </div>
          <RegisterButton />
        </div>
      </div>

    </section >
  );
}
