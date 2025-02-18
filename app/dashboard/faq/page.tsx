import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { Plus } from 'lucide-react';

const regularQuestions = [
  {
    id: '1',
    title: 'QR menümü nasıl kurabilirim?',
    content:
      'Qreative Menu hesabınıza giriş yapın. Menü öğelerinizi yükleyin ve özelleştirin. Masalarınız için QR kodlar oluşturun ve indirin. QR kodları yazdırarak masalarınıza veya görünür bir yere yerleştirin. Detaylı rehber için Kurulum Talimatları bağlantısına göz atabilirsiniz.',
  },
  {
    id: '2',
    title: 'QR kodlarının tasarımını özelleştirebilir miyim?',
    content:
      'Evet! QR kodlarınızın renklerini, logosunu ve stilini markanıza uygun şekilde özelleştirebilirsiniz. Dashboard’daki QR Kod Düzenle bölümünden bu işlemi yapabilirsiniz.',
  },
  {
    id: '3',
    title: 'Ekstra özellikler neler içeriyor?',
    content:
      'Sipariş Verme: Müşteriler uygulama üzerinden sipariş verebilir. Garson Çağırma: Müşteriler masalarından garson çağırabilir. Hesap İsteme: Müşteriler, hesap talebinde bulunabilir. Çoklu Dil Desteği: Menünüzü birden fazla dilde sunabilirsiniz. Veri Analitiği: Satışlarınızı ve müşteri tercihlerinizi analiz edebilirsiniz..',
  },
  {
    id: '4',
    title: 'Qreative Menu hangi cihazlarda çalışır?',
    content:
      'Qreative Menu, akıllı telefonlar, tabletler ve bilgisayarlar gibi internet erişimi olan tüm cihazlarla uyumludur. Müşteriler QR kodu taramak için herhangi bir tarayıcı veya kamera uygulamasını kullanabilir.',
  },
  {
    id: '5',
    title: 'Qreative Menu ücretli mi?',
    content:
      'Qreative Menu, farklı işletme ihtiyaçlarına göre çeşitli abonelik planları sunar. Ücretsiz bir plan ile başlayabilir ve ihtiyaçlarınıza göre daha fazla özellik içeren bir plana geçebilirsiniz. Detaylı bilgi için Planlar ve Fiyatlar sayfamızı ziyaret edin.',
  },

  {
    id: '6',
    title: 'Destek ekibinize nasıl ulaşabilirim?',
    content:
      'Qreative Menu, farklı işletme ihtiyaçlarına göre çeşitli abonelik planları sunar. Ücretsiz bir plan ile başlayabilir ve ihtiyaçlarınıza göre daha fazla özellik içeren bir plana geçebilirsiniz. Detaylı bilgi için Planlar ve Fiyatlar sayfamızı ziyaret edin.',
  },
];

const technicalQuestions = [
  {
    id: '1',
    title: 'Hangi İşletim Sistemleri Destekleniyor?',
    content:
      'Qreative Menu, iOS ve Android işletim sistemlerini destekler. Ayrıca tarayıcı tabanlı olduğundan herhangi bir cihazdan erişebilirsiniz.',
  },
  {
    id: '2',
    title: 'QR Kodu çalışmıyorsa ne yapmalıyım?',
    content:
      'Öncelikle internet bağlantınızı kontrol edin. Farklı bir cihaz ve farklı bir internet bağlantısı ile yeniden kontrol edin.  Eğer sorun devam ederse QR kodun geçerliliğini kontrol edin veya destek ekibimizle iletişime geçin.',
  },
  {
    id: '3',
    title: 'Sistem internet bağlantısı olmadan çalışır mı?',
    content: 'Hayır, Qreative Menu’nün çalışabilmesi için internet bağlantısı gereklidir.',
  },
  {
    id: '4',
    title: 'Menüye yeni ürün, kategori, şube ekleyebilir miyim?',
    content:
      'Evet, dashboard üzerinden menünüze kolayca yeni ürünler ekleyebilir,kategorilerinizi ekleyip güncelleyebilir ve düzenleyebilirsiniz. Paketiniz dahilinde şubelerinizi tek ekrandan yönetebilirsiniz',
  },
  {
    id: '5',
    title: 'Kaç farklı QR Kod oluşturabilirim?',
    content:
      'Abonelik planınıza bağlı olarak sınırsız QR kod oluşturma imkanınız olabilir. Detaylar için planınızı kontrol edin.',
  },
];

