'use client';

import { useState, useTransition } from 'react';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/actions/register';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { registerSchema } from '@/lib/schemas';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        signIn('credentials', {
          email: values.email,
          password: values.password,
          redirectTo: '/signup-retailmode/details',
        });
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>E-Posta Adresi</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Ad Soyadınızı girin..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>E-Posta Adresi</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="E-Posta Adresinizi girin..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            size={'lg'}
            variant={'primary'}
            className="w-full h-11"
            disabled={isPending}
          >
            Hesap Oluştur
          </Button>
        </form>
      </Form>
    </>
  );
}
