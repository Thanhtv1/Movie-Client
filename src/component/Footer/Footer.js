
import React from "react";

export default function Footer({css}) {
  return (
    // <footer className="mt-8 bg-gradient-to-r from-gray-800 to-black">
    //   <div className="flex items-center p-4 justify-between">
    //     <img
    //       className=" mb-2"
    //       src=" https://cdn-icons-png.flaticon.com/512/2586/2586717.png"
    //       width={50}
    //       height={50}
    //       alt=""
    //     />
    //     <div className="flex gap-2">
    //       <a
    //         className="rounded-full border text-white border-white/50 p-3 hover:opacity-75"
    //         href={"/"}
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <span className="sr-only"> Facebook </span>
    //         <svg
    //           className="h-4 w-4"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //           aria-hidden="true"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </a>
    //       <a
    //         className="rounded-full border text-white border-white/50 p-3 hover:opacity-75"
    //         href={"/"}
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <span className="sr-only"> Github </span>
    //         <svg
    //           className="h-4 w-4"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //           aria-hidden="true"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </a>
    //     </div>
    //   </div>
    // </footer>
    // 
    <div className={`block lg:grid justify-items-center items-center justify-center px-3 pt-3 ${css}`}>
      <div
        className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
        data-aos="fade"
      >
        <a
          className="flex items-center justify-center bg-white rounded-lg text-coolGray-600 font-medium border border-coolGray-300 transition duration-500 hover:text-teal-400 hover:bg-teal-50 px-4 py-2 md:px-6 md:py-3 my-1"
          href="https://www.facebook.com/"
        >
          <span className="mr-2 lg:mr-4">
            <svg
              width={16}
              height={16}
              viewBox="0 0 8 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 10.146H7.2381L8 6.94604H5.33333V5.34605C5.33333 4.52204 5.33333 3.74604 6.85714 3.74604H8V1.05805C7.75162 1.02365 6.81371 0.946045 5.82324 0.946045C3.75467 0.946045 2.28571 2.27164 2.28571 4.70604V6.94604H0V10.146H2.28571V16.946H5.33333V10.146Z"
                fill="url(#paint26_linear)"
              />
              <defs>
                <linearGradient
                  id="paint26_linear"
                  x1={0}
                  y1="8.94604"
                  x2={8}
                  y2="8.94604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="100%" stopColor="#02AAB0" />
                  <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          Facebook
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-lg text-coolGray-600 font-medium border border-coolGray-300 transition duration-500 hover:text-teal-400 hover:bg-teal-50 px-4 py-2 md:px-6 md:py-3 my-1"
          href="https://www.twitter.com/"
        >
          <span className="mr-2 lg:mr-4">
            <svg
              width={16}
              height={16}
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2.84394C19.2645 3.16466 18.4744 3.38136 17.6438 3.47931C18.5008 2.97465 19.142 2.18037 19.4477 1.24468C18.6425 1.71534 17.7612 2.04664 16.8422 2.22417C16.2242 1.57481 15.4057 1.14441 14.5136 0.99978C13.6216 0.855152 12.706 1.00439 11.909 1.42432C11.1119 1.84426 10.4781 2.5114 10.1058 3.32216C9.73358 4.13292 9.64374 5.04195 9.85026 5.9081C8.2187 5.82749 6.62259 5.41017 5.16553 4.68322C3.70847 3.95628 2.42301 2.93596 1.39258 1.68848C1.04025 2.28658 0.837664 2.98003 0.837664 3.71855C0.837271 4.38338 1.00364 5.03804 1.32201 5.62443C1.64038 6.21081 2.10091 6.7108 2.66273 7.08003C2.01117 7.05963 1.37397 6.88637 0.804193 6.57468V6.62669C0.804127 7.55915 1.13189 8.46292 1.73186 9.18464C2.33184 9.90636 3.16707 10.4016 4.09583 10.5863C3.4914 10.7472 2.85769 10.771 2.24258 10.6556C2.50462 11.4579 3.01506 12.1595 3.70243 12.6622C4.3898 13.1649 5.21969 13.4434 6.07593 13.4589C4.62242 14.5817 2.82735 15.1908 0.979477 15.1882C0.652146 15.1882 0.325091 15.1694 0 15.1318C1.87569 16.3186 4.05914 16.9485 6.28909 16.946C13.8378 16.946 17.9644 10.7934 17.9644 5.45736C17.9644 5.284 17.96 5.10891 17.9521 4.93555C18.7548 4.3643 19.4476 3.65691 19.9982 2.84654L20 2.84394Z"
                fill="url(#paint27_linear)"
              />
              <defs>
                <linearGradient
                  id="paint27_linear"
                  x1={0}
                  y1="8.94604"
                  x2={20}
                  y2="8.94604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="100%" stopColor="#02AAB0" />
                  <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          Github
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-lg text-coolGray-600 font-medium border border-coolGray-300 transition duration-500 hover:text-teal-400 hover:bg-teal-50 px-4 py-2 md:px-6 md:py-3 my-1"
          href="https://www.linkedin.com/"
        >
          <span className="mb-1 mr-2 lg:mr-4">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92299 4.79858C2.98502 4.79858 3.84598 3.93616 3.84598 2.87231C3.84598 1.80846 2.98502 0.946045 1.92299 0.946045C0.860951 0.946045 0 1.80846 0 2.87231C0 3.93616 0.860951 4.79858 1.92299 4.79858Z"
                fill="url(#paint28_linear)"
              />
              <path
                d="M5.66174 6.25825V16.9452H8.97424V11.6603C8.97424 10.2657 9.23614 8.91523 10.9623 8.91523C12.6647 8.91523 12.6857 10.5096 12.6857 11.7483V16.946H16V11.0854C16 8.20653 15.3813 5.99414 12.0222 5.99414C10.4094 5.99414 9.32843 6.88068 8.88635 7.71968H8.84153V6.25825H5.66174ZM0.263664 6.25825H3.58143V16.9452H0.263664V6.25825Z"
                fill="url(#paint29_linear)"
              />
              <defs>
                <linearGradient
                  id="paint28_linear"
                  x1={0}
                  y1="8.94604"
                  x2={16}
                  y2="8.94604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="100%" stopColor="#02AAB0" />
                  <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
                <linearGradient
                  id="paint29_linear"
                  x1={0}
                  y1="8.94604"
                  x2={16}
                  y2="8.94604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="100%" stopColor="#02AAB0" />
                  <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          Linkedin
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-lg text-coolGray-600 font-medium border border-coolGray-300 transition duration-500 hover:text-teal-400 hover:bg-teal-50 px-4 py-2 md:px-6 md:py-3 my-1"
          href="https://www.instagram.com/"
        >
          <span className="mr-2 lg:mr-4">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99785 4.84127C5.72636 4.84127 3.89315 6.67451 3.89315 8.94604C3.89315 11.2176 5.72636 13.0508 7.99785 13.0508C10.2693 13.0508 12.1025 11.2176 12.1025 8.94604C12.1025 6.67451 10.2693 4.84127 7.99785 4.84127ZM7.99785 11.6138C6.52888 11.6138 5.3301 10.415 5.3301 8.94604C5.3301 7.47705 6.52888 6.27824 7.99785 6.27824C9.46681 6.27824 10.6656 7.47705 10.6656 8.94604C10.6656 10.415 9.46681 11.6138 7.99785 11.6138ZM12.2707 3.71651C11.7403 3.71651 11.312 4.1448 11.312 4.67516C11.312 5.20552 11.7403 5.63381 12.2707 5.63381C12.801 5.63381 13.2293 5.20752 13.2293 4.67516C13.2294 4.54922 13.2048 4.42449 13.1566 4.30811C13.1085 4.19173 13.0379 4.08599 12.9489 3.99694C12.8598 3.90789 12.7541 3.83728 12.6377 3.78916C12.5213 3.74104 12.3966 3.71635 12.2707 3.71651ZM15.9991 8.94604C15.9991 7.8413 16.0091 6.74656 15.9471 5.64381C15.885 4.36295 15.5928 3.22618 14.6562 2.28955C13.7176 1.35091 12.5829 1.06072 11.302 0.998675C10.1973 0.936633 9.10258 0.94664 7.99985 0.94664C6.89512 0.94664 5.80041 0.936633 4.69768 0.998675C3.41684 1.06072 2.28009 1.35291 1.34348 2.28955C0.404861 3.22818 0.11467 4.36295 0.0526294 5.64381C-0.00941132 6.74856 0.00059528 7.8433 0.00059528 8.94604C0.00059528 10.0488 -0.00941132 11.1455 0.0526294 12.2483C0.11467 13.5291 0.406862 14.6659 1.34348 15.6025C2.28209 16.5412 3.41684 16.8314 4.69768 16.8934C5.80241 16.9555 6.89713 16.9454 7.99985 16.9454C9.10458 16.9454 10.1993 16.9555 11.302 16.8934C12.5829 16.8314 13.7196 16.5392 14.6562 15.6025C15.5948 14.6639 15.885 13.5291 15.9471 12.2483C16.0111 11.1455 15.9991 10.0508 15.9991 8.94604ZM14.238 13.6652C14.0919 14.0295 13.9157 14.3017 13.6336 14.5819C13.3514 14.864 13.0812 15.0402 12.717 15.1863C11.6643 15.6045 9.16462 15.5105 7.99785 15.5105C6.83108 15.5105 4.32944 15.6045 3.27675 15.1883C2.91251 15.0422 2.64033 14.866 2.36015 14.5839C2.07796 14.3017 1.90184 14.0315 1.75575 13.6672C1.33948 12.6125 1.43354 10.1128 1.43354 8.94604C1.43354 7.77926 1.33948 5.27757 1.75575 4.22486C1.90184 3.86061 2.07796 3.58843 2.36015 3.30824C2.64233 3.02805 2.91251 2.84993 3.27675 2.70383C4.32944 2.28755 6.83108 2.38161 7.99785 2.38161C9.16462 2.38161 11.6663 2.28755 12.719 2.70383C13.0832 2.84993 13.3554 3.02605 13.6356 3.30824C13.9177 3.59043 14.0939 3.86061 14.24 4.22486C14.6562 5.27757 14.5622 7.77926 14.5622 8.94604C14.5622 10.1128 14.6562 12.6125 14.238 13.6652Z"
                fill="url(#paint30_linear)"
              />
              <defs>
                <linearGradient
                  id="paint30_linear"
                  x1={0}
                  y1="8.94604"
                  x2={16}
                  y2="8.94604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="100%" stopColor="#02AAB0" />
                  <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          Instagram
        </a>
      </div>
    </div>
  );
}
