"use client";
import Link from "next/link";


export default function page() {
  const pdetails = [
    {
      title:'*Our Commitment To Privacy*',
      desc:"Your privacy is important to VPPCOE Consultancy. In order to better protect your privacy, VPPCOE Consultancy provides a description of our information practices, including how we collect information, why we collect it, and how it will be used.",
    },
    {
      title:'What Information Do We Collect?*',
      desc:"We collect information submitted through our contact forms and pages. This information must be expressly and voluntarily provided to us – VPPCOE Consultancy does not collect it without you knowingly making the decision to give it to us.Some of the information you may provide includes your name, email address, and phone number. The information is related to projects, services, and billing. Information may also be collected through phone or email conversations via official VPPCOE Consultancy representatives.In addition, VPPCOE Consultancy may collect information regarding third parties that is specifically related to you, your project, or the services you requested.",
    },

   ]
   


  return (
    <div>
        <div className="ppage min-h-[100vh] w-[100%]  pt-[10%] pl-[20%] pr-[20%] items-center justify-center flex gap-[10px] flex-col ">
           <h2 className="self-center text-[20px] text-white">PRIVACY POLLICY</h2>
           
           {pdetails.map((project, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4 className="text-white">{project.title} </h4>
            <p className="text-white">{project.desc} </p>
           </div>
           ))}
           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*Do We Use Cookies?*</h4>
            <p>
            Cookies are small files that websites place on individual computer hard drives through web browsers. Users must explicitly allow cookies to be placed by every website that uses them. Cookies enable a website to remember a specific browser, and capture and retain particular information.
            VPPCOE Consultancy uses cookies to remember, understand, and save your preferences for upcoming visits to our website. Cookies help us gather data regarding website traffic, engagement, and interactions, and enable us to provide better future online experiences, tools, and services.
            The information that our cookies collect has no personal information that can identify you specifically. Conversely, the anonymous information captured by the cookies is transmitted to Google, where it is used to create anonymous web activity reporting only for the domain <Link href={"https://www.vppcoeconsultancy.com/"}  className="pb-2 text-slate-100 font-light hover:text-sky-300 cursor-pointer">https://www.vppcoeconsultancy.com/</Link>. The data is used to gain insight into how to optimize customer experience, content, and marketing efforts for <Link href={"https://www.vppcoeconsultancy.com/"}  className="pb-2 text-slate-100 font-light hover:text-sky-300 cursor-pointer">https://www.vppcoeconsultancy.com/</Link>.
            In addition, no personally identifiable information will be collected on this website unless explicitly submitted through a fill-in form, such as our Work With Us page.
            </p>
           </div>
           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*Remarketing*
            </h4>
            <p>
            VPPCOE Consultancy uses cookies to display remarketing advertisements. These are based on a user’s prior visits to <Link href={"https://www.vppcoeconsultancy.com/"}  className="pb-2 text-slate-100 font-light hover:text-sky-300 cursor-pointer">https://www.vppcoeconsultancy.com/</Link>  and may be seen throughout other websites on the Internet.
            Users can opt out of cookies through Google at any point by visiting Google Ads Preferences Manager.
            </p>
           </div>
           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*Third-Party Websites*
            </h4>
            <p>
            VPPCOE Consultancy’s website may provide links to third-party websites. VPPCOE Consultancy does not have control over these websites or their content, which have their own unique and independent privacy policies. Thus, we do not assume any responsibility or liability for those websites.
            VPPCOE Consultancy also does not endorse these websites, including the information and products found on them. If you choose to visit one of the third-party websites linked on this website, it is done at your own discretion and risk.
            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*VPPCOE Consultancy Is Committed To Data Security*
            </h4>
            <p>
            In order to maintain data security, proper use of information, and information accuracy, VPPCOE Consultancy has appropriate practices in place to safeguard the information we collect online and offline, including electronic and managerial conduct.
            Every online credit card transaction is only performed on secure servers through a secure SSL connection. They also comply with the latest standards in the industry. All billing information, including credit card information, is deleted immediately following the termination or completion of a client project.

            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*VPPCOE Consultancy Is Committed To Protecting Children’s Privacy Online*
            </h4>
            <p>
            VPPCOE Consultancy is committed to protecting children’s privacy. Therefore, we do not collect or maintain information at our website from those we actually know are under 13. Our website is also not structured to attract anyone under the age of 13 and is not intended for users under the age of 18.
            If we become aware that anyone under the age of 18 has submitted personal information to our website, VPPCOE Consultancy will delete that information and will not use it for any purpose whatsoever.
            VPPCOE Consultancy encourages parents and legal guardians to discuss the possible risks of offering personal information through the Internet with their children.

            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]" >
            <h4>*Our Privacy Policy and Your Consent*
            </h4>
            <p>
            By using our website, you consent to VPPCOE Consultancy’s privacy policy.
            If we have any changes to our privacy policy, they will be posted on this web page.
            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*Your Privacy Choices and Rights*
            </h4>
            <p>
            You do not need to provide any personal information in order to enjoy the majority of the features on our website. In addition, you can opt out of certain activities by sending us an opt-out email or by opting out within the activities themselves.
            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            <h4>*Contacting VPPCOE Consultancy*
            </h4>
            <p>
            If you have any questions regarding our privacy policy, please contact VPPCOE Consultancy at:
            </p>
           </div>

           <div  className="bg-gradient-to-br from-purple-700 to-blue-900  p-7 rounded-lg md:w-[70%] h-[40%]">
            
            <p>Vasantdada Patil Education Complex </p>
            <p>Eastern Express Highway Near Everard Nagar, Chunabhatti </p>
            <p>Sion, Mumbai, Maharashtra 400022   </p>
            <p>VPPCOE Consultancy </p>
            <p>+91 7738282824 </p>
            <p>consultancy@pvppcoe.ac.in </p>
           </div>
           
        </div>
    </div>
  )
}
