import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";

function About() {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[95vh]">
            <div className='container'>
                <p
                    className="md:text-2xl text-xl text-white text-center"
                >
                    <strong>Merhaba, ben Doruk, 19 yaşındayım ve yazılım test geliştiricisiyim.</strong> <br /><br /> Kodlama merakım küçük yaşlarımda başladı ve şimdi bu tutkumu mesleğe dönüştürdüm. Yazılım dünyasında her gün yeni şeyler öğreniyor, hataları çözüp ürünlerin daha iyi çalışmasını sağlıyorum. Hem teknolojiye olan ilgim hem de detaylara verdiğim önem, yazılım testlerinin kritik bir parçası olmamı sağlıyor. Hayatım sadece kodlamadan ibaret değil; doğada vakit geçirmeyi, müzik dinlemeyi ve kitap okumayı da seviyorum. Genç yaşımın getirdiği enerji ve öğrenmeye olan açlığım, gelecekte daha büyük başarılara ulaşma yolunda beni yönlendiriyor.
                </p>
            </div>
        </div>
    </div>
    )
}

export default About;