'use client';

import { useState, useTransition } from 'react';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/login';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { loginSchema } from '@/lib/schemas';
import FormError from '@/components/auth/form-error';

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  // const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError('');
    // setSuccess('');

    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
          // setSuccess(data?.success);
        }
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
          <Button
            type="submit"
            size={'lg'}
            variant={'primary'}
            className="w-full h-11"
            disabled={isPending}
          >
            Giriş Yap
          </Button>
        </form>
      </Form>
    </>
  );
}
