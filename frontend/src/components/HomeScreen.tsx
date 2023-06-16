import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import { EmailContext, EmailType } from '../EmailProvider'



function HomeScreen() {
    const auth = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const emails = useContext(EmailContext);
    const [readEmails, setReadEmails] = useState<Array<EmailType>>([])
    const navigate = useNavigate()

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
        setReadEmails(emails?.emails.filter(email => email.isread) ?? [])
        setIsLoading(false)

    }
    const logout = () => {
        localStorage.removeItem("authState")
        auth?.dispatch({ type: "LOGOUT", payload: null });

    }
    return isLoading ? <div className='w-full h-screen flex items-center justify-center '>
        <p className='font-semibold text-lg'>Loading...</p>
    </div> : (
        <div className=' w-full h-screen bg-[#010014]/50 relative flex flex-col items-center justify-center'>
            <div className='w-full  bg-[#010014] p-5 flex flex-col items-end absolute top-0'>
                <h3 className='text-white text-xl'>Hello {auth?.state?.user?.name}</h3>
            </div>
            <h1 className='text-white text-5xl font-semibold m-6'>You have {Math.abs(readEmails.length - (emails?.emails.length ?? 0))} unread emails of {emails?.emails.length} total</h1>
            <br /><br />
            <button
                onClick={() => { navigate("/mail") }}
                className='p-5 rounded-lg bg-[#010014] text-white underline font-semibold'>
                View all Emails
            </button>
            <br />
            <button
                onClick={logout}
                className='p-5 rounded-lg bg-[#f74343] text-white underline font-semibold'>
                Sign Out
            </button>
        </div>
    )
}

export default HomeScreen