const subscribePaymentQuestions = [
  {
    id: '1',
    title: 'Aboneliğimi nasıl iptal edebilirim?',
    content:
      'Abonelik iptali için hesabınıza giriş yaparak Hesap Ayarları bölümünden abonelik durumunuzu değiştirebilirsiniz.',
  },
  {
    id: '2',
    title: 'Ödeme Yöntemleri nelerdir?',
    content: 'Kredi kartı, banka kartı ve PayPal gibi birçok ödeme yöntemini kabul ediyoruz.',
  },
  {
    id: '3',
    title: 'Aboneliğimi yükseltirsem veri kaybı yaşar mıyım?',
    content: 'Hayır, yükseltme veya düşürme işlemleri sırasında verileriniz güvende kalır.',
  },
  {
    id: '4',
    title: 'Fatura bilgilerine nasıl ulaşabilirim?',
    content: 'Dashboard’daki Fatura ve Ödemeler bölümünden tüm faturalarınıza erişebilirsiniz.',
  },
  {
    id: '5',
    title: 'Kaç farklı QR Kod oluşturabilirim?',
    content:
      'Abonelik planınıza bağlı olarak sınırsız QR kod oluşturma imkanınız olabilir. Detaylar için planınızı kontrol edin.',
  },
];

export default function FAQPage() {
  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Sık Sorulan Sorular</h2>
        </div>
      </div>
      <main className="flex flex-col gap-6 mt-6">
        <div className="flex flex-1 gap-6">
          <div className="w-3/12">
            <h2 className="text-lg font-medium mb-2">Genel Sorular</h2>
            <p className="text-[13px] text-stone-700">Qreative Menü ile ilgili temel sorular</p>
          </div>
          <div className="w-9/12">
            <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="1">
                {regularQuestions.map((item) => (
                  <AccordionItem
                    value={item.id}
                    key={item.id}
                    className="rounded-lg border border-stone-200/80 bg-background px-4 py-1 shadow-sm"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-medium leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                        <span className="text-[16px]">{item.title}</span>
                        <Plus
                          size={16}
                          strokeWidth={2}
                          className="shrink-0 opacity-60 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="pb-2 pt-1 text-stone-700">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="w-3/12">
            <h2 className="text-lg font-medium mb-2">Teknik ve Kullanım Soruları</h2>
            <p className="text-[13px] text-stone-700">
              QR menünüzü nasıl kuracağınızı, tasarımları özelleştirmeyi, birden fazla QR kodunu
              yönetmeyi, yaygın sorunları çözmeyi ve farklı cihazlar ile işletim sistemleriyle
              uyumluluğu nasıl sağlayacağınızı öğrenin.
            </p>
          </div>
          <div className="w-9/12">
            <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="">
                {technicalQuestions.map((item) => (
                  <AccordionItem
                    value={item.id}
                    key={item.id}
                    className="rounded-lg border border-stone-200/80 bg-background px-4 py-1 shadow-sm"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-medium leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                        <span className="text-[16px]">{item.title}</span>
                        <Plus
                          size={16}
                          strokeWidth={2}
                          className="shrink-0 opacity-60 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="pb-2 pt-1 text-stone-700">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="w-3/12">
            <h2 className="text-lg font-medium mb-2">Abonelik ve Ödeme:</h2>
            <p className="text-[13px] text-stone-700">
              Ödeme ve Abonelik işlemleri ile ilgili sıkça sorulan sorular
            </p>
          </div>
          <div className="w-9/12">
            <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="">
                {subscribePaymentQuestions.map((item) => (
                  <AccordionItem
                    value={item.id}
                    key={item.id}
                    className="rounded-lg border border-stone-200/80 bg-background px-4 py-1 shadow-sm"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-medium leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                        <span className="text-[16px]">{item.title}</span>
                        <Plus
                          size={16}
                          strokeWidth={2}
                          className="shrink-0 opacity-60 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="pb-2 pt-1 text-stone-700">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
