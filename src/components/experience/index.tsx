import { useTranslations } from "next-intl";
import Reveal from "../animation/Reveal";
import CompanyInfo from "./CompanyInfo";
import ProjectItem from "./ProjectItem";

const Divider = () => {
  return (
    <div className="flex justify-start flex-col items-center">
      <div className="w-7 h-7 bg-primary rounded-full items-center flex justify-center">
        <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full  items-center flex justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
      <div className="mt-1 flex-1 w-1 bg-primary rounded-full"></div>
    </div>
  );
};

export default function Experience() {
  const t = useTranslations("Experience");
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-6 xl:px-0">
        <Reveal>
          <div className="text-4xl font-bold dark:text-white text-black/50 dark:text-state-50 mb-6">
            Experience
          </div>
        </Reveal>
        <Reveal>
          <div className="w-80 md:w-96 h-1 bg-primary rounded-full mb-8"></div>
        </Reveal>
        <div className="w-full mb-5 flex flex-col gap-14">
          <div className="leading-7">
            <CompanyInfo role="UI/UX designer" company="VNPT">
              <svg
                width="27"
                height="29"
                viewBox="0 0 27 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.4767 0.00810623C23.511 0.151625 22.6971 0.417557 21.664 0.936756C21.0652 1.23646 20.2049 1.73455 19.7073 2.06802L19.2983 2.33817L18.8091 2.09335C17.5145 1.44329 15.8741 0.970526 14.3982 0.822786C13.7446 0.75947 12.3867 0.75947 11.7415 0.822786C8.85714 1.11827 6.16673 2.3635 4.05405 4.39387C1.73051 6.62263 0.338919 9.51411 0.035299 12.7517C-0.036389 13.5157 0.00578042 15.0776 0.119638 15.8332C0.237712 16.593 0.490729 17.644 0.714227 18.2603C0.811217 18.5262 0.91664 18.8259 0.954593 18.9272C1.0558 19.2101 1.07267 19.1003 0.97146 18.8006C0.840735 18.3996 0.646756 17.4752 0.537115 16.7407C0.456993 16.1793 0.444342 15.9176 0.444342 14.9045C0.444342 13.8872 0.456993 13.6424 0.537115 13.1316C0.718444 11.9877 1.0052 11.0548 1.46906 10.0924C2.43052 8.10847 3.64078 6.86746 5.00286 6.47489C5.26431 6.39891 5.4372 6.3778 5.8589 6.3778C6.47035 6.38202 6.71915 6.44112 7.19988 6.70283C8.01375 7.14605 8.49027 7.87209 8.66317 8.93159C8.7222 9.28617 8.73064 9.53099 8.71377 10.1979C8.6716 11.7091 8.48605 12.4773 7.7017 14.398C7.48242 14.9383 6.81614 16.3312 5.93058 18.1126C4.8637 20.2485 4.5643 20.8901 4.1426 21.9116C3.94441 22.3928 3.54801 23.5621 3.41729 24.0433C2.7721 26.462 3.13897 28.1842 4.43357 28.792C5.71974 29.3957 7.96737 28.6781 10.8771 26.7321C13.2175 25.1703 15.1067 23.4439 17.7675 20.4384C20.9345 16.8631 23.1779 13.6719 24.7044 10.5567C25.299 9.34526 25.6406 8.50948 26.1087 7.0954C26.952 4.54161 27.184 2.86582 26.8593 1.67546C26.64 0.890324 26.1382 0.312029 25.4888 0.113634C25.2273 0.0334339 24.7002 -0.0214405 24.4767 0.00810623ZM24.2406 1.4053C24.5568 1.50661 24.8731 1.81475 24.9954 2.144C25.2484 2.82361 25.1092 3.95065 24.599 5.30564C24.346 5.98102 24.0634 6.62263 24.0128 6.63529C23.9875 6.64374 23.8863 6.52554 23.7809 6.36936C23.2327 5.55468 22.2755 4.50362 21.4405 3.80713C20.9724 3.41034 20.2134 2.85315 20.1459 2.85315C19.8802 2.85315 21.3351 1.99626 22.1574 1.67123C22.9713 1.34621 23.7345 1.24912 24.2406 1.4053Z"
                  className="fill-primary dark:fill-slate-50"
                />
                <path
                  d="M25.8598 12.1312C25.2231 14.322 23.258 17.6525 20.8122 20.6875C19.7369 22.0171 18.2019 23.6043 16.9495 24.6765C16.0555 25.4405 14.7862 26.348 13.9301 26.8292L13.4705 27.0909L13.85 27.0656C17.8856 26.787 21.4278 24.8031 23.764 21.5106C24.9195 19.8812 25.6279 18.1168 26.0032 15.9598C26.1171 15.3055 26.1213 15.238 26.1171 13.807C26.1129 12.7306 26.096 12.2368 26.0538 11.9962L25.9948 11.6627L25.8598 12.1312Z"
                  className="fill-primary dark:fill-slate-50"
                />
              </svg>
            </CompanyInfo>
            <div className="border-l-2 border-black/30 dark:border-primary ml-3 pl-7 mt-3">
              <Reveal>
                <p className="text-black/50 dark:text-primary">
                  {t("time_1")}
                </p>
              </Reveal>
              <ProjectItem
                title={t("project_name_1-1")}
                descriptions={[
                  `- ${t("design_figma_on_platform")}: Website`,
                  `- ${t("responsibility")}: ${t("responsibility_1-1")}`,
                ]}
              />
              <ProjectItem
                title={t("project_name_1-2")}
                descriptions={[
                  `- ${t("design_figma_on_platform")}: Mobile app & website`,
                  `- ${t("responsibility")}: ${t("responsibility_1-2")}`,
                ]}
              />
            </div>
          </div>
          <div className="leading-7">
            <CompanyInfo role="Junior Developer" company="VHEC">
              <svg
                width="24"
                height="32"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.0845 0.0769185C14.9824 0.0583584 14.7527 0.0328388 14.5717 0.0189187C14.0567 -0.0182014 13.3792 0.000359403 12.9848 0.0653196C12.9013 0.0792397 12.7296 0.10708 12.602 0.12564C12.1775 0.1906 11.5232 0.3762 10.8968 0.610521C10.5001 0.759001 9.72988 1.1418 9.31923 1.39932C9.13131 1.51532 8.56059 1.90276 8.49563 1.95612C8.43299 2.00949 8.42835 2.01645 8.46547 2.04429C8.48635 2.06053 8.68819 2.25309 8.91323 2.46885C9.13828 2.68461 9.34011 2.86557 9.35868 2.86789C9.37724 2.87253 9.40971 2.86093 9.4306 2.84237C9.5814 2.71013 10.4908 2.23685 10.9525 2.05356C11.2425 1.93756 11.6369 1.80069 11.79 1.76125C11.8411 1.74965 12.0081 1.70788 12.1612 1.66844C12.9779 1.46428 13.9801 1.4202 14.8687 1.55012C15.3629 1.62204 16.0542 1.80764 16.4393 1.97236C16.4973 1.99556 16.5785 2.02805 16.6157 2.04429C16.7085 2.08141 17.365 2.41085 17.4393 2.45725C17.7687 2.66605 18.0193 2.83541 18.1979 2.96765C18.3139 3.05581 18.4206 3.12773 18.4369 3.12773C18.4786 3.12773 19.5945 2.46653 19.6549 2.40621C19.6989 2.36213 19.0354 1.78908 18.5853 1.48052C18.1399 1.1766 17.8685 1.0142 17.4601 0.812361C17.2745 0.719561 17.1121 0.64532 17.1005 0.64532C17.0889 0.64532 17.0495 0.62908 17.0101 0.6082C16.7595 0.47364 15.8385 0.195239 15.4441 0.137239C15.4085 0.131169 15.3636 0.123804 15.3159 0.11599C15.236 0.102895 15.1484 0.0885421 15.0845 0.0769185ZM22.7572 1.86076C22.8066 1.75596 22.8581 1.64659 22.9006 1.55708C22.9864 1.3738 23.0537 1.21604 23.049 1.20444C23.0467 1.19284 23.0212 1.19748 22.9957 1.21604C22.9702 1.23692 22.9029 1.27868 22.8449 1.30884C22.7869 1.34132 22.6152 1.4434 22.4621 1.5362C22.0978 1.76125 21.4691 2.14405 21.1629 2.32733C21.0863 2.37373 20.9866 2.43405 20.9402 2.46189C20.381 2.80293 20.156 2.93981 20.0771 2.98389C20.0306 3.00816 19.9382 3.06416 19.8569 3.11348C19.8449 3.12073 19.8332 3.12784 19.8219 3.13469C19.7427 3.1839 19.5017 3.32982 19.2664 3.47233L19.2071 3.50821C18.9565 3.65901 18.699 3.81677 18.6341 3.85853C18.5714 3.90029 18.467 3.96293 18.4044 4.00005C18.3394 4.03717 18.242 4.09517 18.184 4.12997C18.1466 4.15392 18.087 4.18944 18.0288 4.2241C17.9968 4.24317 17.9652 4.26198 17.9381 4.27845C17.8615 4.32253 17.7293 4.40373 17.6434 4.45709C17.5576 4.51045 17.2745 4.68213 17.017 4.83757C16.7572 4.99301 16.3326 5.25054 16.0705 5.41062C15.9472 5.48588 15.8209 5.5632 15.7136 5.62882C15.5928 5.70277 15.4962 5.76187 15.4557 5.78646C15.3791 5.83054 15.2353 5.91638 15.1378 5.9767C14.4859 6.3711 14.3397 6.45694 14.3189 6.46622C14.3073 6.47086 14.2539 6.50334 14.2029 6.53814C14.1518 6.57294 13.9546 6.6959 13.762 6.8119C13.5718 6.92558 13.3166 7.0787 13.1983 7.15294C13.08 7.22486 12.9732 7.28054 12.9616 7.2759C12.95 7.27126 12.7552 7.0903 12.5278 6.87454C12.0183 6.3876 11.8235 6.20271 11.7212 6.10554C11.7079 6.09299 11.6963 6.0819 11.6856 6.07182C11.6416 6.03006 11.4072 5.80734 11.1636 5.57534C10.8646 5.29017 10.675 5.11056 10.4669 4.91345C10.3973 4.84756 10.3257 4.77972 10.2472 4.70533C9.9526 4.42925 9.74844 4.23437 9.52804 4.02325C9.26587 3.77269 8.72995 3.26461 8.12443 2.69157C7.92027 2.49669 7.74627 2.33893 7.73699 2.33893C7.72539 2.33893 7.71843 4.33181 7.71843 6.7655V11.1921L7.26139 11.4241C7.00851 11.5517 6.53523 11.793 6.21042 11.96C5.88562 12.127 5.36826 12.3915 5.06202 12.547C4.75578 12.7024 4.2709 12.9506 3.98322 13.0991C3.8247 13.1797 3.61406 13.287 3.41106 13.3904C3.24565 13.4746 3.08533 13.5563 2.96241 13.6188C2.68865 13.758 2.25017 13.983 1.98801 14.1176C1.72585 14.2498 1.20385 14.5166 0.828006 14.7092C0.452165 14.8994 0.134324 15.0642 0.122724 15.0758C0.104164 15.0943 0.582086 15.3356 2.15041 16.0919C2.37815 16.2008 2.61058 16.3133 2.9763 16.4902C3.12472 16.562 3.29509 16.6444 3.49602 16.7415C3.63813 16.8088 3.88198 16.9268 4.08414 17.0247C4.1262 17.0451 4.16646 17.0646 4.20362 17.0826C4.45734 17.2054 4.74797 17.3463 5.03439 17.4851C5.24033 17.5849 5.4441 17.6837 5.63042 17.7739C5.7905 17.8505 6.11994 18.0083 6.36122 18.1266C6.42811 18.1591 6.49989 18.194 6.57167 18.2289C6.76132 18.3212 6.95097 18.4135 7.05027 18.4607L7.30083 18.5813V25.2606C7.30083 28.9332 7.30779 31.9561 7.31475 31.9747C7.32635 32.0049 7.33563 32.0072 7.36115 31.9863C7.37971 31.9724 7.39363 31.9515 7.39363 31.9422C7.39363 31.9329 7.46323 31.7798 7.54675 31.6035C7.62518 31.4358 7.71793 31.2394 7.7616 31.1469L7.76947 31.1302C7.77495 31.1186 7.78143 31.1049 7.7887 31.0895C7.83376 30.9939 7.90971 30.8328 7.97363 30.701C8.04787 30.5479 8.14067 30.3507 8.18243 30.2602C8.22187 30.1721 8.32395 29.9609 8.40515 29.7939C8.48635 29.6245 8.55363 29.4807 8.55363 29.4761C8.55363 29.4645 8.85059 28.8404 8.99443 28.5434C9.02322 28.4875 9.07921 28.3698 9.13713 28.2481C9.15855 28.203 9.18024 28.1574 9.20091 28.1142C9.27515 27.9541 9.37724 27.7361 9.4306 27.627C9.45198 27.5813 9.47703 27.5275 9.50183 27.4742C9.5362 27.4003 9.57008 27.3275 9.593 27.279C9.63244 27.1955 9.75308 26.9426 9.86212 26.7152C9.89461 26.6468 9.92545 26.5821 9.95275 26.5248C10.017 26.3898 10.0616 26.2963 10.0616 26.293C10.0616 26.2907 10.1359 26.1306 10.2264 25.9427C10.4305 25.5135 10.521 25.3209 10.6254 25.0982C10.6695 25.0031 10.7855 24.7595 10.8829 24.5576C10.9804 24.3558 11.0592 24.1864 11.0592 24.1818C11.0592 24.1772 11.1358 24.0148 11.2309 23.8176C11.3237 23.6227 11.4351 23.3884 11.4768 23.3002C11.497 23.2565 11.5323 23.1826 11.5731 23.0971C11.6168 23.0056 11.6668 22.9008 11.7112 22.806C11.7993 22.6228 11.8712 22.4696 11.8712 22.465C11.8712 22.4604 11.9501 22.291 12.0476 22.0892C12.3213 21.5208 12.4907 21.1611 12.7204 20.6716C12.8132 20.4721 12.8248 20.4559 12.8735 20.4721C12.8928 20.4781 12.9485 20.4926 13.016 20.5103C13.0536 20.5201 13.0949 20.5309 13.1356 20.5417C13.1797 20.5532 13.2439 20.57 13.3174 20.5892C13.4372 20.6207 13.5818 20.6585 13.7041 20.6902C13.8199 20.7215 13.9454 20.7545 14.0448 20.7806C14.1145 20.7989 14.1713 20.8138 14.2029 20.8224C14.2794 20.841 14.4511 20.8851 14.5857 20.9245C14.7202 20.9616 14.929 21.0173 15.0497 21.0475C15.1703 21.0799 15.4325 21.1495 15.6297 21.2006C15.8269 21.254 16.0519 21.3119 16.1285 21.3305C16.205 21.3491 16.321 21.3792 16.3837 21.3978C16.4486 21.4163 16.5832 21.4535 16.6853 21.4813C16.7873 21.5068 16.9799 21.5579 17.1145 21.595C17.249 21.6321 17.4045 21.6739 17.4625 21.6878C17.5205 21.6994 17.6457 21.7319 17.7409 21.7597C17.7884 21.7725 17.8516 21.7893 17.9148 21.8061C17.978 21.8229 18.0413 21.8397 18.0889 21.8525C18.184 21.8757 18.4415 21.943 18.6573 22.001C18.771 22.0314 18.8745 22.0591 18.9693 22.0844C19.4105 22.2024 19.6633 22.27 19.8753 22.3235C20.0098 22.356 20.156 22.3954 20.2001 22.4116C20.2882 22.4395 20.8682 22.5926 21.1513 22.6599C21.2464 22.6831 21.4343 22.7341 21.5689 22.7712C21.7034 22.8107 21.8798 22.8594 21.9633 22.878C22.3902 22.9847 22.7289 23.0752 22.933 23.1401C23.0537 23.1796 23.0769 23.1796 23.0769 23.1471C23.0769 23.1308 22.9864 22.9824 22.875 22.8153C22.7614 22.6483 22.6662 22.5021 22.6616 22.4882C22.6523 22.4673 22.4969 22.2284 22.4041 22.0938C22.3915 22.0744 22.3644 22.0331 22.3307 21.9818C22.2958 21.9288 22.2539 21.8651 22.2138 21.8038C22.0259 21.5115 21.8774 21.2818 21.6106 20.8758C21.2441 20.3167 21.0376 19.9988 20.8172 19.6578C20.7012 19.4791 20.5875 19.3075 20.5643 19.275C20.5411 19.2425 20.4924 19.1706 20.4576 19.1126C20.3834 18.9919 20.0238 18.4375 19.9565 18.3377C19.9381 18.311 19.9174 18.2795 19.902 18.2561C19.896 18.247 19.8908 18.2392 19.8869 18.2333C19.8753 18.2124 19.8265 18.1382 19.7801 18.0686C19.7337 17.999 19.6061 17.8041 19.4994 17.6394C19.4744 17.6011 19.4441 17.5545 19.4103 17.5027C19.2967 17.3283 19.1442 17.0944 19.0261 16.9155C18.9691 16.8278 18.9028 16.7261 18.8365 16.6244C18.7274 16.4573 18.6183 16.29 18.5505 16.1847C18.2443 15.7138 17.9636 15.2822 17.7455 14.9482C17.6388 14.7811 17.5065 14.5793 17.4509 14.4958C17.3975 14.4122 17.2885 14.2452 17.2073 14.1246C17.1261 14.0039 17.0611 13.8926 17.0611 13.881C17.0611 13.867 17.1307 13.7162 17.2142 13.5446C17.2672 13.4357 17.3323 13.2988 17.3876 13.1825C17.4195 13.1154 17.4482 13.0551 17.4694 13.011C17.5274 12.8903 17.6341 12.6653 17.7061 12.5122C17.7803 12.359 17.8917 12.1247 17.952 11.9902C18.0146 11.8556 18.0773 11.728 18.0889 11.7048C18.1028 11.6839 18.1793 11.5215 18.2605 11.3452C18.3951 11.0575 18.5204 10.7907 18.7849 10.2386C18.8336 10.1365 18.9217 9.95087 18.9797 9.82559C19.1955 9.37087 19.3045 9.14119 19.4832 8.76999C19.5853 8.56118 19.6665 8.38719 19.6665 8.38254C19.6665 8.3779 19.7338 8.23407 19.815 8.0647C19.8642 7.96198 19.922 7.83963 19.9707 7.73647C20.0023 7.66955 20.0301 7.61071 20.0493 7.57054C20.0957 7.46846 20.1954 7.25966 20.2697 7.10654C20.3439 6.95342 20.4414 6.74926 20.4854 6.65414C20.5295 6.55902 20.6223 6.3595 20.6942 6.21334C20.7308 6.13659 20.7744 6.04384 20.8146 5.95828C20.8509 5.88091 20.8845 5.80941 20.9077 5.76094L21.135 5.28534C21.173 5.2035 21.2158 5.11318 21.2532 5.0342C21.289 4.95869 21.3199 4.89356 21.3369 4.85613C21.3926 4.73317 21.5132 4.47797 21.7661 3.95133C21.7883 3.90307 21.8258 3.82445 21.8668 3.73835C21.9027 3.66303 21.9413 3.58198 21.9749 3.51053C22.0491 3.35741 22.1582 3.12773 22.2185 3.00013C22.2405 2.95347 22.2663 2.89874 22.2925 2.8431C22.338 2.74657 22.3848 2.64728 22.4157 2.58253C22.4343 2.54349 22.4594 2.4902 22.487 2.43149C22.5316 2.33667 22.5829 2.22769 22.6245 2.14173C22.6585 2.0702 22.7067 1.96786 22.7572 1.86076ZM7.02243 4.87933V4.06037C7.02243 3.61261 7.01547 3.24373 7.00619 3.24373C6.95979 3.24373 6.22666 4.05109 5.8369 4.53133C5.65594 4.75173 5.18962 5.38046 5.05738 5.57534C4.92543 5.77227 4.89713 5.81541 4.82915 5.91903C4.81705 5.93748 4.80369 5.95784 4.78826 5.98134C4.65834 6.17854 4.39618 6.61006 4.30802 6.77014C4.29415 6.79461 4.27684 6.8254 4.25831 6.85836C4.22413 6.91913 4.1858 6.9873 4.15722 7.03694C4.00642 7.2991 3.60738 8.07631 3.47282 8.37559C3.23849 8.89527 3.14801 9.09943 3.14801 9.11799C3.14801 9.12959 3.12249 9.19455 3.09001 9.25951C3.01577 9.41959 2.80001 9.98567 2.80001 10.0251C2.80001 10.0414 2.79073 10.0646 2.77913 10.0761C2.76289 10.0947 2.62137 10.4938 2.50073 10.865C2.49335 10.8847 2.48008 10.9253 2.4644 10.9732C2.45053 11.0157 2.43478 11.0639 2.41953 11.1086C2.38937 11.2037 2.31049 11.4798 2.24553 11.7234C2.21693 11.8296 2.18744 11.9376 2.16199 12.0308C2.12963 12.1493 2.10382 12.2438 2.09473 12.2802C2.07617 12.3428 2.03905 12.5006 2.01121 12.6282C1.98337 12.7558 1.93465 12.9669 1.90449 13.0968C1.85776 13.3004 1.84465 13.3467 1.85823 13.3567C1.86354 13.3606 1.87291 13.359 1.88593 13.359C1.92769 13.359 2.91137 12.8602 2.95545 12.8184C2.96937 12.8022 3.01577 12.6606 3.05521 12.5006C3.27097 11.6329 3.70946 10.3383 4.02034 9.65159C4.0505 9.58431 4.07602 9.52399 4.07602 9.51703C4.07602 9.51239 4.11778 9.41727 4.16882 9.30823C4.21986 9.19919 4.26162 9.10407 4.26162 9.09943C4.26162 9.08319 4.68154 8.24567 4.76506 8.09255C4.8857 7.87215 4.93674 7.78166 4.98778 7.69814C5.01562 7.65406 5.0597 7.5775 5.08522 7.5311C5.1757 7.3571 5.51674 6.82814 5.85546 6.32934C5.99002 6.13214 6.51435 5.45702 6.66515 5.28534C6.68112 5.2667 6.71846 5.22441 6.76317 5.17377C6.7964 5.13613 6.8337 5.09389 6.86931 5.05333L7.02243 4.87933ZM22.3113 6.19942C22.3113 6.19246 22.2208 6.00454 22.1094 5.78182C22.0004 5.5591 21.9006 5.37813 21.889 5.37813C21.8774 5.37813 21.8264 5.46862 21.7754 5.57998C21.722 5.69366 21.6199 5.90942 21.5457 6.06254C21.3114 6.54974 21.2209 6.74462 21.2209 6.77014C21.2209 6.78174 21.2534 6.8583 21.2905 6.93718C21.4784 7.32462 21.8009 8.12967 21.9169 8.49855C22.1535 9.25719 22.3414 9.96015 22.4157 10.3662C22.4342 10.4613 22.4644 10.6121 22.4853 10.7026C22.5038 10.7907 22.5294 10.9322 22.541 11.0158C22.5526 11.0993 22.5781 11.2802 22.599 11.4218C22.6894 12.0458 22.7057 12.1874 22.7289 12.5586C22.7428 12.7743 22.7637 13.0875 22.7753 13.2522C22.8054 13.6536 22.8054 14.6999 22.7753 15.1338C22.708 16.0943 22.6802 16.4469 22.6593 16.5838C22.6575 16.5969 22.6551 16.6137 22.6524 16.6334C22.6376 16.7388 22.6112 16.928 22.5897 17.0942C22.5224 17.6046 22.3948 18.3099 22.295 18.7182C22.2742 18.8017 22.2394 18.9571 22.2185 19.0662C22.1721 19.2843 22.005 19.9246 21.9656 20.0243C21.9614 20.0351 21.9574 20.0432 21.9552 20.0519C21.9424 20.101 21.9887 20.1654 22.411 20.8108C22.5595 21.0382 22.6918 21.2238 22.701 21.2238C22.7126 21.2238 22.7451 21.1472 22.773 21.0544C22.7893 21.0053 22.8125 20.9323 22.8363 20.8576C22.8563 20.7946 22.8766 20.7306 22.8936 20.6786C22.9284 20.5626 22.9864 20.3654 23.0189 20.2378C23.0393 20.1577 23.0642 20.0658 23.084 19.993C23.0957 19.9497 23.1056 19.9131 23.1117 19.8898C23.1534 19.7483 23.3042 19.1103 23.3878 18.7298C23.4481 18.4537 23.4806 18.2727 23.5641 17.7786C23.5873 17.6371 23.6128 17.4979 23.6198 17.4654C23.6334 17.4107 23.6471 17.2934 23.742 16.4791L23.7474 16.433C23.933 14.8136 23.919 12.7581 23.7149 11.3174C23.694 11.1828 23.6638 10.9647 23.6476 10.8302C23.6058 10.5286 23.469 9.79079 23.3878 9.44975C23.3553 9.30823 23.3182 9.14815 23.3042 9.09015C23.2207 8.72591 22.8959 7.64942 22.7985 7.40814C22.7706 7.34086 22.7057 7.17382 22.6477 7.01374C22.5595 6.7771 22.4598 6.5335 22.3832 6.36878C22.3438 6.28294 22.3113 6.20638 22.3113 6.19942ZM2.32673 16.955C2.30121 16.9457 2.09241 16.8459 1.86505 16.7369C1.63769 16.6279 1.44745 16.5374 1.44281 16.5374C1.39873 16.5374 1.38713 18.6579 1.42889 19.2286C1.48921 20.0313 1.55417 20.6832 1.59361 20.8642C1.60521 20.9152 1.62609 21.0567 1.64001 21.1774C1.75601 22.1077 2.21305 23.8756 2.56801 24.7618C2.60513 24.85 2.66313 25.0008 2.69793 25.0936C2.73273 25.1864 2.76985 25.2676 2.78145 25.2745C2.79073 25.2815 2.80001 25.3047 2.80001 25.3256C2.80001 25.3464 2.84177 25.4508 2.89281 25.5576C2.94385 25.6643 2.98561 25.7548 2.98561 25.7617C2.98561 25.7826 3.38465 26.5784 3.47977 26.7454C3.51599 26.8073 3.55906 26.8829 3.59433 26.9448C3.6133 26.978 3.63001 27.0074 3.64218 27.0284C3.73034 27.1839 4.11082 27.7732 4.27786 28.0098C4.7001 28.6084 5.30562 29.2858 5.86242 29.7846C6.07354 29.9725 6.51666 30.3298 6.56539 30.3484C6.60251 30.3623 6.60483 30.3043 6.60483 29.5201V28.678L6.43778 28.5295C5.42162 27.6317 4.47506 26.3092 3.82778 24.8778C3.67466 24.5414 3.56562 24.2862 3.56562 24.263C3.56562 24.2514 3.53546 24.1725 3.49602 24.089C3.45889 24.0055 3.42642 23.9289 3.42642 23.9173C3.42642 23.908 3.39161 23.8013 3.34753 23.6807C3.13873 23.103 2.99953 22.6158 2.83945 21.9198C2.76057 21.5764 2.63297 20.9291 2.60513 20.718C2.49609 19.9431 2.46825 19.7135 2.43809 19.3353C2.41721 19.0824 2.39633 18.4815 2.38937 17.934C2.37777 16.9828 2.37545 16.9759 2.32673 16.955ZM21.6106 23.516C21.5758 23.502 21.3879 23.451 21.193 23.4C20.736 23.2816 20.7198 23.2793 20.7012 23.3095C20.685 23.3327 20.5527 23.5856 20.4321 23.8222C20.4094 23.8659 20.3498 23.9714 20.2861 24.0843C20.2652 24.1213 20.2439 24.1591 20.2233 24.1957C20.1374 24.3419 20.0632 24.4788 20.0539 24.4973C20.0261 24.5553 19.6363 25.1608 19.4461 25.4369C18.8104 26.3603 18.0633 27.2187 17.2537 27.9565C16.9822 28.2047 16.792 28.3601 16.3674 28.6803C16.1934 28.8079 16.0217 28.9285 15.864 29.0306C15.8514 29.0376 15.8201 29.0582 15.7815 29.0836C15.7562 29.1002 15.7277 29.119 15.6993 29.1373C14.9638 29.6129 13.936 30.0561 13.124 30.2509C12.4907 30.4017 12.2123 30.4365 11.5163 30.4505C10.8388 30.4644 10.3656 30.4273 9.88764 30.3182C9.5814 30.2509 9.37956 30.1976 9.22875 30.1442C9.13363 30.1117 9.05243 30.0862 9.04779 30.0862C9.04315 30.0862 9.01299 30.1465 8.98051 30.2185C8.90859 30.3785 8.79955 30.6082 8.59075 31.0444C8.50723 31.223 8.44227 31.3738 8.44923 31.3854C8.46547 31.4133 9.22412 31.6499 9.51644 31.7195C10.0477 31.8448 10.6996 31.919 11.282 31.919C12.4884 31.919 13.7528 31.6267 14.9105 31.0792C15.2097 30.9377 15.567 30.7567 15.6018 30.7289C15.6204 30.7149 15.6737 30.6825 15.7225 30.6569C15.9289 30.5456 16.4069 30.237 16.6621 30.0514C17.0008 29.8032 17.2003 29.6524 17.2954 29.5689C17.3088 29.5575 17.323 29.5454 17.3374 29.5331C17.3908 29.4875 17.4477 29.439 17.4787 29.4134C17.8777 29.0909 18.9055 28.0609 19.1584 27.7314C19.1885 27.692 19.2373 27.6363 19.2674 27.6038C19.5505 27.2976 20.3926 26.1144 20.7592 25.5112C21.0446 25.0402 21.2974 24.5739 21.555 24.0542L21.7545 23.6552L21.7986 23.567L21.7359 23.5531C21.7011 23.5461 21.6454 23.5299 21.6106 23.516Z"
                  className="fill-primary dark:fill-slate-50"
                />
              </svg>
            </CompanyInfo>
            <div className="border-l-2 border-black/30 dark:border-primary ml-3 pl-7 mt-3">
              <Reveal>
                <p className="text-black/50 dark:text-primary">
                {t("time_2")}
                </p>
              </Reveal>
              <ProjectItem
                title={t("project_name_2-1")}
                descriptions={[
                  `- ${t("team_menbers")}: 4`,
                  `- ${t("technologies")}: Flutter, Ruby on Rails`,
                  `- ${t("responsibility")}: ${t("responsibility_2-1")}`,
                ]}
              />
              <ProjectItem
                title={t("project_name_2-2")}
                descriptions={[
                  `- ${t("team_menbers")}: 3`,
                  `- ${t("technologies")}: Flutter, Java`,
                  `- ${t("responsibility")}: ${t("responsibility_2-2")}`,
                ]}
              />
              <ProjectItem
                title={t("project_name_2-3")}
                descriptions={[
                  `- ${t("team_menbers")}: 4`,
                  `- ${t("technologies")}: Flutter`,
                  `- ${t("responsibility")}: ${t("responsibility_2-3")}`,
                ]}
              />
              <ProjectItem
                title={t("project_name_2-4")}
                descriptions={[
                  `- ${t("team_menbers")}: 2`,
                  `- ${t("technologies")}: Node.js (Nest.js), MySql`,
                  `- ${t("responsibility")}: ${t("responsibility_2-4")}`,
                ]}
              />
              <ProjectItem
                title={t("project_name_2-5")}
                descriptions={[
                  `- ${t("team_menbers")}: 2`,
                  `- ${t("technologies")}: Vue.js`,
                  `- ${t("responsibility")}: ${t("responsibility_2-5")}`,
                ]}
              />
            </div>
          </div>
          <div className="leading-7">
            <CompanyInfo role="Intern" company="MAYSOFT">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 27.7142C6.43792 27.7142 0.285721 21.562 0.285721 13.9999C0.285721 6.43785 6.43792 0.285645 14 0.285645C21.5621 0.285645 27.7143 6.43785 27.7143 13.9999C27.7143 21.562 21.5621 27.7142 14 27.7142ZM14 3.71422C8.32839 3.71422 3.71429 8.32831 3.71429 13.9999C3.71429 19.6716 8.32839 24.2856 14 24.2856C15.2605 24.2856 16.4687 24.0578 17.5856 23.6411C18.1505 23.4303 18.692 23.1712 19.2052 22.8689C22.243 21.0792 24.2857 17.7736 24.2857 13.9999C24.2857 8.32831 19.6716 3.71422 14 3.71422Z"
                  className="fill-primary dark:fill-slate-50"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5714 13.9999C10.5714 12.1063 12.1065 10.5713 14 10.5713C15.8935 10.5713 17.4286 12.1063 17.4286 13.9999C17.4286 15.8934 15.8935 17.4284 14 17.4284C12.1065 17.4284 10.5714 15.8934 10.5714 13.9999Z"
                  className="fill-primary dark:fill-slate-50"
                />
              </svg>
            </CompanyInfo>
            <div className="border-l-2 border-black/30 dark:border-primary ml-3 pl-7 mt-3">
              <Reveal>
                <p className="text-black/50 dark:text-primary">
                {t("time_3")}
                </p>
              </Reveal>
              <ProjectItem
                title={t("project_name_3-1")}
                descriptions={[
                  `- ${t("team_menbers")}: 3`,
                  `- ${t("technologies")}: React/React Native`,
                  `- ${t("responsibility")}: ${t("responsibility_3-1")}`,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
