import React, { useEffect } from 'react';
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";

import Axios from "axios";
import { useSpring, animated } from '@react-spring/web';

function Contact() {
    const nodeRef = useRef(null);

    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    
    const [errors, setErrors] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [alert, setAlert] = useState({
        alert: false,
        type: "success",
        message: "Mesajınız başarıyla gönderildi.",
    });

    useEffect(() => {
        let timeoutId;
    
        if (alert.alert) {
          timeoutId = setTimeout(() => {
            window.addEventListener("click", redirectToHomePage);
          }, 3000);
        } else {
          clearTimeout(timeoutId);
          window.removeEventListener("click", redirectToHomePage);
        }
    
        return () => {
          clearTimeout(timeoutId);
          window.removeEventListener("click", redirectToHomePage);
        };
      }, [alert.alert]);
    
    const redirectToHomePage = () => {
        window.location.href = "/";
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        clearError(name);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        clearError(name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let formIsValid = true;
        const newErrors = { ...errors };
    
        // Email kontrolü için regex
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
        if (!formData.email) {
            formIsValid = false;
            newErrors.email = "E-posta alanı boş bırakılamaz.";
        } else if (!emailRegex.test(formData.email)) {
            formIsValid = false;
            newErrors.email = "Geçerli bir e-posta adresi girin.";
        }
    
        if (!formData.subject) {
            formIsValid = false;
            newErrors.subject = "Konu Başlığı alanı boş bırakılamaz.";
        } else if (formData.subject.length > 100) {
            formIsValid = false;
            newErrors.subject = "Konu Başlığı en fazla 100 karakter olmalıdır.";
        }
    
        if (!formData.message) {
            formIsValid = false;
            newErrors.message = "Mesaj alanı boş bırakılamaz.";
        } else if (formData.message.length > 500) {
            formIsValid = false;
            newErrors.message = "Mesaj en fazla 500 karakter olmalıdır.";
        }
    
        setErrors(newErrors);
    
        if (formIsValid) {
            console.log(window.env.API_URL);
            setButtonDisabled(true);
            Axios.post(
                window.env.API_URL + "/api/contact",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                if (response?.data?.success === true) {
                    setAlert({
                        alert: true,
                        type: "success",
                        message: response?.data?.message,
                    });
                } else if (response?.data?.success === false) {
                    setAlert({
                        alert: true,
                        type: "error",
                        message: response?.data?.message,
                    });
                }
            }).catch((error) => {
                setAlert({
                    alert: true,
                    type: "error",
                    message: "Mesajınız gönderilirken bir hata oluştu.",
                });
            });
        }
    };

    const clearError = (fieldName) => {
        const newErrors = { ...errors };
        newErrors[fieldName] = "";
        setErrors(newErrors);
    };

    const props = useSpring({
        opacity: alert.alert ? 1 : 0,
        transform: alert.alert ? 'scale(1)' : 'scale(0.8)',
        delay: 100,
      });

    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex items-center justify-center h-[95vh]">
                <section className="tall:mt-0 mt-10">
                    {alert.alert && (alert.type === "success" ? (
                        <animated.div
                            ref={nodeRef}
                            class="flex items-center p-4 mb-4 text-sm border rounded-lg text-green-400 border-green-800" 
                            role="alert"
                            style={props}
                        >
                            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">{alert.message}</span>
                            </div>
                        </animated.div>
                    ) : (
                        <animated.div 
                            ref={nodeRef}
                            class="flex items-center p-4 mb-4 text-sm border rounded-lg text-red-400 border-red-800" 
                            role="alert"
                            style={props}
                            vi
                        >
                            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium md:text-xl text-lg">{alert.message}</span>
                            </div>
                        </animated.div>
                    ))}
                    {!alert.alert && <div class="py-8 lg:py-16 px-4 mx-auto w-[50vw] min-w-[300px]">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Benimle İletişime Geç 📞</h2>
                        <p class="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">Bu formu doldurarak benimle iletişime geçebilirsiniz.</p>
                        <form onSubmit={handleSubmit} class="space-y-8" noValidate>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">E-posta</label>
                                <input 
                                    name="email" 
                                    type="email" 
                                    id="email" 
                                    onChange={handleChange} 
                                    class={`shadow-sm border text-white bg-zinc-800 text-sm rounded-lg focus:ring-primary-500  focus:border-primary-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500  ${errors.email ? 'focus:border-red-500 border-red-500' : 'focus:border-primary-500'} shadow-sm-light`}
                                    placeholder="isim@ornek.com" 
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label for="subject" class="block mb-2 text-sm font-medium text-gray-300">Konu Başlığı</label>
                                <input
                                    name="subject"
                                    type="text"
                                    id="subject"
                                    onChange={handleChange}
                                    className={`block p-3 w-full text-sm text-white bg-zinc-800 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 ${errors.subject ? 'focus:border-red-500 border-red-500' : 'focus:border-primary-500'} placeholder-gray-400 shadow-sm-light`}
                                    placeholder="Hangi konuda iletişime geçmektesiniz?"
                                    required
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>
                            <div class="sm:col-span-2">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-300">Mesajınız</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="6"
                                    onChange={handleChange}
                                    className={`block p-2.5 w-full text-sm rounded-lg shadow-sm border ${errors.message ? 'focus:border-red-500 border-red-500' : 'focus:border-primary-500'} focus:ring-primary-500 text-white bg-zinc-800`}
                                    placeholder="Bir mesaj yazınız."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className={`py-3 px-5 font-medium text-center rounded-lg sm:w-fit transition ease-in-out bg-gray-400 border-gray-400 md:text-xl text-sm text-black ${
                                    isButtonDisabled ? 'disabled' : 'hover:bg-gray-500 active:bg-gray-600 active:outline-none'
                                }`}
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </form>
                    </div>}
                </section>
            </div>
        </div>
         
    );
};

export default Contact;