import { TabPanel, Text, Title } from '@tremor/react'
import React from 'react'

function About() {
    return (
        <TabPanel>
            <Title className='mb-3 font-semibold'>About</Title>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <Title>Hoş Geldiniz!</Title>
                    <Text>
                        Arel Üniversitesi Öğrenci Topluluğu olarak, kampüs yaşamını daha keyifli ve verimli hale getirmek için bir araya geldik. Arel ailesinin bir parçası olarak, öğrencilerimizin sosyal, akademik ve kişisel gelişimlerine katkı sağlamayı amaçlıyoruz.
                    </Text>
                </div>
                <div className='flex flex-col gap-2'>
                    <Title>Misyonumuz</Title>
                    <Text>
                        Misyonumuz, öğrencilerimizin Arel Üniversitesi deneyimini zenginleştirmek ve kapsayıcı bir topluluk ortamı oluşturarak her öğrencinin potansiyelini en üst düzeye çıkarmak üzerine odaklanmaktadır. Öğrencilerimizin akademik başarılarını desteklerken, sosyal etkileşimlerini ve kültürel çeşitliliği teşvik etmeyi hedefliyoruz.
                    </Text>
                </div>
                <div className='flex flex-col gap-2'>
                    <Title>Vizyonumuz</Title>
                    <Text>
                        Vizyonumuz, öğrenci odaklı bir yaklaşımla, liderlik yeteneklerini geliştirmiş, topluma duyarlı, yenilikçi ve küresel düşünen bireyler yetiştirmektir. Arel Üniversitesi Öğrenci Topluluğu olarak, öğrencilerimizin potansiyelini keşfetmelerine ve kendi alanlarında öne çıkmalarına yardımcı olmak için çeşitli etkinlikler ve programlar düzenliyoruz.
                    </Text>
                </div>
                <div className='flex flex-col gap-2'>
                    <Title>Topluluğumuz Hakkında</Title>
                    <Text>
                        Arel Üniversitesi Öğrenci Topluluğu, çeşitli sosyal etkinlikler, eğitim seminerleri, spor etkinlikleri ve gönüllülük projeleri gibi faaliyetler düzenleyerek öğrencilerin bir araya gelmesini ve birbirleriyle etkileşimde bulunmasını sağlar. Amacımız, öğrencilerin kampüs yaşamını daha keyifli hale getirirken aynı zamanda kişisel ve profesyonel gelişimlerine katkı sağlamaktır.
                    </Text>
                </div>
                <div className='flex flex-col gap-2'>
                    <Title>
                        Bize Katılın!
                    </Title>
                    <Text>
                        Arel Üniversitesi Öğrenci Topluluğu'na katılmak isterseniz, bizimle iletişime geçmekten çekinmeyin. Siz de Arel ailesinin bir parçası olun ve unutulmaz deneyimler yaşayın!
                    </Text>
                </div>
            </div>
        </TabPanel>
    )
}

export default About