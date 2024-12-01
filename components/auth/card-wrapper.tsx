import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Logo from '@/components/assets/logo';

export default function CardWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-0 pt-10 pb-6 border rounded-2xl border-zinc-100 shadow-[1px_26px_227px_1px_rgba(222,_91,_61,_0.35)]">
      <CardTitle className="text-xl px-6 mb-6 flex flex-col items-center text-zinc-700 leading-snug">
        <Logo classes="mx-auto mb-4" />
        {title}
      </CardTitle>
      {description && (
        <CardDescription>
          <p className="mx-auto text-center text-stone-500 -mt-5">{description}</p>
        </CardDescription>
      )}

      <CardContent>{children}</CardContent>
    </Card>
  );
}
