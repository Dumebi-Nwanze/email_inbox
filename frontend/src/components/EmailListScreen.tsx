import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider';
import { EmailContext, EmailType } from '../EmailProvider';
import { useNavigate } from 'react-router-dom';

function EmailListScreen() {
    const auth = useContext(AuthContext)

    const emails = useContext(EmailContext);
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const truncateString = (str: string, limit: number) => {
        if (str.length > limit) {
            return str.slice(0, limit) + "..."
        }
        return str
    }
    useEffect(() => {
        getAllEmails()
    }, [])
    async function getAllEmails() {
        setIsLoading(true);

        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/email/get-all-mail`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${auth?.state?.token}`
            }
        }).then(response => {

            return response.json();
        }).catch(error => {
            console.error("Error:", error);
        });
        emails?.setEmails(data)
        setIsLoading(false)

    }
    return isLoading ? <div className='w-full h-screen flex items-center justify-center '>
        <p className='font-semibold text-lg'>Loading...</p>
    </div> : (
        <div className=' w-full h-screen bg-[#010014]/50  flex flex-col items-center justify-between '>
            <div className='w-full  bg-[#010014] p-5 flex flex-col items-end'>
                <h3 className='text-white text-xl'>Hello {auth?.state?.user?.name}</h3>
            </div><div className='h-full w-full p-4'>
                {emails?.emails?.sort((a: EmailType, b: EmailType) => a.id - b.id).map((email: EmailType) => (
                    <div
                        key={email.id}
                        onClick={() => {
                            navigate(`/mail/${email.id}`)
                        }}
                        className='w-full p-4 rounded-lg my-4 bg-slate-100 flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 hover:scale-[1.01] transition-all'>
                        <div className='w-[70%]'>
                            <h1 className='font-bold text-lg'>
                                {email.subject}
                            </h1>
                            <h3>
                                {truncateString(email.body, 100)}

                            </h3>

                        </div>
                        <div>
                            {!email.isread && <div className='w-3 h-3 bg-blue-500 rounded-full'></div>}
                        </div>

                    </div>))}
            </div>




        </div>
    )
}

export default EmailListScreen