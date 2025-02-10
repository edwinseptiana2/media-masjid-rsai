import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Link } from "react-router";
import InactivityTimer from "./useAutoReload";

export default function Infaq() {
  return (
    <>
      <InactivityTimer timeout={60000} />
      <div className="flex flex-wrap mx-auto max-w-4xl bg-white p-6 rounded-lg pb-[50px]">
        <div className="flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to={"/"}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Infaq</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold mt-9">Infaq dan Sedekah</h2>
          <div>
            <div className="flex items-center justify-center mt-5">
              <img
                src={`/images/zakat-infaq-sedekah.jpg`}
                alt=""
                className=" object-cover object-center w-full h-full rounded-md"
              />
            </div>
          </div>
          <div className="grid">
            <p className="px-32 mt-4 text-center font-semibold text-xl leading-loose">
              مَثَلُ الَّذِيْنَ يُنْفِقُوْنَ اَمْوَالَهُمْ فِيْ سَبِيْلِ اللّٰهِ
              كَمَثَلِ حَبَّةٍ اَنْۢبَتَتْ سَبْعَ سَنَابِلَ فِيْ كُلِّ
              سُنْۢبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللّٰهُ يُضٰعِفُ لِمَنْ يَّشَاۤءُ
              ۗوَاللّٰهُ وَاسِعٌ عَلِيْمٌ
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic font-normal text-lg text-justify">
              " Perumpamaan orang yang menginfakkan hartanya di jalan Allah
              seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap
              tangkai ada seratus biji. Allah melipatgandakan bagi siapa yang
              Dia kehendaki, Dan Allah Mahaluas, Maha Mengetahui. "
              <span className="font-medium"> QS. Al-Baqorah:261</span>
            </blockquote>
            <p className="px-32 mt-12 text-center font-semibold text-xl leading-loose">
              أَنْبَأَنَا إِسْمَعِيلُ بْنُ مَسْعُودٍ قَالَ حَدَّثَنَا خَالِدٌ
              قَالَ حَدَّثَنَا شُعْبَةُ أَنَّ عَمْرَو بْنَ مُرَّةَ حَدَّثَهُمْ
              عَنْ خَيْثَمَةَ عَنْ عَدِيِّ بْنِ حَاتِمٍ قَالَ ذَكَرَ رَسُولُ
              اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ النَّارَ فَأَشَاحَ
              بِوَجْهِهِ وَتَعَوَّذَ مِنْهَا ذَكَرَ شُعْبَةُ أَنَّهُ فَعَلَهُ
              ثَلَاثَ مَرَّاتٍ ثُمَّ قَالَ اتَّقُوا النَّارَ وَلَوْ بِشِقِّ
              التَّمْرَةِ فَإِنْ لَمْ تَجِدُوا فَبِكَلِمَةٍ طَيِّبَةٍ
            </p>
            <blockquote className="mt-6 border-l-2 pl-6  font-normal text-lg text-justify">
              Telah memberitakan kepada kami Isma'il bin Mas'ud dia berkata;
              Telah menceritakan kepada kami Khalid dia berkata; Telah
              menceritakan kepada kami Syu'bah bahwa 'Amru bin Murrah Telah
              menceritakan kepada mereka dari Khaitsamah dari 'Adi bin Hatim dia
              berkata; Rasulullah ﷺ menyebutkan tentang neraka, maka wajah
              beliau berubah (karena takut darinya), lalu beliau berlindung
              darinya. Syu'bah menyebutkan, bahwa Rasulullah shallallahu 'alaihi
              wasallam berlindung dari api neraka sebanyak tiga kali, lalu
              beliau bersabda :
              <p className="italic mt-2">
                {" "}
                "Takutlah kalian dari api neraka, walaupun dengan menginfakkan
                sepotong kurma. Jika kalian tidak mendapatkannya, maka dengan
                kalimat yang baik."
                <span className="font-medium">
                  {" "}
                  Hadits Sunan An-Nasa'i No. 2506 - Kitab Zakat
                </span>
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
